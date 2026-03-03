import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import useDiary from '../hooks/useDiary';
import usePageTitle from '../hooks/usePageTitle';

const Edit = () => {
  const params = useParams(); // 파라미터 사용
  usePageTitle(`${params.id}번 일기 수정`); // page Title

  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    // alert 확인 누르면 실행
    if (window.confirm('일기를 정말 삭제하시겠습니까?')) {
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);

      nav('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={
          <Button
            onClick={() => nav(-1)}
            text={'< 뒤로가기'}
          />
        }
        rightChild={
          <Button
            onClick={onClickDelete}
            text={'삭제하기'}
            type={'NEGATIVE'}
          />
        }
      />
      <Editor
        initData={curDiaryItem}
        onSubmit={onSubmit}
      />
    </div>
  );
};
export default Edit;
