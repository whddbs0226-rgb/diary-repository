import Header from '../components/Header';
import Button from '../components/Button';

const New = () => {
  return (
    <div>
      <Header title={'새 일기 쓰기'} leftChild={<Button text={'< 뒤로 가기'}></Button>}></Header>
    </div>
  );
};

export default New;
