import React, { useContext } from 'react';
import Header from "../components/header";
import TypesReceipes from '../components/typesRecipes';
import pastaSoTastyContext from '../context/context';

const MeatRecipes: React.FC = () => {
  const { fullName, logged } = useContext(pastaSoTastyContext);

  return (
    <>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <TypesReceipes type={'Carne'} />
    </>
  );
};

export default MeatRecipes;