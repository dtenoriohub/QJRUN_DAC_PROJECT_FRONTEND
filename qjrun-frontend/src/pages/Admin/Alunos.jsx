import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Table from "../../Components/Table";
import api from "../../Api/api";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  async function carregarAlunos() {
    try {
      const response = await api.get("/alunos");
      setAlunos(response.data);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gestão de Alunos</h1>
      </div>

      <Table columns={["Nome", "Matrícula", "CPF", "Plano", "Turma", "Status"]}>
        {alunos.map((aluno) => (
          <tr key={aluno.id} className="border-t">
            <td className="p-4">{aluno.nome}</td>
            <td className="p-4">{aluno.matricula}</td>
            <td className="p-4">{aluno.cpf}</td>
            <td className="p-4">{aluno.plano}</td>
            <td className="p-4">{aluno.turma}</td>
            <td className="p-4">
              {aluno.ativo ? "Ativo" : "Inativo"}
            </td>
          </tr>
        ))}
      </Table>
    </MainLayout>
  );
}