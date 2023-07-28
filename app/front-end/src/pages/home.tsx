import { useEffect, useState } from 'react';
import Header from "../components/header";
import AllRecipes from '../components/allRecipes';

const Home = () => {
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
        <h1>Bem vindo ao Pasta so Tasty!</h1>
      </Header >
      <AllRecipes />
    </>
  );
};

export default Home;