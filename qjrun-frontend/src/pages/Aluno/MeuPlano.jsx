import MainLayout from "../../Layouts/MainLayout";

export default function MeuPlano() {

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Meu Plano
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <p><strong>Plano:</strong> Mensal</p>

        <p><strong>Valor:</strong> R$ 80,00</p>

        <p><strong>Duração:</strong> 1 mês</p>

        <p><strong>Status:</strong> Ativo</p>

      </div>

    </MainLayout>
  );
}