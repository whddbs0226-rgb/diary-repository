import './App.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useReducer, useRef, createContext } from 'react';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound.jsx';

// 샘플 데이터
const mockData = [
  {
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
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE': // 신규 항목 추가
      return [action.data, ...state];
    case 'UPDATE': // 수정
      return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
    case 'DELETE': // 삭제
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 diary 페이지
function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4); // id 2번까지 mock 데이터

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

      {/* diaryStateContext : props drilling을 방지하기 위한 데이터 전달 value 는 현재 useReducer에서 생성한 data 전달 */}
      <DiaryStateContext value={data}>
        <DiaryDispatchContext value={{ onCreate, onUpdate, onDelete }}>
          {/* Routes 컴포넌트 안에는 Route 컴포넌트만 가능 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/*" element={<Notfound />} />
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
