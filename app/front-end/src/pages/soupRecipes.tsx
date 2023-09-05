import React, { useContext } from 'react';
import Header from "../components/header";
import TypesReceipes from '../components/typesRecipes';
import pastaSoTastyContext from '../context/context';

const SoupRecipes: React.FC = () => {
  const { fullName, logged } = useContext(pastaSoTastyContext);

  return (
    <>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <TypesReceipes type={'Sopa'} />
    </>
  );
};


export default SoupRecipes;