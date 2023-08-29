import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { fetchLogin } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import pastaSoTastyContext from '../context/context';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [failedTryLogin, setFailedTryLogin] = useState<boolean>(false);

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
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  return (
    <>
      <section className="user-login-area">
        <form onSubmit={(event) => login(event)}>
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            Email:
            <input
              id="email-input"
              className="login__login_input"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Login"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha"
            />
          </label>
          {failedTryLogin && (
            <p>
              O endereço de e-mail ou a senha não estão corretos. Por favor,
              tente novamente.
            </p>
          )}
          <button type="submit">Entrar</button>
        </form>
      </section>
    </>
  );
};

export default Login;
