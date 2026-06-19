import { useEffect, useState } from "react";

import CrudPage from "../../Components/CrudPage";

import {
  listarAlunos
} from "../../Services/alunoService";

export default function Alunos() {

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {

    try {

      const dados = await listarAlunos();

      setAlunos(dados);

    } catch (error) {

      console.error(
        "Erro ao carregar alunos:",
        error
      );

    }

  }

  return (

    <CrudPage
      title="Alunos"
      buttonText="Novo Aluno"
      columns={[
        "Nome",
        "Matrícula",
        "Plano",
        "Turma",
        "Ações"
      ]}
      data={alunos}
      renderRow={(aluno) => (

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
            {aluno.plano?.tipo || "-"}
          </td>

          <td className="p-4">
            {aluno.turma?.nome || "-"}
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

      )}
    />

  );

}