import MainLayout from "../../Layouts/MainLayout";

export default function Turmas() {

  const turmas = [
    {
      id: 1,
      nome: "Iniciante",
      nivel: "INICIANTE",
      horario: "18:00 - 19:00"
    },
    {
      id: 2,
      nome: "Avançado",
      nivel: "AVANCADO",
      horario: "19:00 - 20:30"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Turmas
        </h1>

        <button
          className="
            bg-green-700
            hover:bg-green-800
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Nova Turma
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Nível</th>
              <th className="p-4 text-left">Horário</th>
              <th className="p-4 text-left">Ações</th>

            </tr>

          </thead>

          <tbody>

            {turmas.map(turma => (

              <tr
                key={turma.id}
                className="border-t"
              >

                <td className="p-4">{turma.nome}</td>
                <td className="p-4">{turma.nivel}</td>
                <td className="p-4">{turma.horario}</td>

                <td className="p-4 flex gap-2">

                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Editar
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Desativar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}