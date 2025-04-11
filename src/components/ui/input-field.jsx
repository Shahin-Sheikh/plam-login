export function InputField({
  type = "text",
  placeholder = "Enter text",
  value,
  onChange,
  className = "",
  inputClassName = "",
  icon = null,
  disabled = false,
  required = false,
  ...rest
}) {
  const wrapperStyles = "flex items-center justify-center mb-4 relative";

  const baseInputStyles = `text-lg
    w-[336.3px] h-[56.5px] p-[14px] 
    bg-[] text-white rounded-[16px] 
    border border-white/12 
    flex items-center box-border flex-none order-2 self-stretch grow-0
    focus:outline-none focus:ring-2 focus:ring-[#F44336]/50
  `;

  const paddingStyles = icon ? "pl-12" : "pl-[14px]";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const inputClasses =
    `${baseInputStyles} ${paddingStyles} ${disabledStyles} ${inputClassName}`.trim();

  return (
    <div className={`${wrapperStyles} ${className}`}>
      {icon && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white-500/40">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...rest}
      />
    </div>
  );
}
