import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Cadastro() {

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
          bg-white
          w-full
          max-w-lg
          p-10
          rounded-3xl
          shadow-xl
        "
      >
        <div className="text-center mb-8">

          <h1
            className="
              text-4xl
              font-extrabold
              text-black
            "
          >
            <span className="text-lime-500">QJ</span>Run
          </h1>

          <p className="text-gray-500 mt-2">
            Criar nova conta
          </p>

        </div>

        <div className="space-y-4">

          <Input
            placeholder="Nome completo"
          />

          <Input
            type="email"
            placeholder="Email"
          />

          <Input
            type="password"
            placeholder="Senha"
          />

          <Input
            type="password"
            placeholder="Confirmar senha"
          />

          <Button>
            Cadastrar
          </Button>

          <button
            className="
              w-full
              text-green-800
              hover:text-green-600
              font-medium
            "
            onClick={() => navigate("/")}
          >
            Voltar ao Login
          </button>

        </div>
      </div>
    </div>
  );
}