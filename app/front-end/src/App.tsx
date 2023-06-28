import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';
import Home from './pages/home';
import Registration from './pages/registration';
import './styles/app.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;