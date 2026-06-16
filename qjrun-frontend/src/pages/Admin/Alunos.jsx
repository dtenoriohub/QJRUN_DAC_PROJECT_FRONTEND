import MainLayout from "../../Layouts/MainLayout";

export default function Alunos() {

  const alunos = [
    {
      id: 1,
      nome: "João Silva",
      matricula: "2025001",
      plano: "Plano Pendente",
      turma: "Sem Turma"
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      matricula: "2025002",
      plano: "Mensal",
      turma: "Iniciante"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Alunos
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
          Novo Aluno
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="text-left p-4">
                Nome
              </th>

              <th className="text-left p-4">
                Matrícula
              </th>

              <th className="text-left p-4">
                Plano
              </th>

              <th className="text-left p-4">
                Turma
              </th>

              <th className="text-left p-4">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {alunos.map(aluno => (

              <tr
                key={aluno.id}
                className="border-t"
              >

                <td className="p-4">
                  {aluno.nome}
                </td>

                <td className="p-4">
                  {aluno.matricula}
                </td>

                <td className="p-4">
                  {aluno.plano}
                </td>

                <td className="p-4">
                  {aluno.turma}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    className="
                      bg-blue-600
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Editar
                  </button>

                  <button
                    className="
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
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