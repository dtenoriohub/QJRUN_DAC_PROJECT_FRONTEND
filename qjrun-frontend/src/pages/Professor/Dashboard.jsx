import MainLayout from "../../Layouts/MainLayout";

export default function Dashboard() {

  const cards = [
    {
      titulo: "Turmas",
      valor: 3
    },
    {
      titulo: "Alunos",
      valor: 42
    },
    {
      titulo: "Eventos",
      valor: 5
    },
    {
      titulo: "Próxima Aula",
      valor: "18:00"
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Área do Professor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map(card => (

          <div
            key={card.titulo}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-gray-500">
              {card.titulo}
            </h2>

            <p className="text-3xl font-bold mt-2">
              {card.valor}
            </p>

          </div>

        ))}

      </div>

    </MainLayout>
  );
}