import { useState, ChangeEvent, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { requestRegistration } from '../services/requests';
import '../styles/pages/registration.css';

const Registration = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationPassword, setConfirmationPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);
  const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState<boolean>(false);
  const [isUsernameAlreadyUsed, setIsUsernameAlreadyUsed] = useState<boolean>(false);

  const isFormValid = !(errorMessage || isEmailAlreadyUsed || isUsernameAlreadyUsed);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setIsUsernameAlreadyUsed(false);
    setErrorUsername('');
  };

  const handleEmailChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailAlreadyUsed(false);
    setErrorEmail('');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleConfirmationPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmationPassword(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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

  const handleBlurUsername = async () => {
    try {
      const response = await requestRegistration('/registration/findUsername', { username });
      if (response.data !== null) {
        setErrorUsername('Nome de usuário já cadastrado, tente outro');
        setIsUsernameAlreadyUsed(true);
      } else {
        setErrorUsername('');
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
    }
  };

  const handleBlurEmail = async () => {
    if (email !== '') {
      const isValidEmail = validateEmailFormat(email);
      if (!isValidEmail) {
        setErrorEmail('O email não está em um formato válido.');
      } else {
        try {
          const response = await requestRegistration('/registration/findEmail', { email });
          if (response.data !== null) {
            setErrorEmail('Email já cadastrado, tente outro');
            setIsEmailAlreadyUsed(true);
          } else {
            setErrorEmail('');
          }
        } catch (error) {
          console.error('Erro ao verificar email:', error);
        }
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
          onBlur={handleBlurUsername}
        />
        {errorUsername && (
          <div className="error-balloon">
            <p className="error-message">{errorUsername}</p>
          </div>
        )}
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

