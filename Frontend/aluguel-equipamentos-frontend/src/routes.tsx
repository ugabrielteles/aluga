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
      
      <Route path="/" element={<Layout />}>
        <Route index element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        
        <Route path="equipamentos">
          <Route index element={
            <RequireAuth>
              <EquipamentosList />
            </RequireAuth>
          } />
          <Route path="novo" element={
            <RequireAuth>
              <EquipamentoForm />
            </RequireAuth>
          } />
          <Route path=":id" element={
            <RequireAuth>
              <EquipamentoForm />
            </RequireAuth>
          } />
        </Route>
        
        <Route path="clientes">
          <Route index element={
            <RequireAuth>
              <div />
            </RequireAuth>
          } />
          <Route path="novo" element={
            <RequireAuth>
              <div />
            </RequireAuth>
          } />
          <Route path=":id" element={
            <RequireAuth>
               <div />
            </RequireAuth>
          } />
        </Route>
        
        <Route path="contratos">
          <Route index element={
            <RequireAuth>
              <div />
            </RequireAuth>
          } />
          <Route path="novo" element={
            <RequireAuth>
              <div />
            </RequireAuth>
          } />
          <Route path=":id" element={
            <RequireAuth>
              <div />
            </RequireAuth>
          } />
        </Route>
      </Route>
    </Routes>
  );
}