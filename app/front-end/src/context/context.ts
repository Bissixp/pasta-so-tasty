import { createContext } from 'react';
import IContext from '../interface/IContext';

const pastaSoTastyContext = createContext<IContext>({
  id: 0,
  setId: () => { },
  fullName: '',
  setFullName: () => { },
  email: '',
  setEmail: () => { },
  role: '',
  setRole: () => { },
  logged: false,
  setLogged: () => { },
});

export default pastaSoTastyContext;
