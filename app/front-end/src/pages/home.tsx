import React, { useEffect, useState } from 'react';
import Header from "../components/header";

const Home = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
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
        <h1>Bem vindo ao Pasta do Tasty!</h1>
      </Header >
    </>
  );
};

export default Home;