import { useNavigate } from 'react-router-dom';
import '../styles/components/btnLogoff.css';
import { fetchLogout, fetchValidate } from '../services/requests';

const BtnLogoff = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await fetchLogout();
    const validate = await fetchValidate();
    if (validate === false) {
      localStorage.removeItem('recipeFavId');
      navigate('/');
      window.location.reload();
    }
  }

  return (
    <>
      <button className="button-transparent" type="button" onClick={logout}>
        Sair
      </button>
    </>
  );
};

export default BtnLogoff;
