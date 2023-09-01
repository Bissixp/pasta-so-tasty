import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import { Link } from 'react-router-dom';
import '../styles/pages/perfil.css';
import pastaSoTastyContext from '../context/context';

const Perfil: React.FC = () => {
  const { fullName, logged, email, role } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate('/registro');
    }
  }, [navigate, logged]);

  return (
    <>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header>
      <Link to="/minhas-receitas" className="header-button">Minhas Receitas</Link>
      <Link to="/meus-favoritos" className="header-button">Meus Favoritos</Link>
      {role === 'admin' ? (
        <Link to="/admin" className="header-button">Aprovar receitas</Link>
      ) : (
        <Link to="/aguardando-aprovação" className="header-button">Aguardando Aprovação</Link>
      )}
      <div className="user-perfil">
        <div className="user-perfil-content">
          <h3>Nome: {fullName} </h3>
          <h3>Email: {email} </h3>
        </div>
      </div>
    </>
  );
};

export default Perfil;
