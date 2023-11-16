import React, { useCallback, useState } from "react";
import Categories from "./Categories";
import PublicDataList from "./PublicDataList";

const MainPublicData = () => {
  //공공데이터 메인에서, 카테고리 값을 state 관리, props 로 전달해서, 이벤트 핸들러 추가.
  const [category, setCategory] = useState("all");
  const onSelect = useCallback((category) => {
    setCategory(category);
  }, []);

  return (
    <div>
      <Categories category={category} onSelect={onSelect} />
      <PublicDataList category={category} />
    </div>
  );
};

export default MainPublicData;
