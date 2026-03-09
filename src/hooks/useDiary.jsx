import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../contexts/DiaryContext';
import { useNavigate } from 'react-router-dom';

// 함수 접두사에 use를 붙이면 커스텀 훅으로 사용하겠다는 선언
// id 값을 받아 해당 데이터를 불러오는 훅
const useDiary = (id) => {
  const data = useContext(DiaryStateContext); // 전체 일기 데이터를 Context에서 가져옴
  const [curDiaryItem, setCurDiaryItem] = useState(); // 현재 선택된 일기
  const nav = useNavigate();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const currentDiaryItem = data.find((item) => String(item.id) === String(id));

    if (!currentDiaryItem) {
      // 삭제로 인해 item이 없어진 것이 아닐 때만 alert 사용
      if (!curDiaryItem) {
        window.alert('존재하지 않는 일기입니다.');
        nav('/', { replace: true });
      }
      return;
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, data]); // id값 또는 data가 변경될 때 실행

  return curDiaryItem;
};

export default useDiary;
