import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import PageHeader from "../../Components/PageHeader";
import Table from "../../Components/Table";
import Input from "../../Components/Input"; 
import Button from "../../Components/Button"; 
import api from "../../Api/api";

export default function Planos() {
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // 📝 Estados para o Modal (Cadastro e Edição)
  const [modalAberto, setModalAberto] = useState(false);
  const [planoIdEdicao, setPlanoIdEdicao] = useState(null); // 🔑 Guarda o ID se for edição
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [duracaoMeses, setDuracaoMeses] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salvando, setSalvando] = useState(false);

  // 🔄 Função para buscar os planos do backend
  async function carregarPlanos() {
    try {
      setLoading(true);
      const response = await api.get("/planos");
      setPlanos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Erro ao buscar planos:", err);
      setErro("Não foi possível carregar a lista de planos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPlanos();
  }, []);

  // ✍️ Prepara o Modal com os dados do plano para Edição
  const iniciarEdicao = (plano) => {
    setPlanoIdEdicao(plano.id);
    setTipo(plano.tipo || "");
    setPreco(plano.preco || "");
    setDuracaoMeses(plano.duracaoMeses || "");
    setDescricao(plano.descricao || "");
    setModalAberto(true);
  };

  // 🧹 Reseta o formulário e fecha o modal
  const fecharModal = () => {
    setPlanoIdEdicao(null);
    setTipo("");
    setPreco("");
    setDuracaoMeses("");
    setDescricao("");
    setModalAberto(false);
  };

  // 💾 Envia o plano para o Backend (Suporta POST e PUT)
  const salvarPlano = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");

    try {
      const userJson = localStorage.getItem("@qjrun:user");
      const user = userJson ? JSON.parse(userJson) : null;

      const dadosPlano = {
        tipo,
        preco: parseFloat(preco),
        duracaoMeses: parseInt(duracaoMeses),
        descricao,
        administrador: {
          id: user?.id || 1
        }
      };

      if (planoIdEdicao) {
        // 🔄 Se tem ID de edição, atualiza com PUT
        await api.put(`/planos/${planoIdEdicao}`, dadosPlano);
      } else {
        // 📥 Se não tem, cria um novo com POST
        await api.post("/planos", dadosPlano);
      }

      fecharModal();
      carregarPlanos(); // Recarrega a tabela instantaneamente
    } catch (err) {
      console.error("Erro ao salvar o plano:", err);
      setErro("Falha ao salvar o plano. Verifique os dados inseridos.");
    } finally {
      setSalvando(false);
    }
  };

  // ❌ Deleta/Desativa o plano do banco
  const excluirPlano = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este plano?")) {
      try {
        setErro("");
        await api.delete(`/planos/${id}`);
        carregarPlanos(); // Atualiza a lista após deletar
      } catch (err) {
        console.error("Erro ao deletar plano:", err);
        setErro("Não foi possível excluir o plano selecionado.");
      }
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Planos"
        buttonText="Novo Plano"
        onButtonClick={() => setModalAberto(true)} 
      />

      {erro && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
          {erro}
        </div>
      )}

      {loading ? (
        <div className="p-6 text-gray-500 font-medium text-center">Carregando planos...</div>
      ) : (
        <Table columns={["Plano", "Preço", "Duração", "Criado Por", "Ações"]}>
          {planos.map((plano) => (
            <tr key={plano.id} className="border-t hover:bg-gray-50/50 transition">
              <td className="p-4 font-semibold text-gray-900">{plano.tipo || "Sem Tipo"}</td>
              <td className="p-4 text-gray-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plano.preco || 0)}
              </td>
              <td className="p-4 text-gray-500">
                {plano.duracaoMeses ? `${plano.duracaoMeses} meses` : "Não informada"}
              </td>
              <td className="p-4 text-gray-500 text-sm">{plano.administrador?.nome || "Sistema"}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  {/* 🔑 Botão Editar - Passa o objeto do plano atual */}
                  <button 
                    onClick={() => iniciarEdicao(plano)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Editar
                  </button>
                  {/* 🔑 Botão Remover - Passa o ID do plano atual */}
                  <button 
                    onClick={() => excluirPlano(plano.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                  >
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl relative">
            
            {/* O título muda dinamicamente com base no estado de edição */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {planoIdEdicao ? "Editar Plano" : "Cadastrar Novo Plano"}
            </h2>

            <form onSubmit={salvarPlano} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Plano / Tipo</label>
                <Input
                  type="text"
                  placeholder="Ex: Plano Mensal, Plano Anual"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="99.90"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duração (Meses)</label>
                  <Input
                    type="number"
                    placeholder="Ex: 1, 6, 12"
                    value={duracaoMeses}
                    onChange={(e) => setDuracaoMeses(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 min-h-[80px]"
                  placeholder="Detalhes sobre os benefícios do plano..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  onClick={fecharModal}
                  disabled={salvando}
                >
                  Cancelar
                </button>
                <div className="w-36">
                  <Button type="submit" disabled={salvando}>
                    {salvando ? "Salvando..." : planoIdEdicao ? "Salvar Alterações" : "Salvar Plano"}
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