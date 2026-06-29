export default function Input({
  type = "text",
  placeholder,
  ...props // 🔑 O segredo está aqui! Captura todas as outras propriedades (name, value, onChange)
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...props} // 🔑 Injeta as propriedades dinamicamente na tag nativa
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