import { useEffect } from 'react';

const usePageTitle = (title) => {
  // Index.html의 <Title> (페이지 타이틀) 변경
  useEffect(() => {
    const $title = document.getElementsByTagName('title')[0]; // Dom 요소 저장 시 $ 사용
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
