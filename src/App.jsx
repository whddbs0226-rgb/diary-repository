import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';
import { DiaryProvider } from './contexts/DiaryContext';

function App() {
  return (
    <>
      <DiaryProvider>
        {/* Routes 컴포넌트 안에는 Route 컴포넌트만 가능 */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/new"
            element={<New />}
          />
          <Route
            path="/edit/:id"
            element={<Edit />}
          />
          <Route
            path="/diary/:id"
            element={<Diary />}
          />
          <Route
            path="/*"
            element={<Notfound />}
          />
        </Routes>
      </DiaryProvider>
    </>
  );
}

export default App;

{
  /* <div>
        {// public에 넣은 이미지는 최적화가 되지 않음 (새로고침 시 이미지를 다시 불러옴) import하는 이미지가 매우 많을때 사용 권장 }
        {<img src={"/emotion1_public.png"} /> }
        {<img src={"/emotion2_public.png"} /> }
      </div>
      <div>
        {// assets에 넣은 이미지는 최적화됨 (이미지를 메모리 캐시에 저장한 뒤 새로고침 시 다시 불러오지 않고 보여줄 수 있음) }
        <img src={getEmotionImage("emotion1")}></img>
        <img src={getEmotionImage("emotion2")}></img>
        <img src={getEmotionImage("emotion3")}></img>
        <img src={getEmotionImage("emotion4")}></img>
        <img src={getEmotionImage("emotion5")}></img>
      </div>
      <div>
        {// <Link> => client side renderind || <a> => server side rendering }
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
      </div>
      <button onClick={onClickButton}>New 페이지로 이동</button> */
}

/*
  // NOTE : 로컬스토리지(간단한 웹 DB 사용해서 데이터 등록, 사용, 삭제 )

  localStorage.setItem('test', 'hello');
  localStorage.setItem('person', JSON.stringify({ name: 'personName' })); // 객체는 문자열화 해서 저장

  localStorage.setItem('get', 'hello');
  JSON.parse(localStorage.getItem("person"))  // JSON 화 해서 사용

  localStorage.removeItem('test');
  localStorage.removeItem('person');
  */
