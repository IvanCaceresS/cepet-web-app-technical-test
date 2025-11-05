import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import ConsultaPage from './pages/ConsultaPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

export default function App() {
  return (
    <Routes>

      {/* --- Rutas Públicas (Solo para no logueados) --- */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      
      {/* --- Rutas Privadas (Solo para logueados) --- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/consulta" element={<ConsultaPage />} />
      </Route>
      
    </Routes>
  )
}