import MainLayout from "../../Layouts/MainLayout";

export default function MinhasTurmas() {

  const turmas = [
    {
      id: 1,
      nome: "Iniciante",
      horario: "18:00 - 19:00"
    },
    {
      id: 2,
      nome: "Intermediário",
      horario: "19:00 - 20:00"
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Minhas Turmas
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">
              <th className="p-4 text-left">Turma</th>
              <th className="p-4 text-left">Horário</th>
            </tr>

          </thead>

          <tbody>

            {turmas.map(turma => (

              <tr
                key={turma.id}
                className="border-t"
              >

                <td className="p-4">{turma.nome}</td>
                <td className="p-4">{turma.horario}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}