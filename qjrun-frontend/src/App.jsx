import AppRoutes from "./Routes/AppRoutes";

// Imports do Toastify e do CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* As rotas vão continuar funcionando normalmente */}
      <AppRoutes />
      
      {/* O Container renderizado globalmente na aplicação */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;