import Sidebar from "../Components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 bg-gray-300 p-8">
        {children}
      </main>

    </div>
  );
}