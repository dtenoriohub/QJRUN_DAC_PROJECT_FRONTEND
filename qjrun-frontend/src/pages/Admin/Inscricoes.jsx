import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { useAuth } from "../../Contexts/AuthContext";

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
      const response = await api.get("/inscricoes/pendentes", {
        headers: {
          "Perfil-Usuario": user.perfil,
        },
      });
      setInscricoes(response.data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
      alert("Erro ao carregar inscrições.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAprovar(id) {
    try {
      // Importante: Passar o header também na aprovação
      await api.patch(`/inscricoes/${id}/aprovar`, {}, {
        headers: {
          "Perfil-Usuario": user.perfil,
        },
      });
      alert("Inscrição aprovada com sucesso!");
      carregarInscricoes(); // Atualiza a lista
    } catch (error) {
      alert("Erro ao aprovar: " + (error.response?.data?.message || "Tente novamente"));
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inscrições Pendentes</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
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
                <td colSpan="4" className="p-4 text-center">Carregando...</td>
              </tr>
            ) : inscricoes.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">Nenhuma inscrição pendente encontrada.</td>
              </tr>
            ) : (
              inscricoes.map((inscricao) => (
                <tr key={inscricao.id} className="border-b hover:bg-gray-50">
                  {/* Verifique se o backend retorna exatamente 'alunoNome' e 'eventoNome' */}
                  <td className="p-4">{inscricao.aluno?.nome || "N/A"}</td>
                  <td className="p-4">{inscricao.evento?.nome || "N/A"}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        inscricao.status === "APROVADA"
                          ? "bg-green-100 text-green-800"
                          : inscricao.status === "PENDENTE"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inscricao.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {inscricao.status === "PENDENTE" && (
                      <button
                        onClick={() => handleAprovar(inscricao.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Aprovar
                      </button>
                    )}
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