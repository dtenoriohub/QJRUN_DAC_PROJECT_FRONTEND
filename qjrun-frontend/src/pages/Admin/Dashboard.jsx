import { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import api from "../../Api/api";

export default function Dashboard() {
  const [data, setData] = useState({
    totalAlunos: 0,
    totalPlanos: 0,
    totalTurmas: 0,
    ultimosCadastros: []
  });

  async function carregarDados() {
    try {
      const response = await api.get("/dashboard");
      setData(response.data);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const cards = [
    { titulo: "Alunos", valor: data.totalAlunos },
    { titulo: "Planos", valor: data.totalPlanos },
    { titulo: "Turmas", valor: data.totalTurmas },
  ];

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">Dashboard Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.titulo} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500 text-sm">{card.titulo}</h2>
            <p className="text-3xl font-bold mt-2">{card.valor}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Últimos Cadastros</h2>
        {data.ultimosCadastros.length > 0 ? (
          <ul className="space-y-2">
            {data.ultimosCadastros.map((nome, index) => (
              <li key={index} className="p-2 border-b last:border-0">{nome}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum cadastro recente.</p>
        )}
      </div>
    </MainLayout>
  );
}