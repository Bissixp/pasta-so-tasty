import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import arrowImage from '../images/arrow_drop_down.svg';
import '../styles/pages/menu.css';

type HeaderProps = {
  children: ReactNode;
};

const Menu = ({ children }: HeaderProps) => {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
      <div className='category_container' onClick={() => {
        setIsOpen(prev => prev = !prev)
      }}>
        <div className='category_content'>
          <p>Categorias</p>
          <img src={arrowImage} alt='arrow_img' width={30} className={`${isOpen ? 'rotate_down' : 'rotate_up'}`} />
          <p>|</p>
        </div>
        <div className={`menu_items ${isOpen ? 'user_open' : 'user_close'}`}>
          <Link to="/carnes" className="2">Carnes</Link>
          <Link to="/massas" className="2">Massas</Link>
          <Link to="/aves" className="2">Aves</Link>
          <Link to="/pães" className="2">Pães</Link>
          <Link to="/sopas" className="2">Sopas</Link>
        </div>
      </div>
      <div className='search_content'>
        <div className="search_container">
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
