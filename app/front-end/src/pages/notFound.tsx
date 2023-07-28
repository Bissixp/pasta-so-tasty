import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>404 - Desculpe, a página solicitada não está disponível!</h1>
      <Link to={'/'}
      >
        <h3>Voltar Para página principal</h3>
      </Link>
    </div>
  );
};

export default NotFoundPage;
