import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Admin from '../pages/admin';
import Home from '../pages/home';
import Registration from '../pages/registration';


function RoutesPastaSoTasty() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>

  );
}
export default RoutesPastaSoTasty;