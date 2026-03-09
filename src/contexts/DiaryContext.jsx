import { createContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { crudReducer } from '../util/reducer';

// 데이터를 전달할 Context 객체들
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 샘플 데이터 useReducer에 초기값이 있다면
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
  }, */
];

export function DiaryProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  // dispatch 호출 시 useReducer가 실행되며 crudReducer 호출
  const [data, dispatch] = useReducer(crudReducer, []); //  mockData : 초기값, 빈값은 []
  const idRef = useRef(0); // id 값, 초기값 세팅

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    const parsedData = JSON.parse(storedData) || []; // storedData 데이터 없을 시 빈 배열 처리

    // 리스트 중 가장 큰 id를 찾아서 다음에 생성될 idRef.current 세팅
    if (parsedData.length > 0) {
      const maxId = Math.max(...parsedData.map((item) => Number(item.id))); // 가진 배열의 id 최대값 추출

      idRef.current = maxId + 1; // 생성 시 다음 id 값 설정

      dispatch({
        type: 'INIT',
        data: parsedData,
      });
    }
    setIsLoading(false); // 데이터 없을 때도 로딩 해제
  }, []); // useEffect 사용 시 [] 를 사용할 경우 최초에 한번만 실행

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
    idRef.current += 1;
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

  // 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  const memoizedDispath = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  if (isLoading) {
    return <div>데이터 로딩 중입니다.</div>;
  }

  return (
    // diaryStateContext : props drilling을 방지하기 위한 데이터 전달 value 는 현재 useReducer에서 생성한 data 전달
    // DiaryStateContext 와 DiaryDispatchContext 의 상위 하위 관계는 어떻게 배치해도 상관 없음
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispath}>{children}</DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
