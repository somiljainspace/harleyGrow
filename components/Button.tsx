import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Made optional with a default
  title: string;
  variant?: string; // Optional for class customization
  icon?: string; // Icon made optional
  onClick?: () => void; // Optional onClick handler
  disabled?: boolean; // Added support for disabled state
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  title,
  variant = "px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors",
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`${variant} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <img
          src={icon}
          alt={`${title} icon`}
          className="inline-block w-4 h-4 mr-2 align-middle"
        />
      )}
      <span>{title}</span>
    </button>
  );
};

export default Button;
