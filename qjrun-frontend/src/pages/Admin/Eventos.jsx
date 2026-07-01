import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import PageHeader from "../../Components/PageHeader";
import Table from "../../Components/Table";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import api from "../../Api/api";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // 📝 Estados para o Modal (Cadastro e Edição)
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoIdEdicao, setEventoIdEdicao] = useState(null); // 🔑 Guarda o ID se for edição

  // Campos da Entidade Evento
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [vagas, setVagas] = useState("");
  const [valor, setValor] = useState("");

  const [salvando, setSalvando] = useState(false);

  // 🔄 Função para buscar os eventos do backend
  async function carregarEventos() {
    try {
      setLoading(true);
      const response = await api.get("/eventos");
      setEventos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      setErro("Não foi possível carregar a lista de eventos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  // 🟢 Abre o modal para um NOVO evento
  const abrirModalNovo = () => {
    setEventoIdEdicao(null);
    setNome("");
    setDescricao("");
    setLocal("");
    setData("");
    setHorario("");
    setVagas("");
    setValor("");
    setModalAberto(true);
  };

  // ✍️ Prepara o Modal com os dados do evento para Edição
  const iniciarEdicao = (evento) => {
    setEventoIdEdicao(evento.id);
    setNome(evento.nome || "");
    setDescricao(evento.descricao || "");
    setLocal(evento.local || "");
    setData(evento.data || "");

    const horarioFormatado = evento.horario ? evento.horario.substring(0, 5) : "";
    setHorario(horarioFormatado);

    setVagas(evento.vagas || "");
    setValor(evento.valor || "");
    setErro("");
    setModalAberto(true);
  };

  // 🧹 Reseta o formulário e fecha o modal
  const fecharModal = () => {
    setModalAberto(false);
  };

  // 💾 Envia o evento para o Backend (Suporta POST e PUT)
  const salvarEvento = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");

    try {
      const dadosEvento = {
        nome,
        descricao,
        local,
        data,
        horario: horario.length === 5 ? `${horario}:00` : horario, 
        vagas: parseInt(vagas, 10),
        valor: parseFloat(valor),
      };

      if (eventoIdEdicao) {
        // 🔄 Se tem ID de edição, atualiza com PUT
        await api.put(`/eventos/${eventoIdEdicao}`, dadosEvento);
      } else {
        // 📥 Se não tem, cria um novo com POST
        await api.post("/eventos", dadosEvento);
      }

      fecharModal();
      carregarEventos(); // Recarrega a tabela instantaneamente
    } catch (err) {
      console.error("Erro ao salvar evento:", err);
      setErro(err.response?.data?.message || "Erro ao salvar o evento. Verifique os dados.");
    } finally {
      setSalvando(false);
    }
  };

  // ❌ Deleta/Desativa o evento do banco
  const excluirEvento = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir / cancelar este evento?")) {
      try {
        setErro("");
        await api.delete(`/eventos/${id}`);
        carregarEventos(); // Atualiza a lista após exclusão
      } catch (err) {
        console.error("Erro ao excluir evento:", err);
        setErro(err.response?.data?.message || "Não foi possível excluir o evento.");
      }
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Eventos"
        buttonText="Novo Evento"
        onButtonClick={abrirModalNovo}
        />

        {erro && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {erro}
          </div>
        )}

      {loading ? (
        <div className="p-6 text-gray-500 font-medium text-center">Carregando eventos...</div>
      ) : (
        <Table columns={["Nome", "Data e Hora", "Local", "Vagas", "Valor (R$)", "Ações"]}>
          {eventos.map((evento) => (
            <tr key={evento.id} className="border-t hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">{evento.nome}</td>
              <td className="p-4 text-gray-600">
                {/* Formatação elegante de Data e Hora */}
                {new Date(evento.data).toLocaleDateString('pt-BR')} às {evento.horario?.substring(0, 5)}
              </td>
              <td className="p-4 text-gray-500">{evento.local}</td>
              <td className="p-4 text-gray-500">{evento.vagas} vagas</td>
              <td className="p-4 text-gray-600 font-medium">
                {evento.valor === 0 
                  ? "Gratuito" 
                  : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(evento.valor)}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {/* 🔑 Botão Editar - Passa o objeto do evento atual */}
                  <button
                    onClick={() => iniciarEdicao(evento)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Editar
                  </button>
                  {/* 🔑 Botão Remover - Passa o ID do evento atual */}
                  <button
                    onClick={() => excluirEvento(evento.id)}
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
          <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {eventoIdEdicao ? "Editar Evento" : "Cadastrar Novo Evento"}
            </h2>

            <form onSubmit={salvarEvento} className="space-y-4">
              {/* Linha 1: Nome e Local */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
                  <Input
                    type="text"
                    placeholder="Ex: Meia Maratona QJRun"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                  <Input
                    type="text"
                    placeholder="Ex: Parque da Cidade"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Linha 2: Data e Horário */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <Input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Largada</label>
                  <Input
                    type="time"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Linha 3: Vagas e Valor */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Vagas</label>
                  <Input
                    type="number"
                    placeholder="Ex: 500"
                    value={vagas}
                    onChange={(e) => setVagas(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor da Inscrição (R$)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00 (Deixe 0 para Gratuito)"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Linha 4: Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição e Instruções</label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[80px]"
                  placeholder="Informações sobre o percurso, retirada de kits..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  onClick={fecharModal}
                  disabled={salvando}
                >
                  Cancelar
                </button>
                <div className="w-40">
                  <Button type="submit" disabled={salvando}>
                    {salvando ? "Salvando..." : eventoIdEdicao ? "Salvar Alterações" : "Criar Evento"}
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