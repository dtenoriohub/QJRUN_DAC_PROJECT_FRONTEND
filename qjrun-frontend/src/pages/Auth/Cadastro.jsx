import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import api from "../../Api/api"; // 🔑 Importa diretamente a API para usar a rota de cadastro geral

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Cadastro() {
  const navigate = useNavigate(); 
  
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: ""
  });

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((old) => ({
      ...old,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(""); 

    // 1. Validação local de senha
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // 2. Destruímos o 'confirmarSenha' para montar o DTO idêntico ao CadastroRequestDTO do Java
      const { confirmarSenha, ...dadosParaEnvio } = form;

      // 3. Chamada direta para o endpoint do AuthController público
      const response = await api.post("/auth/register", dadosParaEnvio);

      // Exibe a mensagem dinâmica retornada pelo Spring Boot ("Primeiro usuário..." ou "Cadastrado como Aluno")
      alert(response.data.message || "Conta criada com sucesso!");
      
      // 4. Redireciona para a tela de login
      navigate("/");
    } catch (err) {
      // 5. Trata o erro capturando a resposta real da exceção do Spring Boot
      const mensagemDoBackend = err.response?.data?.message || "Erro ao realizar cadastro. Tente novamente.";
      setErro(mensagemDoBackend);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-lime-500">QJ</span>Run
          </h1>
          <p className="text-gray-500 mt-2">
            Crie sua conta no sistema
          </p>
        </div>

        {/* 🚨 Mensagem de Erro Dinâmica */}
        {erro && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <Input
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
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
            required
          />

          <Input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <Input
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Criar Conta"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-lime-600 hover:underline">
            Já possui conta? Faça login
          </Link>
        </div>

      </div>
    </div>
  );
}