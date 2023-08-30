import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BtnLogoff from './btnLogoff';
import Menu from './menu';
import logo from '../images/PST-logo.png';
import '../styles/components/header.css';

type HeaderProps = {
  children: ReactNode;
  isUserLoggedIn: boolean;
  fullName: string;
};

const Header = ({ isUserLoggedIn, fullName }: HeaderProps) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(isUserLoggedIn);
  }, [isUserLoggedIn])

  return (
    <>
      <header className="common-header">
        <div className="logo-container">
          <Link to="/home"><img src={logo} alt="Logo" className="logo" /></Link>
        </div>
        <Menu>
          {logged ? (
            <div>
              <div className="button-container">
                <span>Olá {fullName}</span>
                <Link to="/criar-receita" className="header-button">Criar Receita</Link>
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