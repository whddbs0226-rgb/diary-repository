import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Notfound = () => {
  const nav = useNavigate();

  return (
    <>
      <div>잘못된 페이지입니다.</div>
      <Button
        onClick={() => nav('/')}
        text={'홈으로 가기'}
      ></Button>
    </>
  );
};

export default Notfound;
