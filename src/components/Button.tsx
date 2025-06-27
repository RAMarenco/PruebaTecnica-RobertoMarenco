interface ButtonProps {
  handleClick: () => void;
  title: string;
  className?: string;
}

const Button = ({handleClick, title, className} : ButtonProps) => {
  return (
    <button className={`flex flex-col justify-center items-center bg-white p-2 rounded border border-gray-400 cursor-pointer ${className}`} onClick={handleClick}>{title}</button>
  )
}

export default Button;