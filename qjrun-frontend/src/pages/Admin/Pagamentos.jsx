import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { toast } from "react-toastify";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados da Paginação
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // O useEffect "ouve" a página atual. Se mudar, busca os dados novamente
  useEffect(() => {
    carregarPagamentos(paginaAtual);
  }, [paginaAtual]);

  async function carregarPagamentos(page = 0) {
    try {
      setLoading(true);
      // Busca paginada: envia a página e o tamanho para o Spring Boot
      const response = await api.get(`/pagamentos?page=${page}&size=7`);
      
      // O Spring Boot devolve os dados dentro de "content"
      setPagamentos(response.data.content || []);
      setTotalPaginas(response.data.totalPages || 0);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
      toast.error("Não foi possível carregar a lista de pagamentos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmar(id) {
    const confirmar = window.confirm("Confirma o recebimento real deste valor?");
    if (!confirmar) return;

    try {
      await api.put(`/pagamentos/${id}/confirmar`);
      toast.success("Pagamento confirmado com sucesso!");
      
      // Recarrega a página ATUAL para atualizar o status na tabela sem perder a navegação
      carregarPagamentos(paginaAtual);
    } catch (error) {
      console.error("Erro ao confirmar:", error);
      toast.error("Erro ao confirmar pagamento: " + (error.response?.data?.message || "Tente novamente"));
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

  // Funções de navegação da paginação
  function irParaPaginaAnterior() {
    if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1);
  }

  function irParaProximaPagina() {
    if (paginaAtual < totalPaginas - 1) setPaginaAtual(paginaAtual + 1);
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Pagamentos</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
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

        {/* Controles de Paginação no rodapé da tabela */}
        {totalPaginas > 1 && (
          <div className="p-4 bg-gray-50 border-t flex items-center justify-between mt-auto">
            <span className="text-sm text-gray-600">
              Página <span className="font-bold">{paginaAtual + 1}</span> de <span className="font-bold">{totalPaginas}</span>
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={irParaPaginaAnterior}
                disabled={paginaAtual === 0}
                className={`px-4 py-2 text-sm font-semibold rounded-lg border transition ${
                  paginaAtual === 0 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 shadow-sm"
                }`}
              >
                Anterior
              </button>
              
              <button
                onClick={irParaProximaPagina}
                disabled={paginaAtual >= totalPaginas - 1}
                className={`px-4 py-2 text-sm font-semibold rounded-lg border transition ${
                  paginaAtual >= totalPaginas - 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 shadow-sm"
                }`}
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}