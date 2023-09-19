import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/notFound.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Desculpe, a página solicitada não está disponível!</h1>
      <Link to={'/'}
      >
        <h3>Voltar Para página principal</h3>
      </Link>
    </div>
  );
};

export default NotFoundPage;
