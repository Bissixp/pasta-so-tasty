import { useState, useEffect } from 'react';
import { requestLogin, setToken, requestData } from '../services/requests';
import { useNavigate } from 'react-router-dom';

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

      const { data } = await requestData('/login/validate');
      const { role, username } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      setIsLogged(true);
      setRole(role);

    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    setFailedTryLogin(false);

    if (isLogged && role === 'admin') {
      const userAlreadyLoggedIn = localStorage.getItem('username');
      if (userAlreadyLoggedIn !== null) {
        localStorage.setItem('username', userAlreadyLoggedIn);
      }
      localStorage.setItem('LoggedIn', 'true');
      navigate('/admin');
    }

    if (isLogged && role === 'member') {
      const userAlreadyLoggedIn = localStorage.getItem('username');
      if (userAlreadyLoggedIn !== null) {
        localStorage.setItem('username', userAlreadyLoggedIn);
      }
      localStorage.setItem('LoggedIn', 'true');
      navigate('/');
    }
  }, [isLogged, role, navigate]);


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
          {failedTryLogin && (
            <p>
              O endereço de e-mail ou a senha não estão corretos. Por favor,
              tente novamente.
            </p>
          )}
          <button type="submit" onClick={(event) => login(event)}>
            Entrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
