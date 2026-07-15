import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { useAuth } from "../../Contexts/AuthContext";
import { toast } from "react-toastify"; // Importação do Toast

export default function Inscricoes() {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      carregarInscricoes();
    }
  }, [user]);

  async function carregarInscricoes() {
    setLoading(true);
    try {
      // 🧹 Requisição limpa
      const response = await api.get("/inscricoes/pendentes");
      setInscricoes(response.data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
      toast.error("Erro ao carregar inscrições."); // Substituído por toast.error
    } finally {
      setLoading(false);
    }
  }

  async function handleAprovar(id) {
    // Pede confirmação antes de aprovar (boa prática de UX)
    const confirmar = window.confirm("Deseja realmente aprovar e consumir uma vaga deste evento?");
    if (!confirmar) return;

    try {
      // 🧹 Requisição limpa
      await api.patch(`/inscricoes/${id}/aprovar`);
      toast.success("Inscrição aprovada com sucesso!"); // Substituído por toast.success
      carregarInscricoes(); // Atualiza a lista automaticamente
    } catch (error) {
      toast.error("Erro ao aprovar: " + (error.response?.data?.message || "Tente novamente")); // Substituído por toast.error
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inscrições Pendentes</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">Aluno</th>
              <th className="p-4 text-left">Evento</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">Buscando solicitações...</td>
              </tr>
            ) : inscricoes.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">Nenhuma inscrição pendente encontrada.</td>
              </tr>
            ) : (
              inscricoes.map((inscricao) => (
                <tr key={inscricao.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{inscricao.aluno?.nome || "N/A"}</td>
                  <td className="p-4 text-gray-600">{inscricao.evento?.nome || "N/A"}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-yellow-100 text-yellow-800">
                      {inscricao.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleAprovar(inscricao.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-sm"
                    >
                      Aprovar Vaga
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}