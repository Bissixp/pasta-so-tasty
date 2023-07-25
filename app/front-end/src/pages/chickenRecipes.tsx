import { useEffect, useState } from 'react';
import Header from "../components/header";
import TypesReceipes from '../components/typesReceipes';

const ChickenRecipes = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('LoggedIn') === 'true';
    setIsUserLoggedIn(loggedIn);
    const userAlreadyLoggedIn = localStorage.getItem('username');
    if (userAlreadyLoggedIn !== null) {
      setUsername(userAlreadyLoggedIn);
    }
  }, []);

  return (
    <>
      <Header isUserLoggedIn={isUserLoggedIn} username={username}>
      </Header >
      <TypesReceipes type={'Ave'} />
    </>
  );
};

export default ChickenRecipes;