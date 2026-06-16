export default function Select({
  value,
  onChange,
  children
}) {
  return (
    <select
      value={value}
      onChange={onChange}
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
      "
    >
      {children}
    </select>
  );
}