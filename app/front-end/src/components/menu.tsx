import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  children: ReactNode;
};

const Menu = ({ children }: HeaderProps) => {
  return (
    <>
      <Link to="/carnes" className="header-link">Carnes</Link>
      <Link to="/massas" className="header-link">Massas</Link>
      <Link to="/aves" className="header-link">Aves</Link>
      <Link to="/pães" className="header-link">Pães</Link>
      <Link to="/sopas" className="header-link">Sopas</Link>
      {children}
    </>
  );
};

export default Menu;
