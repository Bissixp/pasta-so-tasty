import React, { useEffect, useContext } from 'react';
import Header from "../components/header";
import TypesReceipes from '../components/typesReceipes';
import pastaSoTastyContext from '../context/context';

const PastaRecipes: React.FC = () => {
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
      <TypesReceipes type={'Massa'} />
    </>
  );
};


export default PastaRecipes;