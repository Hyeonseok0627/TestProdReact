import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PublicItem from "../model/PublicItem";
import PublicItem2 from "../model/PublicItem2";
import PublicItem3 from "../model/PublicItem3";

// 공공데이터 아이템 요소를 출력을 감싸는 목록부분에 해당하고,
// 미디어쿼리 넣어서, 약간 반응형으로, 특정 크기를 기준으로
// 웹 브라우저의 창의 크기가 변경시, 화면 사이즈 적용되기.
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
  // useEffect 이용해서, 마운트시, 최초 1회 데이터 받아오기.
  // create, update, delete 없어서,
  // 단순, 데이터 만 가져오기 때문에,
  // REST API 서버에서 데이터를 다 받으면, articles 에 넣기.
  const [pubDts, setPubDts] = useState(null);
  // 만약, 데이터를 받고 있는 중이면, loading 값을 true,
  // 데이터를 다 받으면, loading 값을 false 로 변경하기.
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
  }, [category]); //의존성 배열 부분의 모양은 빈배열, 최초 1회 마운트시 한번만 호출.

  // 주의사항, 데이터 널 체크하기.
  if (loading) {
    return <PublicDataListCss>데이터 받는중(대기중 ....)</PublicDataListCss>;
  }

  // 데이터를 못받아 왔을 경우, 화면에 아무것도 안그리기.
  if (!pubDts) {
    return null;
  }

  // 로딩도 끝나고, 받아온 데이터가 존재 한다면, 그때 그리기.

  // 각 화면을 그리기 위한, 하나의 함수를 만들었음.
  // datatype 에따라서, 렌더링을 다르게 했음.
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
