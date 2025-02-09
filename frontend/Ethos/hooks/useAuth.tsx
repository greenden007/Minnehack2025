import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // This would typically check for an existing session or token
    // and fetch the user data if authenticated
    // For now, we'll just simulate a logged-out state
    setUser(null);
  }, []);

  const login = (email: string, password: string) => {
    // This would typically make an API call to authenticate
    // For now, we'll just simulate a successful login
    setUser({ id: '1', name: 'Test User', email });
  };

  const logout = () => {
    // This would typically clear the session or token
    setUser(null);
  };

  return { user, login, logout };
};
