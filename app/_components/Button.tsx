"use client";
function Button({
  children,
  title,
  className,
  type = "primary",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  type?: "secondary" | "primary";
  disabled?: boolean;
  onClick?: () => void;
}) {
  let style;
  if (type === "primary") {
    style =
      "bg-black text-white hover:bg-white hover:text-black ring-transparent hover:ring-black";
  } else if (type === "secondary") {
    style =
      "bg-white text-black hover:bg-black hover:text-white ring-black hover:ring-transparent";
  }
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`${style} rounded-lg ring-1 duration-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
