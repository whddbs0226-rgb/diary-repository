// 모든 이미지는 이 js에 저장

// import.meta.glob("경로") : 경로 내의 모든 png 파일을 oject 형태로 반환
// {eager : true} : 동기적 호출 (필수)
const images = import.meta.glob("./../assets/*.png", { eager: true });

const imageMap = {};

for (const path in images) {
  // 경로에서 파일명만 추출 ("./../assets/emotion1.png" -> "emotion1")
  const fileName = path.split("/").pop().replace(".png", "");

  // path는 단순 문자열이므로 진짜 주소를 담고있는 images[path].default 사용
  imageMap[fileName] = images[path].default;
}

// 해당하는 imageName 받아 반환
export function getEmotionImage(imageName) {
  return imageMap[imageName] || null;
}

// 간단 예시
/* import emotion1 from "./../assets/emotion1.png";
import emotion2 from "./../assets/emotion2.png";
import emotion3 from "./../assets/emotion3.png";
import emotion4 from "./../assets/emotion4.png";
import emotion5 from "./../assets/emotion5.png";

export function getEmotionImage(emotionId) {
  switch (emotionId) {
    case 1:
      return emotion1;
    case 2:
      return emotion2;
    case 3:
      return emotion3;
    case 4:
      return emotion4;
    case 5:
      return emotion5;
    default:
      return null;
  }
}
 */
