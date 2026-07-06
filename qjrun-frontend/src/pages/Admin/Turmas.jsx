import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import PageHeader from "../../Components/PageHeader";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal";
import api from "../../Api/api";

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  
  // Estados para Modal de Cadastro/Edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    nivelTurma: "INICIANTE",
    horarioInicio: "",
    horarioTermino: ""
  });

  // Estados para Modal de Vínculo
  const [isVinculoModalOpen, setIsVinculoModalOpen] = useState(false);
  const [alunosDisponiveis, setAlunosDisponiveis] = useState([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);

  // Estados para Modal de Visualização
  const [isViewStudentsModalOpen, setIsViewStudentsModalOpen] = useState(false);
  const [alunosDaTurma, setAlunosDaTurma] = useState([]);
  
  // Estado único para a Turma sendo manipulada
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  async function carregarTurmas() {
    try {
      const response = await api.get("/turmas");
      setTurmas(response.data);
    } catch (err) {
      console.error("Erro ao buscar turmas:", err);
    }
  }

  // --- Lógica de Visualização ---
  async function handleViewStudents(turma) {
    setTurmaSelecionada(turma);
    try {
      const response = await api.get(`/turmas/${turma.id}/alunos`);
      setAlunosDaTurma(response.data);
      setIsViewStudentsModalOpen(true);
    } catch (err) {
      alert("Erro ao carregar alunos da turma.");
    }
  }

  // --- Lógica de Criação/Edição ---
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingTurma) {
        await api.put(`/turmas/${editingTurma.id}`, formData);
      } else {
        await api.post("/turmas", formData);
      }
      setIsModalOpen(false);
      carregarTurmas();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }
  }

  function handleOpenCreate() {
    setEditingTurma(null);
    setFormData({ nome: "", nivelTurma: "INICIANTE", horarioInicio: "", horarioTermino: "" });
    setIsModalOpen(true);
  }

  function handleOpenEdit(turma) {
    setEditingTurma(turma);
    setFormData(turma);
    setIsModalOpen(true);
  }

  // --- Lógica de Vínculo ---
  async function handleOpenVinculo(turma) {
    setTurmaSelecionada(turma);
    setAlunosSelecionados([]);
    setIsVinculoModalOpen(true);
    try {
      const response = await api.get("/alunos");
      setAlunosDisponiveis(response.data);
    } catch (err) {
      console.error("Erro ao carregar alunos:", err);
    }
  }

  async function handleConfirmVinculo() {
    try {
      await Promise.all(
        alunosSelecionados.map(alunoId =>
          api.post(`/turmas/${turmaSelecionada.id}/alunos/${alunoId}`)
        )
      );
      alert("Alunos vinculados com sucesso!");
      setIsVinculoModalOpen(false);
      carregarTurmas();
    } catch (err) {
      alert("Erro ao vincular alunos: " + err.message);
    }
  }

  // --- Lógica de Exclusão ---
  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja remover esta turma?")) {
      try {
        await api.delete(`/turmas/${id}`);
        carregarTurmas();
      } catch (err) {
        alert("Erro ao excluir turma.");
      }
    }
  }

  async function handleRemoveAluno(alunoId) {
    if (window.confirm("Deseja realmente remover este aluno da turma?")) {
      try {
        await api.delete(`/turmas/${turmaSelecionada.id}/alunos/${alunoId}`);
        setAlunosDaTurma(alunosDaTurma.filter(a => a.id !== alunoId));
        carregarTurmas(); 
      } catch (err) {
        alert("Erro ao remover aluno: " + err.message);
      }
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);

  return (
    <MainLayout>
      {/* Cabeçalho atualizado para usar o componente PageHeader */}
      <PageHeader
        title="Gestão de Turmas"
        buttonText="Nova Turma"
        onButtonClick={handleOpenCreate}
      />

      <Table columns={["Nome", "Nível", "Horário", "Alunos", "Ações"]}>
        {turmas.map((turma) => (
          <tr key={turma.id} className="border-t">
            <td className="p-4">{turma.nome}</td>
            <td className="p-4">{turma.nivelTurma}</td>
            <td className="p-4">{turma.horarioInicio} - {turma.horarioTermino}</td>
            
            {/* Aqui foi aplicado o distanciamento */}
            <td className="p-4">
              <div className="flex flex-col items-start gap-2">
                <span className="font-semibold">{turma.quantidadeAlunosAtuais}</span>
                <button
                  onClick={() => handleViewStudents(turma)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                >
                  Visualizar alunos
                </button>
              </div>
            </td>

            <td className="p-4 flex gap-2">
              <button onClick={() => handleOpenEdit(turma)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition">Editar</button>
              <button onClick={() => handleOpenVinculo(turma)} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">Vincular</button>
              <button onClick={() => handleDelete(turma.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">Excluir</button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Modal de Cadastro/Edição */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTurma ? "Editar Turma" : "Cadastrar Nova Turma"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome da Turma</label>
            <input required className="w-full border p-2 rounded" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nível</label>
            <select className="w-full border p-2 rounded" value={formData.nivelTurma} onChange={e => setFormData({ ...formData, nivelTurma: e.target.value })}>
              <option value="INICIANTE">Iniciante</option>
              <option value="MEDIO">Médio</option>
              <option value="AVANCADO">Avançado</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Início</label>
              <input type="time" required className="w-full border p-2 rounded" value={formData.horarioInicio} onChange={e => setFormData({ ...formData, horarioInicio: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Término</label>
              <input type="time" required className="w-full border p-2 rounded" value={formData.horarioTermino} onChange={e => setFormData({ ...formData, horarioTermino: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded font-bold">Salvar Turma</button>
          </div>
        </form>
      </Modal>

      {/* Modal de Vínculo */}
      <Modal isOpen={isVinculoModalOpen} onClose={() => setIsVinculoModalOpen(false)} title={`Vincular Alunos a ${turmaSelecionada?.nome}`}>
        <div className="max-h-60 overflow-y-auto space-y-2 mb-4 border p-2 rounded">
          {alunosDisponiveis.map(aluno => (
            <label key={aluno.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) setAlunosSelecionados([...alunosSelecionados, aluno.id]);
                else setAlunosSelecionados(alunosSelecionados.filter(id => id !== aluno.id));
              }} />
              {aluno.nome}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setIsVinculoModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded">Cancelar</button>
          <button onClick={handleConfirmVinculo} className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Confirmar Vínculo</button>
        </div>
      </Modal>

      {/* Modal de Visualização */}
      <Modal isOpen={isViewStudentsModalOpen} onClose={() => setIsViewStudentsModalOpen(false)} title={`Alunos: ${turmaSelecionada?.nome || ""}`}>
        <div className="max-h-80 overflow-y-auto">
          {alunosDaTurma.length > 0 ? (
            <ul className="divide-y">
              {alunosDaTurma.map(aluno => (
                <li key={aluno.id} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{aluno.nome}</span>
                    <span className="text-gray-500 text-sm block">{aluno.email}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveAluno(aluno.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhum aluno matriculado nesta turma.</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={() => setIsViewStudentsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded">Fechar</button>
        </div>
      </Modal>
    </MainLayout>
  );
}