import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount, fetchEmail } from '../services/requests';
import '../styles/pages/registration.css';

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationPassword, setConfirmationPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorFirstName, setErrorFirstName] = useState<string>('');
  const [errorLastName, setErrorLastName] = useState<string>('');
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);
  const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState<boolean>(false);

  const navigate = useNavigate();

  const isFormValid = !(errorMessage || isEmailAlreadyUsed || errorFirstName || errorLastName);

  const handleEmailChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmail(event.target.value);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    if (password === confirmationPassword) {
      if (regex.test(password)) {
        try {
          await createAccount({ firstName, lastName, password, email });
          setRedirectToHome(true);
        } catch (error) {
          console.error('Erro ao registrar:', error);
        }
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

  const handleBlurEmail = async (): Promise<void> => {
    if (email !== '') {
      const isValidEmail = validateEmailFormat(email);
      if (!isValidEmail) {
        setErrorEmail('O email não está em um formato válido.');
      } else {
        try {
          const response = await fetchEmail(email);
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

  const handleBlurFirstName = (): void => {
    const trimmedValue = firstName.trim();
    if (trimmedValue.length < 3) {
      setErrorFirstName('O campo deve ter no mínimo 3 caracteres.');
    } else {
      setErrorFirstName('');
    }
  };

  const handleBlurLastName = (): void => {
    const trimmedValue = lastName.trim();
    if (trimmedValue.length < 3) {
      setErrorLastName('O campo deve ter no mínimo 3 caracteres.');
    } else {
      setErrorLastName('');
    }
  };

  if (redirectToHome) {
    navigate('/');
    window.location.reload();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          <h4>Nome</h4>
          <input
            type="text"
            minLength={3}
            maxLength={12}
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            onBlur={handleBlurFirstName}
          />
          {errorFirstName && (
            <div className="error-balloon">
              <p className="error-message">{errorFirstName}</p>
            </div>
          )}
        </label>
        <label htmlFor="lastName">
          <h4>Sobrenome</h4>
          <input
            type="text"
            minLength={3}
            maxLength={12}
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            onBlur={handleBlurLastName}
          />
          {errorLastName && (
            <div className="error-balloon">
              <p className="error-message">{errorLastName}</p>
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
          <button type="submit" disabled={!isFormValid}>
            Cadastrar
          </button>
        </label>
        <h4>
          Já tenho uma conta,{' '}
          <a href="http://localhost:3000/login" className="login-color">
            logar
          </a>
        </h4>
      </form>
    </div>
  );
};

export default Registration;
