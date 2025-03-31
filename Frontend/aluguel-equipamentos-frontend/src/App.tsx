import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Carregando...</div>}>
        <AppRoutes />
      </Suspense>
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
}

export default App;