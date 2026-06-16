import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { alunoService } from "../../Services/alunoService";

export default function Alunos() {

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    try {
      const data = await alunoService.getAll();
      setAlunos(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Alunos
        </h1>

        <button
          className="
            bg-lime-500
            hover:bg-lime-600
            text-black
            font-semibold
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

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Ações</th>
            </tr>

          </thead>

          <tbody>

            {alunos.map(aluno => (

              <tr
                key={aluno.id}
                className="border-t"
              >
                <td className="p-4">{aluno.id}</td>
                <td className="p-4">{aluno.nome}</td>
                <td className="p-4">{aluno.email}</td>

                <td className="p-4 flex gap-2">

                  <button
                    className="
                      bg-blue-500
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
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Excluir
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