import React, { useContext } from 'react';
import Header from "../components/header";
import AllRecipes from '../components/allRecipes';
import pastaSoTastyContext from '../context/context';

const Home: React.FC = () => {
  const { fullName, logged } = useContext(pastaSoTastyContext);

  return (
    <>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <AllRecipes />
    </>
  );
};

export default Home;