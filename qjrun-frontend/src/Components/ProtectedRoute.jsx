import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("@qjrun:token");
  const userJson = localStorage.getItem("@qjrun:user");

  // Se não estiver logado, manda pro Login
  if (!token || !userJson) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userJson);

  // Se o perfil do usuário não tiver permissão para esse bloco de rotas
  if (allowedRoles && !allowedRoles.includes(user.perfil)) {
    return <Navigate to="/" replace />; // Ou manda para uma tela de "Acesso Negado"
  }

  // Se passou em tudo, renderiza os filhos (as rotas internas)
  return <Outlet />;
}