import { useState, ChangeEvent, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { requestRegistration, requestData } from '../services/requests';
import '../styles/pages/registration.css';

const Registration = () => {
  const [usernameRegistration, setUsernameRegistration] = useState<string>('');
  const [emailRegistation, setEmailRegistation] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationPassword, setConfirmationPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);
  const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState<boolean>(false);
  const [isUsernameAlreadyUsed, setIsUsernameAlreadyUsed] = useState<boolean>(false);

  const isFormValid = !(errorMessage || isEmailAlreadyUsed || isUsernameAlreadyUsed);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsernameRegistration(event.target.value);
    setIsUsernameAlreadyUsed(false);
    setErrorUsername('');
  };

  const handleEmailChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmailRegistation(event.target.value);
    setIsEmailAlreadyUsed(false);
    setErrorEmail('');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleConfirmationPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfirmationPassword(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    if (password === confirmationPassword) {
      if (regex.test(password)) {
        await requestRegistration('/registration', { usernameRegistration, password, emailRegistation });
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

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlurUsername = async (): Promise<void> => {
    try {
      const response = await requestData(`/login/username/${usernameRegistration}`);
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

  const handleBlurEmail = async (): Promise<void> => {
    if (emailRegistation !== '') {
      const isValidEmail = validateEmailFormat(emailRegistation);
      if (!isValidEmail) {
        setErrorEmail('O email não está em um formato válido.');
      } else {
        try {
          const response = await requestData(`/login/email/${emailRegistation}`);
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
    localStorage.setItem('LoggedIn', 'true');
    localStorage.setItem('username', usernameRegistration);
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
          value={usernameRegistration}
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
          value={emailRegistation}
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
      <h4>Já tenho uma conta, <a href='http://localhost:3000/login' className="login-color">logar</a></h4>
    </div>
  );
};

export default Registration;

