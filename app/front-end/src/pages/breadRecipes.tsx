import React, { useContext } from 'react';
import Header from "../components/header";
import TypesReceipes from '../components/typesReceipes';
import pastaSoTastyContext from '../context/context';

const BreadRecipes: React.FC = () => {
  const { fullName, logged } = useContext(pastaSoTastyContext);

  return (
    <>
      <Header isUserLoggedIn={logged} fullName={fullName}>
      </Header >
      <TypesReceipes type={'Pão'} />
    </>
  );
};


export default BreadRecipes;