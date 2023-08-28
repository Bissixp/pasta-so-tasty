import React, { useEffect, useContext } from 'react';
import Header from "../components/header";
import pastaSoTastyContext from '../context/context';

const PendingApprov: React.FC = () => {
  const { fullName, logged, setLogged } = useContext(pastaSoTastyContext);

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