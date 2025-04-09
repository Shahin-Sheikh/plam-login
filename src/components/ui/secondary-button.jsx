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
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
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
