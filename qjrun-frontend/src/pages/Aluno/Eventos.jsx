import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";
import { useAuth } from "../../Contexts/AuthContext";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const { user } = useAuth(); // Pegamos o ID do aluno logado

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      const response = await api.get("/eventos"); // Ajuste conforme seu endpoint
      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  }

  async function handleInscrever(eventoId) {
  try {
    // 1. Busque o ID do aluno no seu contexto (ajuste conforme seu AuthContext)
    const alunoId = user.id; 

    // 2. Chame a rota conforme definido no seu Controller: 
    // @PostMapping("/aluno/{alunoId}/evento/{eventoId}")
    await api.post(`/inscricoes/aluno/${alunoId}/evento/${eventoId}`, {}, {
      headers: {
        "Perfil-Usuario": user.perfil, // Ex: "ROLE_ALUNO"
        "Usuario-Id": user.id          // O ID do usuário logado
      }
    });

    alert("Inscrição realizada com sucesso!");
  } catch (error) {
    // Se der 403, o erro aparecerá aqui
    console.error("Erro completo:", error);
    alert(error.response?.data?.message || "Erro ao realizar inscrição. Verifique suas permissões.");
  }
}

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Eventos Disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <div key={evento.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col">
            <h2 className="text-xl font-bold text-green-900 mb-2">{evento.nome}</h2>
            <p className="text-gray-600 mb-4 flex-1">
              Data: {new Date(evento.data).toLocaleDateString()} <br/>
              Vagas disponíveis: {evento.vagas}
            </p>

            <button 
              onClick={() => handleInscrever(evento.id)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Inscrever-se
            </button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}