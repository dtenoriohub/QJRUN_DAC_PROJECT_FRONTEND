import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { useAuth } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

export default function Inscricoes() {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Estados da Paginação
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    if (user) {
      carregarInscricoes(paginaAtual);
    }
  }, [user, paginaAtual]);

  async function carregarInscricoes(page = 0) {
    setLoading(true);
    try {
      // Busca paginada no novo endpoint geral
      const response = await api.get(`/inscricoes?page=${page}&size=7`);
      
      // O Spring Boot devolve os dados dentro de "content"
      setInscricoes(response.data.content || []);
      setTotalPaginas(response.data.totalPages || 0);
    } catch (error) {
      console.error("Erro ao carregar:", error);
      toast.error("Erro ao carregar inscrições.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAprovar(id) {
    const confirmar = window.confirm("Deseja realmente aprovar e consumir uma vaga deste evento?");
    if (!confirmar) return;

    try {
      await api.patch(`/inscricoes/${id}/aprovar`);
      toast.success("Inscrição aprovada com sucesso!");
      
      // Atualiza a página atual para refletir a mudança de status
      carregarInscricoes(paginaAtual); 
    } catch (error) {
      toast.error("Erro ao aprovar: " + (error.response?.data?.message || "Tente novamente"));
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Inscrições</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left font-semibold text-gray-700">Aluno</th>
              <th className="p-4 text-left font-semibold text-gray-700">Evento</th>
              <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              <th className="p-4 text-left font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">Buscando solicitações...</td>
              </tr>
            ) : inscricoes.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">Nenhuma inscrição encontrada.</td>
              </tr>
            ) : (
              inscricoes.map((inscricao) => (
                <tr key={inscricao.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{inscricao.aluno?.nome || "N/A"}</td>
                  <td className="p-4 text-gray-600">{inscricao.evento?.nome || "N/A"}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        inscricao.status === "PENDENTE"
                          ? "bg-yellow-100 text-yellow-800"
                          : inscricao.status === "APROVADA"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {inscricao.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {/* Botão de aprovar só aparece se a inscrição estiver pendente */}
                    {inscricao.status === "PENDENTE" && (
                      <button
                        onClick={() => handleAprovar(inscricao.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-sm text-sm"
                      >
                        Aprovar Vaga
                      </button>
                    )}
                  </td>
                </tr>
              ))
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