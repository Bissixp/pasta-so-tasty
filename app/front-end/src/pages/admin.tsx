import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <h1>Pudim</h1>
      <Link to="/criar-receita">Criar Receita</Link>
    </>
  );
};

export default Admin;