import "./Button.css";

const Button = ({ text, type, ...props }) => {
  return (
    <button className={`Button Button_${type}`} {...props}>
      {text}
    </button>
  );
};

export default Button;
