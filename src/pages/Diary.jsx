import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  return <div>{params.id}번 일기Diary</div>;
};

export default Diary;
