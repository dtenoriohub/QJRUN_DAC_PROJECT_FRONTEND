export default function Button({
  children,
  onClick,
  type = "submit", // 🔑 Mudamos o padrão para "submit" para disparar os formulários!
  ...props         // 📦 Captura qualquer outra propriedade extra (como o disabled)
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}   // 👈 Aplica o disabled e outras propriedades dinamicamente aqui
      className="
        w-full
        bg-lime-500
        hover:bg-lime-600
        text-black
        font-bold
        py-3
        rounded-xl
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
}