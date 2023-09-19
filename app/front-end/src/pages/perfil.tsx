import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import { Link } from 'react-router-dom';
import pastaSoTastyContext from '../context/context';
import pastaSoTastyCard from '../images/pasta-so-tasty-card.png';
import approveCard from '../images/approve-recipe.png';
import pedingCard from '../images/peding-recipe.png';
import '../styles/pages/perfil.css';

const Perfil: React.FC = () => {
  const { fullName, logged, role } = useContext(pastaSoTastyContext);

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
      <div className="user-perfil">
        <div className="card-container">
          <img src={pastaSoTastyCard} alt="pasta-card" width="300" height="300" />
          <Link to="/minhas-receitas" className="link-name">
            Minhas Receitas
          </Link>
        </div>
        {role === 'admin' ? (
          <div className="card-container">
            <img src={approveCard} alt="pasta-card" width="300" height="300" />
            <Link to="/aprovar-receitas" className="link-name">
              Aprovar receitas
            </Link>
          </div>
        ) : (
          <div className="card-container">
            <img src={pedingCard} alt="pasta-card" width="100" height="100" />
            <Link to="/aguardando-aprovação" className="link-name">
              Aguardando Aprovação
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Perfil;
