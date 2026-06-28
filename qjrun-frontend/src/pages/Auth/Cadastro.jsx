import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Cadastro() {

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: ""
  });

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]: value
    }));

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {

      alert("As senhas não coincidem.");

      return;

    }

    console.log(form);

    /*
        Próximo passo:

        await cadastrarUsuario(form);
    */

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            <span className="text-lime-500">QJ</span>Run
          </h1>

          <p className="text-gray-500 mt-2">
            Crie sua conta
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
          />

          <Input
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <Input
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
          />

          <Input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
          />

          <Input
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
          />

          <Button>

            Criar Conta

          </Button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-lime-600 hover:underline"
          >
            Já possui conta? Faça login
          </Link>

        </div>

      </div>

    </div>

  );

}