import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BtnLogoff from './btnLogoff';
import Menu from './menu';
import logo from '../images/PST-logo.png';
import arrowImage from '../images/arrow_drop_down.svg';
import '../styles/components/header.css';

type HeaderProps = {
  children: ReactNode;
  isUserLoggedIn: boolean;
  fullName: string;
};

const Header = ({ isUserLoggedIn, fullName }: HeaderProps) => {
  const [logged, setLogged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            <div className='user_content'>
              <Link to="/criar-receita" className="user_link">Criar Receita</Link>
              <div className="user_container" onClick={() => {
                setIsOpen(prev => prev = !prev)
              }}>
                <span>{fullName}</span>
                <img src={arrowImage} alt='arrow_img' width={30} className={`${isOpen ? 'rotate_down' : 'rotate_up'}`} />
              </div>
              <div className={`user_dropdown ${isOpen ? 'user_open' : 'user_close'}`} >
                <Link to="/meus-favoritos" className="user_link">Meus Favoritos</Link>
                <Link to="/perfil" className="user_link">Perfil</Link>
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
      </header >
    </>
  );
};

export default Header;