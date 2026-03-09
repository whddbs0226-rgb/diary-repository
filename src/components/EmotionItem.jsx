import { getEmotionImage } from '../util/get-emotion-image';
import './EmotionItem.css';

// 감정 아이콘 컴포넌트
const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ''}`}
    >
      <img
        className="emotion_img"
        src={getEmotionImage(`emotion${emotionId}`)}
      />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
