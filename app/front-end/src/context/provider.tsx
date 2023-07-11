import React, { useMemo, useState } from 'react';
import PastaSoTastyContext from './context';

function PastaSoTastyProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const contextValue = useMemo(() => ({
    username,
    setUsername,
    role,
    setRole
  }), [username, role]);

  return (
    <PastaSoTastyContext.Provider value={contextValue}>
      {children}
    </PastaSoTastyContext.Provider>
  );
}

export default PastaSoTastyProvider;
