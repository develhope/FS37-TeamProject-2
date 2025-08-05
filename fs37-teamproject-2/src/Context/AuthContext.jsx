// Nel contesto, accedo allo stato di login di un utente da un qualsiasi componente

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// hook personalizzato per leggere il context rapidamente
export function useAuth() {
  return useContext(AuthContext);
}
