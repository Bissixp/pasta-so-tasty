import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BtnLogoff from './btnLogoff';
import Menu from './menu';
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
  return (
    <>
      <header className="common-header">
        <Menu>
          {isUserLoggedIn ? (
            <>
              <span>Olá {upperCaseName}</span>
              <Link to="/perfil" className="header-button">Perfil</Link>
              <BtnLogoff />
            </>
          ) : (
            <>
              <Link to="/login" className="header-link">Login</Link>
              <Link to="/registration" className="header-link">Cadastro</Link>
            </>
          )}
        </Menu>
      </header>
    </>
  );
};

export default Header;
