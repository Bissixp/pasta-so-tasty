import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BtnLogoff from './btnLogoff';
import Menu from './menu';
import logo from '../images/PST-logo.png';
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
        <div className="logo-container">
          <Link to="/home"><img src={logo} alt="Logo" className="logo" /></Link>
        </div>
        <Menu>
          {isUserLoggedIn ? (
            <div>
              <div className="button-container">
                <span>Olá {upperCaseName}</span>
                <Link to="/perfil" className="header-button">Perfil</Link>
                <BtnLogoff />
              </div>
            </div>
          ) : (
            <div>
              <div className="button-container">
                <Link to="/login" className="header-link">Login</Link>
                <Link to="/registro" className="header-link">Cadastro</Link>
              </div>
            </div>
          )}
        </Menu>
      </header>
    </>
  );
};

export default Header;