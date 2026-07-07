import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { useAuth } from "../../Contexts/AuthContext";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Pegamos o ID do aluno logado

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // Busca os eventos e as inscrições do aluno AO MESMO TEMPO
      const [resEventos, resInscricoes] = await Promise.all([
        api.get("/eventos"), 
        api.get(`/inscricoes/aluno/${user.id}`)
      ]);

      const todosEventos = resEventos.data;
      const minhasInscricoes = resInscricoes.data;

      // Cruza os dados para saber o status do aluno em cada evento
      const eventosEnriquecidos = todosEventos.map((evento) => {
        // Tenta achar uma inscrição deste aluno para este evento
        // (Assumindo que sua API retorna a inscrição com o objeto evento aninhado: inscricao.evento.id)
        const inscricaoEncontrada = minhasInscricoes.find(
          (inscricao) => inscricao.evento?.id === evento.id
        );

        return {
          ...evento,
          // Se achou a inscrição, salva ela dentro do evento para usarmos na tela
          minhaInscricao: inscricaoEncontrada || null, 
        };
      });

      setEventos(eventosEnriquecidos);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Não foi possível carregar os eventos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleInscrever(eventoId) {
    try {
      // Como o api.js já manda os headers, a requisição fica super limpa!
      await api.post(`/inscricoes/aluno/${user.id}/evento/${eventoId}`);

      alert("Inscrição solicitada com sucesso! Verifique a aba de Pagamentos.");
      
      // Recarrega a tela para o botão mudar de "Inscrever-se" para "Pendente"
      carregarDados(); 
      
    } catch (error) {
      const mensagemErro = error.response?.data?.message || error.response?.data || "Erro ao realizar inscrição.";
      alert(`Ops: ${mensagemErro}`);
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Eventos</h1>

      {loading ? (
        <div className="text-center p-8 text-gray-500">Buscando eventos...</div>
      ) : eventos.length === 0 ? (
        <div className="text-center p-8 text-gray-500">Nenhum evento disponível no momento.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => {
            // Verifica a situação atual do card
            const estaInscrito = evento.minhaInscricao != null;
            const esgotado = !estaInscrito && evento.vagas <= 0;

            return (
              <div key={evento.id} className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col relative">
                
                {/* Badge de Status da Inscrição (Se ele estiver inscrito) */}
                {estaInscrito && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      evento.minhaInscricao.status === 'APROVADA' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {evento.minhaInscricao.status}
                    </span>
                  </div>
                )}

                <h2 className="text-xl font-bold text-gray-900 mb-2 pr-20">{evento.nome}</h2>
                
                <p className="text-sm text-gray-500 mb-4">{evento.descricao}</p>
                
                <div className="text-gray-600 mb-6 flex-1 space-y-1 text-sm">
                  <p><strong>Data:</strong> {new Date(evento.data).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Local:</strong> {evento.local}</p>
                  <p><strong>Valor:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(evento.valor || 0)}</p>
                  <p>
                    <strong>Vagas:</strong> {evento.vagas > 0 ? evento.vagas : <span className="text-red-500 font-bold">Esgotado</span>}
                  </p>
                </div>

                {/* Renderização Condicional do Botão */}
                {estaInscrito ? (
                  <button disabled className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg font-semibold cursor-not-allowed">
                    Inscrição Solicitada
                  </button>
                ) : esgotado ? (
                  <button disabled className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold cursor-not-allowed">
                    Sem Vagas
                  </button>
                ) : (
                  <button 
                    onClick={() => handleInscrever(evento.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm"
                  >
                    Inscrever-se
                  </button>
                )}
                
              </div>
            );
          })}
        </div>
      )}
    </MainLayout>
  );
}