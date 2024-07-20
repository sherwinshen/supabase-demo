import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
});

export default AuthContext;
