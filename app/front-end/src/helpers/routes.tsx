import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Admin from '../pages/admin';
import Home from '../pages/home';
import Registration from '../pages/registration';
import Perfil from '../pages/perfil';
import Recipe from '../pages/recipe';


function RoutesPastaSoTasty() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registro" element={<Registration />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/criar-receita" element={<Recipe />} />
    </Routes>

  );
}
export default RoutesPastaSoTasty;