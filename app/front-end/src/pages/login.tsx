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

  const isFormValid = !(emptyInput || errorPassword || errorEmail || errorPassword);

  useEffect(() => {
    if (fullName.length >= 1) {
      navigate('/');
    }
  }, [navigate, fullName]);

  const handleBlur = (): void => {
    setErrorPassword(false);
    setEmptyInput(false);
    setErrorEmail(false);
  };

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
      <div className="login-card"
        onBlur={handleBlur}
      >
        <form onSubmit={(event) => login(event)} className='form_login'>
          <h1>Entrar</h1>
          <div className='input_container'>
            <input
              id="email-input"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha"
            />
          </div>
          {errorEmail && (
            <div
              aria-label="Endereço de e-mail não localizado."
              data-balloon="Endereço de e-mail não localizado."
              data-balloon-pos="right"
              data-balloon-visible={errorEmail ? "true" : "false"}
              className="tooltip_balloon_login_email"
            >
            </div>
          )}
          {errorPassword && (
            <div
              aria-label="A senha está incorreta, por favor, tente novamente."
              data-balloon="A senha está incorreta, por favor, tente novamente."
              data-balloon-pos="right"
              data-balloon-visible={errorPassword ? "true" : "false"}
              className="tooltip_balloon_login_password"
            >
            </div>
          )}
          {emptyInput && (
            <div
              aria-label=" Informe o e-mail e a senha."
              data-balloon=" Informe o e-mail e a senha."
              data-balloon-pos="down"
              data-balloon-visible={emptyInput ? "true" : "false"}
              className="tooltip_balloon_login_error"
            >
            </div>
          )}
          <div>
            <button type="submit"
              className={`btn_edit btn_login ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid}
            >Entrar</button>
          </div>
          <h4>
            Quero me cadastrar,{' '}
            <a href="http://localhost:3000/registro" className="login-color">
              Cadastrar
            </a>
          </h4>
        </form>
      </div >
    </section >
  );
};

export default Login;
