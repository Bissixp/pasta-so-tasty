interface IContext {
  username: string;
  setUsername: (username: string) => void;
  role: string;
  setRole: (role: string) => void;
  email: string;
  setEmail: (role: string) => void;
}

export default IContext;
