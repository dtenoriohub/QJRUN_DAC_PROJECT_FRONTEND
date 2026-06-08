import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-8">
          QJRun
        </h1>

        <div className="space-y-4">

          <Input
            type="email"
            placeholder="Email"
          />

          <Input
            type="password"
            placeholder="Senha"
          />

          <Button
            onClick={() => navigate("/home")}
          >
            Entrar
          </Button>

          <button
            className="w-full text-blue-600"
            onClick={() => navigate("/cadastro")}
          >
            Criar Conta
          </button>

        </div>

      </div>
    </div>
  );
}