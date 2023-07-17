import React, { useMemo, useState } from 'react';
import PastaSoTastyContext from './context';

function PastaSoTastyProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const contextValue = useMemo(() => ({
    username,
    setUsername,
    role,
    setRole,
    email,
    setEmail
  }), [username, role, email]);

  return (
    <PastaSoTastyContext.Provider value={contextValue}>
      {children}
    </PastaSoTastyContext.Provider>
  );
}

export default PastaSoTastyProvider;
