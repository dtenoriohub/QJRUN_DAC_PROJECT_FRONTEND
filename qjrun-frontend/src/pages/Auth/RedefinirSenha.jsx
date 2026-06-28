import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Futuramente chamar:
    // await solicitarRecuperacao(email);

    setMensagem(
      "Se existir uma conta vinculada a este e-mail, enviaremos as instruções para redefinição da senha."
    );
  }

  return (

    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-extrabold text-black">
            <span className="text-lime-500">QJ</span>Run
          </h1>
        </div>

        <h1 className="text-3xl font-bold text-center text-green-700">
          Recuperar Senha
        </h1>

        <p className="text-center text-black-500 mt-3 mb-6">
          Informe seu e-mail cadastrado.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              E-mail
            </label>

            <input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                border
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-green-600
              hover:bg-green-600
              text-white
              font-semibold
              py-2
              rounded-lg
              transition
              "

              
          >
            Enviar instruções
          </button>

        </form>

        {mensagem && (
          <div
            className="
              mt-6
              rounded-lg
              bg-green-100
              text-green-700
              p-3
              text-sm
            "
          >
            {mensagem}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-green-800 hover:underline"
          >
            Voltar para o login
          </Link>
        </div>

      </div>
    </div>
  );
}