import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { requestData } from '../services/requests';
import Header from "../components/header";
import pastaSoTastyContext from "../context/context";
import IContext from '../interface/IContext';
import '../styles/pages/perfil.css';

const Perfil = () => {
  const { username, setUsername }: IContext = useContext(pastaSoTastyContext);
  const [emailUser, setEmailUser] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('LoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
    const getUserProfile = async (): Promise<void> => {
      try {
        const loggedUsername = localStorage.getItem('username');
        const { data } = await requestData(`/login/username/${loggedUsername}`);

        const { username, email, role } = data;
        localStorage.setItem('role', role);
        setUsername(username);
        setEmailUser(email);
      } catch (error) {
        console.error('Erro na requisição:', error);
      };
    };
    getUserProfile();
  }, [navigate, setUsername]);

  return (
    <>
      <Header isUserLoggedIn={true} username={username}>
      </Header>
      <div className="user-perfil">
        <div className="user-perfil-content">
          <Link to="/criar-receita">Criar Receita</Link>
          <h3>Nome: {username}</h3>
          <h3>Email: {emailUser}</h3>
        </div>
      </div>
    </>
  );
};

export default Perfil;
