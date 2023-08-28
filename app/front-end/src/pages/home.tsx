import React, { useEffect, useContext } from 'react';
import Header from "../components/header";
import AllRecipes from '../components/allRecipes';
import pastaSoTastyContext from '../context/context';

const Home: React.FC = () => {
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
        <h1>Bem vindo ao Pasta so Tasty!</h1>
      </Header >
      <AllRecipes />
    </>
  );
};

export default Home;