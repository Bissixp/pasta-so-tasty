import React, { useMemo, useState } from 'react';
import PastaSoTastyContext from './context';

function PastaSoTastyProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState([]);
  const contextValue = useMemo(() => ({
    loggedIn,
    setLoggedIn,
    username,
    setUsername,
  }), [loggedIn, username]);

  return (
    <PastaSoTastyContext.Provider value={contextValue}>
      {children}
    </PastaSoTastyContext.Provider>
  );
}

export default PastaSoTastyProvider;
