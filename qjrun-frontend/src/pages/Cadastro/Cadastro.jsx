import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-gray-100
    ">
      <div className="
        bg-white
        p-8
        rounded-2xl
        shadow-lg
        w-full
        max-w-md
      ">
        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          Cadastro
        </h1>

        <div className="space-y-4">

          <Input placeholder="Nome" />

          <Input
            type="email"
            placeholder="Email"
          />

          <Input
            type="password"
            placeholder="Senha"
          />

          <Button>
            Cadastrar
          </Button>

          <Button
            onClick={() => navigate("/")}
          >
            Voltar
          </Button>

        </div>
      </div>
    </div>
  );
}