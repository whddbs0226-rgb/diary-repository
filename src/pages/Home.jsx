import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { useState, useContext } from 'react';
import { DiaryStateContext } from '../contexts/DiaryContext';
import usePageTitle from '../hooks/usePageTitle';

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime(); // 년 월 1일 0시 0분 0초
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // 이전 월의 마지막 날 23시 59분 59초

  return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
};

const Home = () => {
  usePageTitle('감정 일기장'); // page Title
  const data = useContext(DiaryStateContext); // 일기 데이터 호출
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  const onChangeMonth = (offset) => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + offset));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={
          <Button
            onClick={() => onChangeMonth(-1)}
            text={'<'}
          />
        }
        rightChild={
          <Button
            onClick={() => onChangeMonth(1)}
            text={'>'}
          />
        }
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
