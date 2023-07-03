import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { requestData } from '../services/requests';

const Perfil = () => {
  const [user, setUser] = useState<string>('');
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

        const { username, email } = data;
        setUser(username);
        setEmailUser(email);
      } catch (error) {
        console.error('Erro na requisição:', error);
      };
    };
    getUserProfile();
  }, [navigate]);

  return (
    <>
      <h3>Nome: {user}</h3>
      <h3>Email: {emailUser}</h3>
    </>
  );
};

export default Perfil;
