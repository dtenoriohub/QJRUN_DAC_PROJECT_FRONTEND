import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  Calendar,
  ClipboardList
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function Sidebar() {

  const { user } = useAuth();

  let menuItems = [];

  // ADMINISTRADOR
  if (user.perfil === "ROLE_ADMIN") {

    menuItems = [
      {
        name: "Dashboard",
        icon: <Home size={20} />,
        path: "/admin/dashboard"
      },
      {
        name: "Alunos",
        icon: <Users size={20} />,
        path: "/admin/alunos"
      },
      {
        name: "Professores",
        icon: <GraduationCap size={20} />,
        path: "/admin/professores"
      },
      {
        name: "Turmas",
        icon: <BookOpen size={20} />,
        path: "/admin/turmas"
      },
      {
        name: "Planos",
        icon: <ClipboardList size={20} />,
        path: "/admin/planos"
      },
      {
        name: "Pagamentos",
        icon: <CreditCard size={20} />,
        path: "/admin/pagamentos"
      },
      {
        name: "Eventos",
        icon: <Calendar size={20} />,
        path: "/admin/eventos"
      },
      {
        name: "Inscrições",
        icon: <ClipboardList size={20} />,
        path: "/admin/inscricoes"
      }
    ];

  }

  // PROFESSOR
  if (user.perfil === "ROLE_PROFESSOR") {

    menuItems = [
      {
        name: "Dashboard",
        icon: <Home size={20} />,
        path: "/professor/dashboard"
      },
      {
        name: "Minhas Turmas",
        icon: <BookOpen size={20} />,
        path: "/professor/turmas"
      },
      {
        name: "Meus Alunos",
        icon: <Users size={20} />,
        path: "/professor/alunos"
      },
      {
        name: "Eventos",
        icon: <Calendar size={20} />,
        path: "/professor/eventos"
      }
    ];

  }

  // ALUNO
  if (user.perfil === "ROLE_ALUNO") {

    menuItems = [
      {
        name: "Dashboard",
        icon: <Home size={20} />,
        path: "/aluno/dashboard"
      },
      {
        name: "Meu Plano",
        icon: <ClipboardList size={20} />,
        path: "/aluno/plano"
      },
      {
        name: "Minha Turma",
        icon: <BookOpen size={20} />,
        path: "/aluno/turma"
      },
      {
        name: "Pagamentos",
        icon: <CreditCard size={20} />,
        path: "/aluno/pagamentos"
      },
      {
        name: "Eventos",
        icon: <Calendar size={20} />,
        path: "/aluno/eventos"
      }
    ];

  }

  return (
    <aside
      className="
        w-64
        h-screen
        text-white
        bg-gradient-to-b
        from-green-950
        to-green-700
        flex
        flex-col
      "
    >

      {/* Logo */}
      <div className="p-6 border-b border-green-800">

        <h1 className="text-3xl font-extrabold">
          <span className="text-lime-400">QJ</span>Run
        </h1>

        {/* Usuário logado */}
        <div className="mt-4">

          <p className="text-sm text-green-200">
            Usuário
          </p>

          <p className="font-semibold">
            {user.nome}
          </p>

          <p className="text-xs text-green-300">
            {user.perfil}
          </p>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 mt-4">

        {menuItems.map(item => (

          <Link
            key={item.name}
            to={item.path}
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-lg
              hover:bg-green-800
              transition
              mb-2
            "
          >
            {item.icon}
            {item.name}
          </Link>

        ))}

      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-green-800">

        <p className="text-xs text-green-300 text-center">
          QJRun © 2026
        </p>

      </div>

    </aside>
  );
}