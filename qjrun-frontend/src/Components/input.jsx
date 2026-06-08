export default function Input({
  type = "text",
  placeholder
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        border
        border-gray-300
        rounded-xl
        px-4
        py-3
        focus:outline-none
        focus:ring-2
        focus:ring-lime-500
        focus:border-lime-500
      "
    />
  );
}