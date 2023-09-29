import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount, fetchEmail } from '../services/requests';
import pastaSoTastyContext from '../context/context';
import '../styles/pages/registration.css';

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationPassword, setConfirmationPassword] = useState<string>('');
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);
  const [errorFirstName, setErrorFirstName] = useState<boolean>(false);
  const [errorLastName, setErrorLastName] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [isIncorretPassword, setIsIncorretPassword] = useState<boolean>(false);
  const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState<boolean>(false);

  const { fullName } = useContext(pastaSoTastyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (fullName.length >= 1) {
      navigate('/');
    }
  }, [navigate, fullName]);


  const isFormValid = !(errorFirstName || errorLastName || errorEmail || isEmailAlreadyUsed || errorPassword || isIncorretPassword);

  const handleEmailChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmail(event.target.value);
    setIsEmailAlreadyUsed(false);
    setErrorEmail(false);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setErrorPassword(false);
    setErrorPassword(false);
  };

  const handleConfirmationPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfirmationPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await createAccount({ firstName, lastName, password, email });
      setRedirectToHome(true);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  }

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlurEmail = async (): Promise<void> => {
    if (email !== '') {
      const isValidEmail = validateEmailFormat(email);
      if (!isValidEmail) {
        setErrorEmail(true);
      } else {
        try {
          const response = await fetchEmail(email);
          if (response.data !== null) {
            setIsEmailAlreadyUsed(true);
          } else {
            setIsEmailAlreadyUsed(false);
          }
        } catch (error) {
          console.error('Erro ao verificar email:', error);
        }
      }
    } else {
      setErrorEmail(false);
    }
  };

  const handleBlurFirstName = (): void => {
    const trimmedValue = firstName.trim();
    if (trimmedValue.length < 3) {
      setErrorFirstName(true);
    } else {
      setErrorFirstName(false);
    }
  };

  const handleBlurLastName = (): void => {
    const trimmedValue = lastName.trim();
    if (trimmedValue.length < 3) {
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
    }
  };

  const handleBlurPassword = async (): Promise<void> => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    if (password === confirmationPassword) {
      if (regex.test(password)) {
        setErrorPassword(false);
        setIsIncorretPassword(false);
      } else {
        setIsIncorretPassword(false);
        setErrorPassword(true);
      }
    } else {
      setErrorPassword(false);
      setIsIncorretPassword(true);
    }
  };

  if (redirectToHome) {
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="user-login-area">
      <div className="register_card">
        <form onSubmit={handleSubmit} className='form_register'>
          <input
            className='recipe_input_register'
            type="text"
            minLength={3}
            maxLength={12}
            placeholder='Nome'
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            onBlur={handleBlurFirstName}
          />
          {errorFirstName && (
            <div
              aria-label="O campo deve ter no mínimo 3 caracteres."
              data-balloon="O campo deve ter no mínimo 3 caracteres."
              data-balloon-pos="right"
              data-balloon-visible={errorFirstName ? "true" : "false"}
              className="tooltip_balloon_register"
            >
            </div>
          )}
          <input
            className='recipe_input_register'
            type="text"
            minLength={3}
            maxLength={12}
            id="lastName"
            placeholder='Sobrenome'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            onBlur={handleBlurLastName}
          />
          {errorLastName && (
            <div
              aria-label="O campo deve ter no mínimo 3 caracteres."
              data-balloon="O campo deve ter no mínimo 3 caracteres."
              data-balloon-pos="right"
              data-balloon-visible={errorLastName ? "true" : "false"}
              className="tooltip_balloon_register"
            >
            </div>
          )}
          <input
            className='recipe_input_register'
            type="email"
            id="email"
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlurEmail}
          />
          {errorEmail && (
            <div
              aria-label="O email não está em um formato válido."
              data-balloon="O email não está em um formato válido."
              data-balloon-pos="right"
              data-balloon-visible={errorEmail ? "true" : "false"}
              className="tooltip_balloon_register"
            >
            </div>
          )}
          {isEmailAlreadyUsed && (
            <div
              aria-label="Email já cadastrado, tente outro"
              data-balloon="Email já cadastrado, tente outro"
              data-balloon-pos="right"
              data-balloon-visible={isEmailAlreadyUsed ? "true" : "false"}
              className="tooltip_balloon_register"
            >
            </div>
          )}
          <input
            className='recipe_input_register'
            type="password"
            id="password"
            placeholder='Senha'
            minLength={8}
            value={password}
            onChange={handlePasswordChange}
          />
          <p>Sua senha deve atender aos seguintes requisitos:</p>
          <ul className='register_list'>
            <li className={password.length >= 8 ? 'green-li' : 'black-li'}>8 caracteres mínimo</li>
            <li className={/[0-9]/.test(password) ? 'green-li' : 'black-li'}>1 dígito</li>
            <li className={/[a-z]/.test(password) ? 'green-li' : 'black-li'}>1 minúscula</li>
            <li className={/[A-Z]/.test(password) ? 'green-li' : 'black-li'}>1 maiúscula</li>
            <li className={/[!@#$%^&*]/.test(password) ? 'green-li' : 'black-li'}>1 caractere especial (ex: ! @ # $)</li>
          </ul>
          <input
            className='recipe_input_register'
            type="password"
            id="confirmation-password"
            placeholder='Confirmação da senha'
            value={confirmationPassword}
            onChange={handleConfirmationPasswordChange}
            onBlur={handleBlurPassword}
          />
          {errorPassword && (
            <div
              aria-label="A senha não atende os requisitos."
              data-balloon="A senha não atende os requisitos."
              data-balloon-pos="right"
              data-balloon-visible={errorPassword ? "true" : "false"}
              className="tooltip_balloon_register"
            >
            </div>
          )}
          {isIncorretPassword && (
            <div
              aria-label="As senhas não correspondem"
              data-balloon="As senhas não correspondem"
              data-balloon-pos="right"
              data-balloon-visible={isIncorretPassword ? "true" : "false"}
              className="tooltip_balloon_register"
            >
            </div>
          )}
          <button type="submit"
            className={`btn_edit btn_register ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}>
            Cadastrar
          </button>
          <h4 className='login_a'>
            Já tenho uma conta,{' '}
            <a href="http://localhost:3000/login" className="login-color">
              Logar
            </a>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Registration;
