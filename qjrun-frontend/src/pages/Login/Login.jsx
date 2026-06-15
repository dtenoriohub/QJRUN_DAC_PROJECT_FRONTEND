import { useNavigate } from "react-router-dom";
import mainLayout from "../../Layouts/MainLayout";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >
      <div
        className="
          bg-gray
          w-full
          max-w-md
          p-10
          rounded-3xl
          shadow-xl
        "
      >
        <div className="text-center mb-8">

          <h1
            className="
              text-5xl
              font-extrabold
              text-black
            "
          >
            <span className="text-lime-500">QJ</span>Run
          </h1>

          <p className="text-black-500 mt-2">
            Sistema para gerenciamento de corridas e eventos esportivos.
          </p>

        </div>

        <div className="space-y-4">

          <Input
            type="email"
            placeholder="Digite seu email"
          />

          <Input
            type="password"
            placeholder="Digite sua senha"
          />

          <Button
            onClick={() => navigate("/home")}
          >
            Entrar
          </Button>

          <button
            className="
              w-full
              text-green-800
              hover:text-green-600
              font-medium
            "
            onClick={() => navigate("/cadastro")}
          >
            Criar Conta
          </button>

        </div>
      </div>
    </div>
  );
}