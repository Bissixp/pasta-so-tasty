import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/components/header.css';

type HeaderProps = {
  children: ReactNode;
  isUserLoggedIn: boolean;
  username: string;
};

const upperCaseFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Header = ({ isUserLoggedIn, username }: HeaderProps) => {
  const upperCaseName = upperCaseFirstLetter(username);
  const navigate = useNavigate();

  const logoff = () => {
    localStorage.removeItem('LoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    isUserLoggedIn = false;
    navigate('/home');
    window.location.reload();
  };

  return (
    <>
      <header className="common-header">
        {isUserLoggedIn ? (
          <>
            <span>{upperCaseName}</span>
            <Link to="/perfil" className="header-button">Perfil</Link>
            <button type="button" onClick={() => logoff()}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/registration" className="header-link">Cadastro</Link>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
