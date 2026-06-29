import { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/api"; // 👈 Garanta que tem apenas dois pontos (..)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 💾 Inicializa o estado tentando buscar o usuário já salvo no navegador
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("@qjrun:user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Valida se há um token salvo ao carregar a aplicação
    const token = localStorage.getItem("@qjrun:token");
    if (token) {
      // Aqui você poderia fazer uma chamada opcional para /auth/me se quiser validar o token no backend
    }
    setCarregando(false);
  }, []);

  /**
   * 🔐 FUNÇÃO DE LOGIN CONECTADA AO BACKEND
   */
  const login = async (email, senha) => {
    // 1. Dispara a requisição para o seu AuthController do Spring Boot
    const response = await api.post("/auth/login", { email, senha });
    
    // O seu AuthMapper retorna as propriedades: token, email, perfilAcesso (ou similar)
    const { token, perfilAcesso } = response.data;

    if (token) {
      // 2. Salva o Token e os dados básicos no LocalStorage do navegador
      localStorage.setItem("@qjrun:token", token);
      
      const usuarioDados = {
        email: response.data.email,
        perfil: perfilAcesso // 🔑 Mapeia para a string "ROLE_ADMIN", "ROLE_ALUNO", etc.
      };
      
      localStorage.setItem("@qjrun:user", JSON.stringify(usuarioDados));
      
      // 3. Atualiza o estado global do contexto com o usuário logado
      setUser(usuarioDados);
      
      return response.data;
    }
    
    throw new Error("Falha na autenticação");
  };

  /**
   * 🚪 FUNÇÃO DE LOGOUT
   */
  const logout = () => {
    localStorage.removeItem("@qjrun:token");
    localStorage.removeItem("@qjrun:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,  // 🔑 Disponibiliza a função de login para a tela de Login.jsx
        logout, // 🔑 Disponibiliza o logout para as barras de navegação/dashboards
        carregando
      }}
    >
      {!carregando && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}