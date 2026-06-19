import MainLayout from "../Layouts/MainLayout";
import PageHeader from "../Components/PageHeader";
import Table from "../Components/Table";

export default function Alunos() {

  const alunos = [
    {
      id: 1,
      nome: "João Silva",
      matricula: "2025001",
      plano: "Plano Pendente",
      turma: "Sem Turma"
    }
  ];

  return (

    <MainLayout>

      <PageHeader
        title="Alunos"
        buttonText="Novo Aluno"
      />

      <Table
        columns={[
          "Nome",
          "Matrícula",
          "Plano",
          "Turma",
          "Ações"
        ]}
      >

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

            <td className="p-4">

              <div className="flex gap-2">

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

              </div>

            </td>

          </tr>

        ))}

      </Table>

    </MainLayout>

  );

}