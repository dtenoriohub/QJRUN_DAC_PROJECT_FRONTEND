import MainLayout from "../../Layouts/MainLayout";

export default function MeusAlunos() {

  const alunos = [
    {
      id: 1,
      nome: "João Silva",
      turma: "Iniciante"
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      turma: "Intermediário"
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Meus Alunos
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Nome
              </th>

              <th className="p-4 text-left">
                Turma
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
                  {aluno.turma}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}