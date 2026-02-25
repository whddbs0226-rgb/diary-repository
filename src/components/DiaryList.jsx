import { useNavigate } from 'react-router-dom';
import Button from './Button';
import DiaryItem from './DiaryItem';
import './DiaryList.css';
import { useState } from 'react';

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // sort => 원본 배열을 정렬, toSorted => 원본배열은 그대로, 새로운 배열을 정렬
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return a.createdDate - b.createdDate;
      } else {
        return b.createdDate - a.createdDate;
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button onClick={() => nav('/new')} text={'새로운 일기 쓰기'} type={'POSITIVE'} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item}></DiaryItem>
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
