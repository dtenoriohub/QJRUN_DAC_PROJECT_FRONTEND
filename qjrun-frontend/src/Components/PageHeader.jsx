export default function PageHeader({
  title,
  buttonText,
  onButtonClick
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {buttonText && (
        <button
          // 🔑 A interrogação (?.) garante que se "onButtonClick" não for enviado, o React não trava a tela
          onClick={() => onButtonClick?.()}
          className="
            bg-green-700
            hover:bg-green-800
            text-white
            px-4
            py-2
            rounded-lg
            transition
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}