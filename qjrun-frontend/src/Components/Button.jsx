export default function Button({
  children,
  onClick,
  type = "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-lime-500
        hover:bg-lime-600
        text-black
        font-bold
        py-3
        rounded-xl
        transition
      "
    >
      {children}
    </button>
  );
}