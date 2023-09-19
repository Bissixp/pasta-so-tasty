import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { fetchLogin } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import pastaSoTastyContext from '../context/context';
import '../styles/pages/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [emptyInput, setEmptyInput] = useState<boolean>(false);

  const { fullName } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (fullName.length >= 1) {
      navigate('/');
    }
  }, [navigate, fullName]);

  const login = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      await fetchLogin({ email, password });
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401 && data.message === 'Incorrect email') {
          setErrorPassword(false);
          setEmptyInput(false);
          setErrorEmail(true);
        } else if (status === 401 && data.message === 'Incorrect password') {
          setErrorEmail(false);
          setEmptyInput(false);
          setErrorPassword(true);
        } else if (status === 400 && data.message === 'All fields must be filled') {
          setErrorEmail(false);
          setErrorPassword(false);
          setEmptyInput(true);
        }
      }
    }
  }

  return (
    <section className="user-login-area">
      <div className="login-card">
        <form onSubmit={(event) => login(event)}>
          <h1>Área do usuário</h1>
          <div className="input-container">
            <label htmlFor="email-input">
              Email:
              {' '}
              <input
                id="email-input"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="password-input">
              Senha:
              {' '}
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"
              />
            </label>
          </div>
          {errorEmail && (
            <p>
              Endereço de e-mail não localizado.
            </p>
          )}
          {errorPassword && (
            <p>
              A senha está incorreta, por favor, tente novamente.
            </p>
          )}
          {emptyInput && (
            <p>
              Informe o e-mail e a senha.
            </p>
          )}
          <button type="submit" className='btn-visu'  >Entrar</button>
          <h4>
            Quero me cadastrar,{' '}
            <a href="http://localhost:3000/registro" className="login-color">
              Cadastrar
            </a>
          </h4>
        </form>
      </div>
    </section>
  );
};

export default Login;
