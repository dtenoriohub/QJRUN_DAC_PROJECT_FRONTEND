import MainLayout from "../../Layouts/MainLayout";

export default function Dashboard() {

  const cards = [
    {
      titulo: "Meu Plano",
      valor: "Mensal"
    },
    {
      titulo: "Minha Turma",
      valor: "Iniciante"
    },
    {
      titulo: "Pagamentos Pendentes",
      valor: 1
    },
    {
      titulo: "Próximo Evento",
      valor: "Corrida da Primavera"
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Área do Aluno
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

            <p className="text-2xl font-bold mt-2">
              {card.valor}
            </p>

          </div>

        ))}

      </div>

    </MainLayout>
  );
}