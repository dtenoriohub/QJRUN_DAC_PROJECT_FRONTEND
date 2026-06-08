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
        rounded-lg
        px-3
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />
  );
}