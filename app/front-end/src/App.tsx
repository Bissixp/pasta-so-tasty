import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;