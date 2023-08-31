import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/menu.css';

type HeaderProps = {
  children: ReactNode;
};

const Menu = ({ children }: HeaderProps) => {
  const [searchRecipe, setSearchRecipe] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchRecipe !== '') {
      navigate(`/search?query=${searchRecipe}`);
      setSearchRecipe('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="menu-container">
      <div className='menu-items'>
        <Link to="/carnes" className="header-link">Carnes</Link>
        <Link to="/massas" className="header-link">Massas</Link>
        <Link to="/aves" className="header-link">Aves</Link>
        <Link to="/pães" className="header-link">Pães</Link>
        <Link to="/sopas" className="header-link">Sopas</Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Procure por uma Receita"
            value={searchRecipe}
            onChange={(e) => setSearchRecipe(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Procurar</button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Menu;
