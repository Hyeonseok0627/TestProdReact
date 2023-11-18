import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PublicItem from "../model/PublicItem";
import PublicItem2 from "../model/PublicItem2";
import PublicItem3 from "../model/PublicItem3";

const PublicDataListCss = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const PublicDataList = ({ category }) => {
  const [pubDts, setPubDts] = useState(null);
  const [loading, setLoading] = useState(false);
  //상태변수, 공공데이터(0,1,2)에 따라서
  const [datatype, setDatatype] = useState(0);
  useEffect(() => {
    const resultData = async () => {
      setLoading(true);

      try {
        // 카테고리별로, url 주소 변경하기.
        const query = category === "all" ? "" : `&category=${category}`;

        switch (query) {
          // 부산테마먹거리 API 주소, busanFood
          case "&category=busanFood":
            const response = await axios.get(
              `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=ALRX9GpugtvHxcIO%2FiPg1vXIQKi0E6Kk1ns4imt8BLTgdvSlH%2FAKv%2BA1GcGUQgzuzqM3Uv1ZGgpG5erOTDcYRQ%3D%3D&numOfRows=100&pageNo=1&resultType=json`
            );
            setPubDts(response.data.getFoodKr.item);
            // 상태변수, 타입 지정.
            setDatatype(0);
            break;
          case "&category=busanWalking":
            // 부산도보여행 API 주소, busanWalking
            const response1 = await axios.get(
              `https://apis.data.go.kr/6260000/WalkingService/getWalkingKr?serviceKey=ALRX9GpugtvHxcIO%2FiPg1vXIQKi0E6Kk1ns4imt8BLTgdvSlH%2FAKv%2BA1GcGUQgzuzqM3Uv1ZGgpG5erOTDcYRQ%3D%3D&pageNo=1&numOfRows=100&resultType=json`
            );
            setPubDts(response1.data.getWalkingKr.item);
            // 상태변수, 타입 지정.
            setDatatype(1);
            break;
          case "&category=busanFestival":
            // 부산축제 API 주소, busanFestival
            const response2 = await axios.get(
              `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=3TcDecXcikcH9bwW125ToBy%2BMICqkvRWbz%2BvVmyHgA1G4%2Fe0RNqMszPSU4aiz9HbxqEw6M8PJz3gNiYXhhXJjg%3D%3D&pageNo=1&numOfRows=10&resultType=json`
            );
            setPubDts(
              response2.data.getFestivalKr.item
            );
            // 상태변수, 타입 지정.
            setDatatype(2);
            break;
          default:
            alert("카테고리를 선택해주세요.");
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }; 
    // 비동기 함수 만들어서, 사용하기.
    resultData();
    // category 의 값에 따라서 새로운 함수를 생성함.
  }, [category]); 
  // 주의사항, 데이터 널 체크하기.
  if (loading) {
    return <PublicDataListCss>데이터 받는중(대기중 ....)</PublicDataListCss>;
  }
  // 데이터를 못받아 왔을 경우, 화면에 아무것도 안그리기.
  if (!pubDts) {
    return null;
  }
  const choosePage = ({ pubDts }) => {
    switch (datatype) {
      case 0:
        return (
          <div>
            {pubDts.map((pubDt) => (
              <PublicItem key={pubDt.MAIN_IMG_THUMB} pubDt={pubDt} />
            ))}
          </div>
        );
      case 1:
        return (
          <div>
            {pubDts.map((pubDt) => (
              <PublicItem2 key={pubDt.MAIN_IMG_THUMB} pubDt={pubDt} />
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            {pubDts.map((pubDt) => (
              <PublicItem3 key={pubDt.MAIN_IMG_THUMB} pubDt={pubDt} />
            ))}
          </div>
        );
      default:
        return;
    }
  };
  return (
    <PublicDataListCss>
      {choosePage({ pubDts })}

    </PublicDataListCss>
  );
};

export default PublicDataList;
