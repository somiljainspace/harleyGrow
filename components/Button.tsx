import Image from 'next/image';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  title: string;
  variant: string;
  icon?: string;
  onClick: () => void;
}

const Button = ({ type, title, variant, icon, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`btn ${variant}`} onClick={onClick}>
      {icon && <Image src={icon} alt={title} width={20} height={20} />}
      {title}
    </button>
  );
};

export default Button;