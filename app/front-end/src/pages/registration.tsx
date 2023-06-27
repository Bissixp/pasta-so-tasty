import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { requestRegistration } from '../services/requests';
import '../styles/pages/registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const isFormValid =
    username !== '' &&
    email !== '' &&
    password !== '' &&
    confirmationPassword !== '';

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    setErrorEmail('');
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleConfirmationPasswordChange = (event: any) => {
    setConfirmationPassword(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    if (password === confirmationPassword) {
      if (regex.test(password)) {
        await requestRegistration('/registration', { username, password, email });
        setRedirectToHome(true);
      } else {
        setErrorMessage(
          'A senha deve conter pelo menos 8 caracteres, 1 dígito, 1 letra minúscula, 1 letra maiúscula e 1 caractere especial.'
        );
      }
    } else {
      setErrorMessage('As senhas não correspondem.');
    }
  };

  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlurEmail = () => {
    if (email !== '') {
      const isValidEmail = validateEmailFormat(email);
      if (!isValidEmail) {
        setErrorEmail('O email não está em um formato válido.');
      } else {
        setErrorEmail('');
      }
    } else {
      setErrorEmail('');
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <label htmlFor="username">
        <h4>Nome de Usuário</h4>
        <input
          type="text"
          maxLength={12}
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label htmlFor="email">
        <h4>Email</h4>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlurEmail}
        />
        {errorEmail && (
          <div className="error-balloon">
            <p className="error-message">{errorEmail}</p>
          </div>
        )}
      </label>
      <label htmlFor="password">
        <h4>Senha</h4>
        <input
          type="password"
          id="password"
          minLength={8}
          value={password}
          onChange={handlePasswordChange}
        />
        <p>Sua senha deve atender aos seguintes requisitos:</p>
        <ul>
          <li>8 caracteres mínimo</li>
          <li>1 dígito</li>
          <li>1 minúscula</li>
          <li>1 maiúscula</li>
          <li>1 caractere especial (ex: ! @ # $)</li>
        </ul>
      </label>
      <label htmlFor="confirmation-password">
        <h4>Confirmação da Senha</h4>
        <input
          type="password"
          id="confirmation-password"
          value={confirmationPassword}
          onChange={handleConfirmationPasswordChange}
        />
        {errorMessage && (
          <div className="error-balloon">
            <p className="error-message">{errorMessage}</p>
          </div>
        )}
      </label>
      <label>
        <br />
        <br />
        <button onClick={handleSubmit} type="submit" disabled={!isFormValid}>
          Cadastrar
        </button>
      </label>
    </div>
  );
};

export default Registration;
