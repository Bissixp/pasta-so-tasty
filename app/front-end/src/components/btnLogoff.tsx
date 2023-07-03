import { useNavigate } from 'react-router-dom';

const BtnLogoff = () => {
  const navigate = useNavigate();

  const logoff = (): void => {
    localStorage.removeItem('LoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/home');
    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={logoff}>
        Sair
      </button>
    </>
  );
};

export default BtnLogoff;
