import React, { useEffect, useMemo, useState } from 'react';
import { fetchValidate, fetchAllFavs } from '../services/requests';
import PastaSoTastyContext from './context';
import ICookies from '../interface/ICookies';

function PastaSoTastyProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<number>(0);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchValidate() as ICookies;
        if (data) {
          setId(data.id);
          setFullName(`${data.first_name} ${data.last_name}`);
          setEmail(data.email);
          setRole(data.role);
          setLogged(data.logged)
        }
      } catch (e: any) {
        console.error("Erro:", e.message);
      }
    };

    const fetchFavs = async () => {
      if (id !== 0) {
        try {
          const data = await fetchAllFavs(id);
          if (data !== null) {
            localStorage.setItem('recipeFavId', JSON.stringify(data));
          }
        } catch (e: any) {
          console.error("Erro:", e.message);
        }
      }
    };

    fetchData();
    fetchFavs();
  }, [id]);

  const contextValue = useMemo(() => ({
    id,
    setId,
    fullName,
    setFullName,
    email,
    setEmail,
    role,
    setRole,
    logged,
    setLogged
  }), [id, fullName, email, role, logged]);

  return (
    <PastaSoTastyContext.Provider value={contextValue}>
      {children}
    </PastaSoTastyContext.Provider>
  );
}

export default PastaSoTastyProvider;
