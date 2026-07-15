import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Table from "../../Components/Table";
import api from "../../Api/api";
import { toast } from "react-toastify"; // Importação do Toast

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para controlar a paginação
  const [paginaAtual, setPaginaAtual] = useState(0); // O Spring Boot começa a contar do 0
  const [totalPaginas, setTotalPaginas] = useState(0);

  // Agora a função recebe a página que queremos buscar
  async function carregarAlunos(page = 0) {
    try {
      setLoading(true);
      // Pede ao backend a fatia exata de dados (ex: 10 alunos por página)
      const response = await api.get(`/alunos?page=${page}&size=10`);
      
      // O Spring Boot paginado não devolve a lista direto. Ele devolve um objeto onde a lista fica dentro de "content"
      setAlunos(response.data.content || []);
      setTotalPaginas(response.data.totalPages || 0);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      toast.error("Não foi possível carregar a lista de alunos.");
    } finally {
      setLoading(false);
    }
  }

  // O useEffect "ouve" o estado paginaAtual. Se ele mudar ao clicarmos nos botões, busca os dados daquela página!
  useEffect(() => {
    carregarAlunos(paginaAtual);
  }, [paginaAtual]);

  // Funções para os botões de controle
  function irParaPaginaAnterior() {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  function irParaProximaPagina() {
    if (paginaAtual < totalPaginas - 1) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestão de Alunos</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-medium">
            Carregando alunos...
          </div>
        ) : (
          <>
            <Table columns={["Nome", "Matrícula", "CPF", "Plano", "Turma", "Status"]}>
              {alunos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Nenhum aluno cadastrado.
                  </td>
                </tr>
              ) : (
                alunos.map((aluno) => (
                  <tr key={aluno.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900">{aluno.nome}</td>
                    <td className="p-4 text-gray-600">{aluno.matricula}</td>
                    <td className="p-4 text-gray-600">{aluno.cpf}</td>
                    <td className="p-4 text-gray-600">{aluno.plano}</td>
                    <td className="p-4 text-gray-600">{aluno.turma}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        aluno.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {aluno.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </Table>

            {/* Controles de Paginação no rodapé da tabela */}
            {totalPaginas > 1 && (
              <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
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
          </>
        )}
      </div>
    </MainLayout>
  );
}