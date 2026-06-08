import {
  Home,
  Users,
  GraduationCap,
  BookOpen
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      path: "/home"
    },
    {
      name: "Alunos",
      icon: <Users size={20} />,
      path: "/alunos"
    },
    {
      name: "Professores",
      icon: <GraduationCap size={20} />,
      path: "/professores"
    },
    {
      name: "Turmas",
      icon: <BookOpen size={20} />,
      path: "/turmas"
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen">

      <div className="p-6">

        <h1 className="text-2xl font-bold">
          QJRun
        </h1>

      </div>

      <nav className="px-4">

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
              hover:bg-slate-800
              transition
              mb-2
            "
          >
            {item.icon}
            {item.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}