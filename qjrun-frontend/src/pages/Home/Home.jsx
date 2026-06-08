export default function Home() {
  const cards = [
    "Alunos",
    "Professores",
    "Turmas",
    "Financeiro",
  ];

  return (
    <div className="p-8">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Dashboard
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        {cards.map((item) => (
          <div
            key={item}
            className="
              bg-white
              p-6
              rounded-xl
              shadow-md
              hover:shadow-lg
              transition
            "
          >
            <h2 className="text-xl font-semibold">
              {item}
            </h2>
          </div>
        ))}

      </div>
    </div>
  );
}