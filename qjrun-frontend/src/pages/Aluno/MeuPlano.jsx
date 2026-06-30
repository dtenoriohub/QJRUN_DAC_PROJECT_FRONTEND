import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";

export default function MeuPlano() {
  const [planos, setPlanos] = useState([]);
  const [alunoDados, setAlunoDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [processando, setProcessando] = useState(false);

  // 🔄 Carrega os planos disponíveis e os dados atuais do aluno logado
  async function carregarInformacoes() {
    try {
      setLoading(true);
      
      // 🔑 Recupera o ID do usuário logado do localStorage
      const userJson = localStorage.getItem("@qjrun:user");
      const user = userJson ? JSON.parse(userJson) : null;

      if (!user?.id) {
        setErro("Usuário não identificado. Faça login novamente.");
        return;
      }

      // Busca os planos e os dados específicos deste aluno em paralelo
      const [resPlanos, resAluno] = await Promise.all([
        api.get("/planos"),
        api.get(`/alunos/${user.id}`)
      ]);

      setPlanos(Array.isArray(resPlanos.data) ? resPlanos.data : []);
      setAlunoDados(resAluno.data);
    } catch (err) {
      console.error("Erro ao carregar dados do plano:", err);
      setErro("Não foi possível carregar os planos disponíveis.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarInformacoes();
  }, []);

  // 🎯 Função executada quando o aluno clica para escolher um plano
  const contratarPlano = async (planoId) => {
    if (!window.confirm("Deseja confirmar a assinatura deste plano?")) return;
    
    setProcessando(true);
    setErro("");
    setSucesso("");

    try {
      // Monta a estrutura que o JPA/Hibernate espera para atualizar o relacionamento
      const dadosAtualizados = {
        ...alunoDados,
        plano: { id: planoId }
      };

      // Envia a atualização para o endpoint do aluno
      await api.put(`/alunos/${alunoDados.id}`, dadosAtualizados);
      
      setSucesso("Plano alterado com sucesso!");
      carregarInformacoes(); // Recarrega a tela para atualizar o "Plano Atual"
    } catch (err) {
      console.error("Erro ao contratar plano:", err);
      setErro("Falha ao processar a troca de plano. Tente novamente.");
    } finally {
      setProcessando(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-6 text-gray-500 font-medium text-center">Carregando opções de planos...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meu Plano</h1>
        <p className="text-gray-600 mt-1">Escolha ou altere a sua assinatura do QJRun a qualquer momento.</p>
      </div>

      {/* 📢 Mensagens de Feedback */}
      {erro && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{erro}</div>}
      {sucesso && <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">{sucesso}</div>}

      {/* 💳 CARD DO PLANO ATUAL DO ALUNO */}
      <div className="mb-10 bg-gradient-to-r from-green-900 to-green-700 rounded-2xl p-6 text-white shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-green-300">Sua Assinatura Atual</span>
        <h2 className="text-3xl font-black mt-1">
          {alunoDados?.plano?.tipo || "Nenhum Plano Contratado"}
        </h2>
        {alunoDados?.plano && (
          <p className="text-sm text-green-100 mt-2 max-w-xl">
            {alunoDados.plano.descricao || "Você tem acesso total aos recursos vinculados a este plano."}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-green-600/50 flex gap-6 text-sm">
          <div>
            <span className="text-green-300 block text-xs">Valor</span>
            <span className="font-semibold text-base">
              {alunoDados?.plano ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alunoDados.plano.preco) : "---"}
            </span>
          </div>
          <div>
            <span className="text-green-300 block text-xs">Ciclo</span>
            <span className="font-semibold text-base">
              {alunoDados?.plano?.duracaoMeses ? `${alunoDados.plano.duracaoMeses} meses` : "---"}
            </span>
          </div>
        </div>
      </div>

      {/* 🚀 VITRINE DE PLANOS PARA ESCOLHA */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">Planos Disponíveis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planos.map((plano) => {
          const ehOPlanoAtual = alunoDados?.plano?.id === plano.id;

          return (
            <div 
              key={plano.id} 
              className={`bg-white border-2 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition ${
                ehOPlanoAtual ? "border-green-600 ring-2 ring-green-600/20" : "border-gray-200"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-gray-900">{plano.tipo}</h4>
                  {ehOPlanoAtual && (
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                      Ativo
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mb-6 min-h-[50px]">
                  {plano.descricao || "Sem descrição disponível para este plano."}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-black text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plano.preco || 0)}
                  </span>
                  <span className="text-gray-500 text-sm"> / {plano.duracaoMeses}m</span>
                </div>
              </div>

              <button
                onClick={() => contratarPlano(plano.id)}
                disabled={ehOPlanoAtual || processando}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                  ehOPlanoAtual
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800 text-white shadow-sm"
                }`}
              >
                {ehOPlanoAtual ? "Plano Atual" : "Escolher este Plano"}
              </button>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}