import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { toast } from "react-toastify"; // Importação do Toast

export default function MeusPagamentos() {
  // Estados para armazenar os dados do backend e controlar o "loading"
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os pagamentos na API
  async function carregarPagamentos() {
    try {
      setLoading(true);
      
      // Pega os dados do usuário logado no localStorage
      const userJson = localStorage.getItem("@qjrun:user");
      if (!userJson) {
        console.error("Usuário não encontrado no localStorage");
        return;
      }
      
      const user = JSON.parse(userJson);

      // Faz a requisição enviando o ID do aluno na URL
      const response = await api.get(`/pagamentos/aluno/${user.id}`);
      
      setPagamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
      toast.error("Não foi possível carregar os seus pagamentos."); // Substituído
    } finally {
      setLoading(false);
    }
  }

  // Executa a função automaticamente quando a tela abre
  useEffect(() => {
    carregarPagamentos();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Meus Pagamentos</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        
        {/* Renderização Condicional: Mostra mensagem enquanto carrega */}
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-medium">
            Carregando seus pagamentos...
          </div>
        ) : pagamentos.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium">
            Você não possui nenhum pagamento registrado.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Referência</th>
                <th className="p-4 text-left">Vencimento</th>
                <th className="p-4 text-left">Valor</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((pagamento) => (
                <tr key={pagamento.id} className="border-t hover:bg-gray-50 transition">
                  
                  {/* Descrição do que está sendo cobrado (Ex: "Inscrição: Evento de Corrida") */}
                  <td className="p-4 font-medium text-gray-700">
                    {pagamento.referencia || "Pagamento"}
                  </td>
                  
                  {/* Formatação da data de vencimento */}
                  <td className="p-4 text-gray-600">
                    {pagamento.vencimento 
                      ? new Date(pagamento.vencimento + "T00:00:00").toLocaleDateString('pt-BR') 
                      : "--"}
                  </td>

                  {/* Formatação do valor para Reais (R$) */}
                  <td className="p-4 text-gray-900 font-semibold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(pagamento.valor || 0)}
                  </td>

                  {/* Badges coloridas dependendo do status do pagamento */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        pagamento.status === "PAGO"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {pagamento.status}
                    </span>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
}