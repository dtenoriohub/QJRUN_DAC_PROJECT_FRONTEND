import MainLayout from "../../Layouts/MainLayout";

export default function Dashboard() {
  const cards = [
    {
      titulo: "Alunos",
      valor: 124
    },
    {
      titulo: "Professores",
      valor: 8
    },
    {
      titulo: "Turmas",
      valor: 12
    },
    {
      titulo: "Pagamentos Pendentes",
      valor: 15
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Administrativo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map(card => (
          <div
            key={card.titulo}
            className="
              bg-white
              rounded-xl
              shadow
              p-6
            "
          >
            <h2 className="text-gray-500 text-sm">
              {card.titulo}
            </h2>

            <p className="text-3xl font-bold mt-2">
              {card.valor}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Últimos Cadastros
        </h2>

        <ul className="space-y-2">
          <li>João Silva</li>
          <li>Maria Oliveira</li>
          <li>Carlos Pereira</li>
        </ul>

      </div>

    </MainLayout>
  );
}