import { useNavigate } from 'react-router-dom';
import { fetchLogout, fetchValidate } from '../services/requests';
import '../styles/components/btnLogoff.css';

const BtnLogoff = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await fetchLogout();
    const validate = await fetchValidate();
    if (validate === null) {
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
