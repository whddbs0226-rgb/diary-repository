import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound.jsx";

import { getEmotionImage } from "./util/get-emotion-image.js";
// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 diary 페이지
function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/new");
  };

  return (
    <>
      <div>
        {/* public에 넣은 이미지는 최적화가 되지 않음 (새로고침 시 이미지를 다시 불러옴) import하는 이미지가 매우 많을때 사용 권장 */}
        {/* <img src={"/emotion1_public.png"} /> */}
        {/* <img src={"/emotion2_public.png"} /> */}
      </div>
      <div>
        {/* assets에 넣은 이미지는 최적화됨 (이미지를 메모리 캐시에 저장한 뒤 새로고침 시 다시 불러오지 않고 보여줄 수 있음) */}
        <img src={getEmotionImage(1)}></img>
        <img src={getEmotionImage(2)}></img>
        <img src={getEmotionImage(3)}></img>
        <img src={getEmotionImage(4)}></img>
        <img src={getEmotionImage(5)}></img>
      </div>
      <div>
        {/* <Link> => client side renderind || <a> => server side rendering */}
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
      </div>
      <button onClick={onClickButton}>New 페이지로 이동</button>

      {/* Routes 컴포넌트 안에는 Route 컴포넌트만 가능 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
