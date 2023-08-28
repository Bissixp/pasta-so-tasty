import { Dispatch, SetStateAction } from 'react';

interface IContext {
  id: number;
  setId: Dispatch<SetStateAction<number>>;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}

export default IContext;