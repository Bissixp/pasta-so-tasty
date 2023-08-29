import React, { useEffect, useContext } from 'react';
import Header from "../components/header";
import { Link, useNavigate } from 'react-router-dom';
import pastaSoTastyContext from '../context/context';

const PendingApprov: React.FC = () => {
  const { fullName, logged, setLogged } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate('/registro');
    }
  }, [navigate, logged]);

  useEffect(() => {
    if (fullName.length >= 1) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [fullName, logged, setLogged]);

  return (
    <>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <h1>Pão</h1>
    </>
  );
};

export default PendingApprov;