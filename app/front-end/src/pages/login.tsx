import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken, requestData } from '../services/requests';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event: any) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });

      setToken(token);

      const { role } = await requestData('/login/validate');

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setIsLogged(true);
      setRole(role);

    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged && role === 'admin') return <Navigate to="/admin" />;

  return (
    <>
      <section className="user-login-area">
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            <input
              className="login__login_input"
              type="text"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              placeholder="Login"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              placeholder="Senha"
            />
          </label>
          {
            (failedTryLogin)
              ? (
                <p data-testid="login__input_invalid_login_alert">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
          <button
            type="submit"
            onClick={(event) => login(event)}
          >
            Entrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;