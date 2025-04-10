import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SecondaryButton({
  text = "Settings",
  onClick,
  disabled = false,
  type = "button",
  textColor = "#2979FF",
  className = "",
  icon = null,
  loading = false,
  ...rest
}) {
  // Base styles
  const baseStyles = `
      flex flex-col items-center justify-center 
      px-6 py-4 gap-[0.25px] w-full h-[52px] 
      bg-[#1E1E2A] rounded-[16px] mt-4 
      self-stretch flex-none order-0 grow-0
      transition-all duration-200
    `;

  const textStyles = `text-[${textColor}]`;

  const disabledStyles =
    disabled || loading
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer hover:bg-[#2A2A38]";

  const buttonClasses =
    `${baseStyles} ${textStyles} ${disabledStyles} ${className}`.trim();

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
        <span className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </span>
      )}
    </button>
  );
}
