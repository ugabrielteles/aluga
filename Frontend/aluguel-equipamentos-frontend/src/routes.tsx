import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/layout/Layout';

const Login = lazy(() => import('./pages/auth/Login'));
const Home = lazy(() => import('./pages/Home'));
const EquipamentosList = lazy(() => import('./pages/equipamentos/EquipamentosList'));
const EquipamentoForm = lazy(() => import('./pages/equipamentos/EquipamentoForm'));
// const ClientesList = lazy(() => import('./pages/clientes/ClientesList'));
// const ClienteForm = lazy(() => import('./pages/clientes/ClienteForm'));
// const ContratosList = lazy(() => import('./pages/contratos/ContratosList'));
// const ContratoForm = lazy(() => import('./pages/contratos/ContratoForm'));

export default function AppRoutes() {

  

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <RequireAuth>
          <Layout />
        </RequireAuth>
        }>
        <Route index element={
           <Home />
        } />

        <Route path="/home" element={<Home />}></Route>

        <Route path="/equipamentos">
          <Route index element={<EquipamentosList />} />
          <Route path="novo" element={<EquipamentoForm />} />
          <Route path=":id" element={<EquipamentoForm />} />
        </Route>

        <Route path="clientes">
          <Route index element={ <div />} />
          <Route path="novo" element={ <div />} />
          <Route path=":id" element={ <div />} />
        </Route>

        <Route path="contratos">
          <Route index element={ <div />} />
          <Route path="novo" element={ <div />} />
          <Route path=":id" element={ <div />} />
        </Route>
      </Route>
    </Routes>
  );
}