import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function PrimaryButton({
  text = "Continue",
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "large",
  className = "",
  icon = null,
  loading = false,
  ...rest
}) {
  const baseStyles =
    "mt-6 font-bold flex items-center justify-center w-full max-w-sm text-white rounded-xl transition-all duration-200";

  const variantStyles = {
    primary: "bg-[#2979FF] hover:bg-[#1e62d8]",
    secondary: "bg-gray-500 hover:bg-gray-600",
    outline:
      "bg-transparent border border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10",
  };

  const sizeStyles = {
    small: "py-2 px-3 text-sm",
    medium: "py-3 px-4 text-base",
    large: "p-4 text-lg",
  };

  const disabledStyles =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const buttonClasses =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} mt-4 ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center">
          <AiOutlineLoading3Quarters />
          Loading...
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
}
