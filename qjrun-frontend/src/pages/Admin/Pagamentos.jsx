import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPagamentos();
  }, []);

  async function carregarPagamentos() {
    try {
      setLoading(true);
      // Busca os pagamentos reais do banco de dados
      const response = await api.get("/pagamentos");
      setPagamentos(response.data);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
      alert("Não foi possível carregar a lista de pagamentos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmar(id) {
    const confirmar = window.confirm("Confirma o recebimento real deste valor?");
    if (!confirmar) return;

    try {
      // 🚀 Chama a nossa rota que faz a mágica da automação!
      await api.put(`/pagamentos/${id}/confirmar`);
      alert("Pagamento confirmado com sucesso!");
      
      // Recarrega a tabela para atualizar o status e remover o botão
      carregarPagamentos();
    } catch (error) {
      console.error("Erro ao confirmar:", error);
      alert("Erro ao confirmar pagamento: " + (error.response?.data?.message || "Tente novamente"));
    }
  }

  // Helper para formatar moeda
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
  };

  // Helper para extrair os detalhes dependendo se é Plano ou Inscrição
  const extrairDetalhes = (pagamento) => {
    if (pagamento.tipoPagamento === 'PLANO' && pagamento.plano) {
      return { 
        descricao: `Plano ${pagamento.plano.tipo}`, 
        valor: pagamento.plano.preco 
      };
    } else if (pagamento.tipoPagamento === 'INSCRICAO' && pagamento.inscricao?.evento) {
      return { 
        descricao: `Evento: ${pagamento.inscricao.evento.nome}`, 
        valor: pagamento.inscricao.evento.valor 
      };
    }
    return { descricao: "Cobrança Avulsa", valor: pagamento.valor || 0 };
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pagamentos</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left font-semibold text-gray-700">Aluno</th>
              <th className="p-4 text-left font-semibold text-gray-700">Referência</th>
              <th className="p-4 text-left font-semibold text-gray-700">Valor</th>
              <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              <th className="p-4 text-left font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">Buscando histórico financeiro...</td>
              </tr>
            ) : pagamentos.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">Nenhum pagamento registrado no sistema.</td>
              </tr>
            ) : (
              pagamentos.map((pagamento) => {
                const detalhes = extrairDetalhes(pagamento);

                return (
                  <tr key={pagamento.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-800">{pagamento.aluno?.nome || "N/A"}</td>
                    <td className="p-4 text-gray-600">{detalhes.descricao}</td>
                    <td className="p-4 font-semibold text-gray-800">{formatarMoeda(detalhes.valor)}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          pagamento.status === "PAGO"
                            ? "bg-green-100 text-green-800"
                            : pagamento.status === "ATRASADO"
                            ? "bg-red-100 text-red-800"
                            : pagamento.status === "CANCELADO"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {pagamento.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* Mostra o botão apenas se o pagamento ainda estiver Pendente ou Atrasado */}
                      {(pagamento.status === "PENDENTE" || pagamento.status === "ATRASADO") && (
                        <button
                          onClick={() => handleConfirmar(pagamento.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-sm text-sm"
                        >
                          Confirmar Recebimento
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}