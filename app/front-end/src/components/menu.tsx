import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/menu.css';

type HeaderProps = {
  children: ReactNode;
};

const Menu = ({ children }: HeaderProps) => {
  return (
    <div className="menu-container">
      <div className='menu-items'>
        <Link to="/carnes" className="header-link">Carnes</Link>
        <Link to="/massas" className="header-link">Massas</Link>
        <Link to="/aves" className="header-link">Aves</Link>
        <Link to="/pães" className="header-link">Pães</Link>
        <Link to="/sopas" className="header-link">Sopas</Link>
      </div>
      {children}
    </div>
  );
};

export default Menu;
