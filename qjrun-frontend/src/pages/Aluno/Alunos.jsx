import { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import PageHeader from "../Components/PageHeader";
import Table from "../Components/Table";
import Input from "../Components/Input";
import Button from "../Components/Button";
import api from "../../Api/api";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]); // 📦 Guarda os planos cadastrados para o <select>
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // 📝 Estados do Modal de Cadastro / Edição
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoIdEdicao, setAlunoIdEdicao] = useState(null);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [planoIdSelecionado, setPlanoIdSelecionado] = useState("");
  const [salvando, setSalvando] = useState(false);

  // 🔄 Carrega Alunos e Planos paralelos do Backend
  async function carregarDados() {
    try {
      setLoading(true);
      const [resAlunos, resPlanos] = await Promise.all([
        api.get("/alunos"),
        api.get("/planos")
      ]);

      setAlunos(Array.isArray(resAlunos.data) ? resAlunos.data : []);
      setPlanos(Array.isArray(resPlanos.data) ? resPlanos.data : []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setErro("Não foi possível carregar as informações do sistema.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // ✍️ Prepara o formulário para edição
  const iniciarEdicao = (aluno) => {
    setAlunoIdEdicao(aluno.id);
    setNome(aluno.nome || "");
    setMatricula(aluno.matricula || "");
    setEmail(aluno.email || "");
    setCpf(aluno.cpf || "");
    setTelefone(aluno.telefone || "");
    setPlanoIdSelecionado(aluno.plano?.id || ""); // Seleciona o ID do plano atual do aluno
    setModalAberto(true);
  };

  // 🧹 Limpa os campos e fecha o modal
  const fecharModal = () => {
    setAlunoIdEdicao(null);
    setNome("");
    setMatricula("");
    setEmail("");
    setCpf("");
    setTelefone("");
    setPlanoIdSelecionado("");
    setModalAberto(false);
  };

  // 💾 Envia os dados salvando ou atualizando o aluno
  const salvarAluno = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");

    try {
      const dadosAluno = {
        nome,
        matricula,
        email,
        cpf,
        telefone,
        perfilAcesso: "ROLE_ALUNO",
        // Vincula o plano selecionado enviando apenas o ID que o JPA precisa para a FK
        plano: planoIdSelecionado ? { id: parseInt(planoIdSelecionado) } : null
      };

      if (alunoIdEdicao) {
        await api.put(`/alunos/${alunoIdEdicao}`, dadosAluno);
      } else {
        await api.post("/alunos", dadosAluno);
      }

      fecharModal();
      carregarDados();
    } catch (err) {
      console.error("Erro ao salvar aluno:", err);
      setErro("Falha ao salvar o registro do aluno. Verifique os campos.");
    } finally {
      setSalvando(false);
    }
  };

  // ❌ Exclui ou inativa o aluno
  const excluirAluno = async (id) => {
    if (window.confirm("Deseja realmente remover este aluno?")) {
      try {
        setErro("");
        await api.delete(`/alunos/${id}`);
        carregarDados();
      } catch (err) {
        console.error("Erro ao deletar:", err);
        setErro("Não foi possível excluir o aluno.");
      }
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Alunos"
        buttonText="Novo Aluno"
        onButtonClick={() => setModalAberto(true)}
      />

      {erro && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
          {erro}
        </div>
      )}

      {loading ? (
        <div className="p-6 text-gray-500 font-medium text-center">Carregando alunos...</div>
      ) : (
        <Table columns={["Nome", "Matrícula", "Plano contratado", "Status", "Ações"]}>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="border-t hover:bg-gray-50/50 transition">
              <td className="p-4 font-semibold text-gray-900">{aluno.nome}</td>
              <td className="p-4 text-gray-600 font-mono text-sm">{aluno.matricula || "---"}</td>
              <td className="p-4 text-gray-600">
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded">
                  {aluno.plano?.tipo || "Nenhum plano"}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  aluno.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {aluno.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button onClick={() => iniciarEdicao(aluno)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
                    Editar
                  </button>
                  <button onClick={() => excluirAluno(aluno.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* 🖼️ MODAL DE FORMULÁRIO (CADASTRO / EDIÇÃO) */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {alunoIdEdicao ? "Editar Informações do Aluno" : "Cadastrar Novo Aluno"}
            </h2>

            <form onSubmit={salvarAluno} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <Input type="text" placeholder="Ex: João Silva" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
                  <Input type="text" placeholder="Ex: 2026001" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <Input type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <Input type="email" placeholder="joao@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <Input type="text" placeholder="(83) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
              </div>

              {/* 🎯 O CAMPO SELECT INTEGRADO COM OS PLANOS DO BANCO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vincular a um Plano</label>
                <select
                  className="w-full border border-gray-300 bg-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 h-11"
                  value={planoIdSelecionado}
                  onChange={(e) => setPlanoIdSelecionado(e.target.value)}
                  required
                >
                  <option value="">Selecione um plano...</option>
                  {planos.map((plano) => (
                    <option key={plano.id} value={plano.id}>
                      {plano.tipo} — {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plano.preco || 0)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl" onClick={fecharModal} disabled={salvando}>
                  Cancelar
                </button>
                <div className="w-36">
                  <Button type="submit" disabled={salvando}>
                    {salvando ? "Salvando..." : alunoIdEdicao ? "Atualizar" : "Salvar Aluno"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}