import './App.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound.jsx';

// 샘플 데이터
const mockData = [
  /*   {
    id: 1,
    createdDate: new Date('2026-02-25').getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date('2026-02-24').getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
  {
    id: 3,
    createdDate: new Date('2026-01-20').getTime(),
    emotionId: 3,
    content: '3번 일기 내용',
  }, */
];

// state : 현재의 상태 (초기에는 mokData)
// action : dispatch에 담은 내용
function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case 'INIT': // 페이지 로드 시 최초 한번만 실행
      return action.data;
    case 'CREATE': {
      // return [action.data, ...state]; // 신규 항목 추가
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      nextState = state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  // 로컬스트리지에 저장
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 diary 페이지
function App() {
  const [isLoading, setIsLoading] = useState(true);
  // dispatch 호출 시 useReducer가 실행되며 reducer 호출
  const [data, dispatch] = useReducer(reducer, []); //  mockData : 초기값, 빈값은 []
  const idRef = useRef(0); // id 값

  useEffect(() => {
    const storedData = localStorage.getItem('diary');

    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const paredData = JSON.parse(storedData);

    if (!Array.isArray(paredData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    paredData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: paredData,
    });
    setIsLoading(false);
  }, []); // useEffect 사용 시 마지막 [] 는 최초에 한번만 실행

  /*
  // NOTE : 로컬스토리지(간단한 웹 DB 사용해서 데이터 등록, 사용, 삭제 )

  localStorage.setItem('test', 'hello');
  localStorage.setItem('person', JSON.stringify({ name: 'personName' })); // 객체는 문자열화 해서 저장

  localStorage.setItem('get', 'hello');
  JSON.parse(localStorage.getItem("person"))  // JSON 화 해서 사용

  localStorage.removeItem('test');
  localStorage.removeItem('person');
  */

  // 등록
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 수정
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩 중입니다.</div>;
  }

  return (
    <>
      {/* <Header
        title={"Header"}
        leftChild={<Button text={"left"}></Button>}
        rightChild={<Button text={"right"}></Button>}
      />

      <Button
        text={"123"}
        type={"DEFAULT"}
        onClick={() => {
          console.log("버튼 클릭");
        }}
      ></Button>

      <Button
        text={"123"}
        type={"POSITIVE"}
        onClick={() => {
          console.log("버튼 클릭");
        }}
      ></Button>

      <Button
        text={"123"}
        type={"NEGATIVE"}
        onClick={() => {
          console.log("버튼 클릭");
        }}
      ></Button> */}

      {/* NOTE : context 파일 분리, provier */}
      {/* diaryStateContext : props drilling을 방지하기 위한 데이터 전달 value 는 현재 useReducer에서 생성한 data 전달 */}
      <DiaryStateContext value={data}>
        <DiaryDispatchContext value={{ onCreate, onUpdate, onDelete }}>
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
        </DiaryDispatchContext>
      </DiaryStateContext>
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
