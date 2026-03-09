import './Button.css';

//  variant: css 스타일 (POSITIVE | NEGATIVE) 미지정 시 기본 스타일
const Button = ({ text, variant, children, ...props }) => {
  const classNames = ['Button', variant ? `Button_${variant}` : ''].filter(Boolean).join(' ');
  return (
    <button
      className={classNames}
      {...props}
    >
      {/* children이 있으면 text 대신 children 렌더 (아이콘,텍스트 등 확장용) */}
      {children ?? text}
    </button>
  );
};

export default Button;
