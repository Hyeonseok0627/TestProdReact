import "./App.css";
// 자식 컴포넌트 요소
import Main from "./component/Main";
// 페이지 이동을 위한 설정 1
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 스크롤 ref 테스트 컴포넌트 가져오기.
import PublicDataPage from "./ch13-1_API_Practice/page/PublicDataPage";

function App() {
  return (
    // 페이지 이동을 위한 설정 2. 전체 요소를
    //BrowserRouter 로 감싸기.
    // 구성요소는 Routes -> Route 로 구성할 예정.
    <BrowserRouter>
      <Routes>
        {/* 메인으로 사용할(index->주소에서 : / ) 페이지를 App 또는 Main.js 로 해도 됨 */}
        <Route index element={<Main />} />
        <Route
          path="publicDataPageTest/:category"
          element={<PublicDataPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
