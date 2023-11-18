import React from "react";
//부산 축제 요소로 구성.
import styled from "styled-components";
const PublicDataItemCss = styled.div`
  display: flex;

  //이미지, thumbnail
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 170px;
      height: 130px;
      // 해당 사이즈에 비율에 맞게 이미지 크기 조정.
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      /* a {
        color: blue;
      } */
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;
const PublicItem3 = ({ pubDt }) => {
  // pubDt : 각 기사의 내용을 담은 객체.
  // 비구조화 할당으로 각 각 할당.
  // 선택할 요소: 1)MAIN_TITLE, 2)CNTCT_TEL 3)MAIN_IMG_THUMB 4)TRFC_INFO 5)ITEMCNTNTS
  const { MAIN_TITLE, CNTCT_TEL, MAIN_IMG_THUMB, TRFC_INFO, ITEMCNTNTS } = pubDt;
  return (
    <PublicDataItemCss>
      {/* 조건부 렌더링으로 출력하기.  */}

      {MAIN_IMG_THUMB && (
        <div className="thumbnail">

          <img src={MAIN_IMG_THUMB} alt="thumbnail" />
        </div>
      )}
      <div className="contents">
        <h2>{MAIN_TITLE}</h2>
        <p>연락처: {CNTCT_TEL}</p>
        <p>교통편: {TRFC_INFO}</p>
        <p>설명 : {ITEMCNTNTS}</p>
      </div>
    </PublicDataItemCss>
  );
};

export default PublicItem3;
