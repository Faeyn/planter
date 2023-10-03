interface ButtonArgs {
  text: string;
  onClick: () => void;
  cssColor?: string;
}

const Button: React.FC<ButtonArgs> = ({
  text,
  onClick,
  cssColor = "bg-navaraNavy",
}) => {
  return (
    <button className={`mr-5 px-5 rounded-full ${cssColor}`} onClick={onClick}>
      <p className="text-white">{text}</p>{" "}
    </button>
  );
};

export default Button;
