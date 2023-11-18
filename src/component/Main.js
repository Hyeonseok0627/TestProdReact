// Main 임시 페이지
import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import styled from "styled-components";

const MainTitleTextCss = styled.p`
  font-size: 40px;
  font-weight: bold;
  background-color: aqua;
  text-align: center;
`;

const MainTextCss = styled.p`
  font-size: 30px;
  font-weight: bold;
  background-color: yellow;
  text-align: center;
`;

//Wrapper 라고 해서 블록 부분 설정.
const Wrapper = styled.div`
  padding: 20px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Container 만들기.
const Container = styled.div`
  width: 100%;
  max-width: 720px;
  margin-left: 20px;

  // & : 현재 태그
  // div 태그 하위의 자식 태그를 마지막 자식 태그를 제외하고
  // 각 요소의 마진 바텀을 16 px 씩 간격을 주겠다.
  & {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const Main = () => {
  // useNavigate 라는 훅스를 이용해서, 페이징 하기..
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div>
        <h1>Main View</h1>
        {/* css 적용하기 */}
        <Container>
          <MainTitleTextCss>styled-components test</MainTitleTextCss>
          <MainTextCss>React Test Project</MainTextCss>
          
          <Button
            title="publicDataPageTest/:category"
            type="primary"
            onClick={() => {
              // navigate("/publicDataPageTest/all");
              // all로 하면 처음버튼 누를때부터 해당 알림이 계속 뜨는 것이라
              // 첫 카테고리 누를 시 알림이 뜨도록 변경하여 해결
              navigate("/publicDataPageTest/busanFood");
            }}
          >
            publicDataPageTest/:category Button
          </Button>
        </Container>
      </div>
    </Wrapper>
  );
};

export default Main;
