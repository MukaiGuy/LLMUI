import React, { createContext, useState, useContext, useEffect } from 'react';
import { getItem, setItem, deleteItem } from '../utils/storage';

// Define the shape of your context
type AuthContextType = {
  apiKey: string | null;
  login: (key: string) => void;
  logout: () => void;
};

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  apiKey: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    console.log('AuthContext: Loading API key from storage...');
    getItem('OPENAI_KEY').then((key) => {
      console.log('AuthContext: Retrieved key:', key ? 'exists' : 'not found');
      if (key) setApiKey(key);
    }).catch((error) => {
      console.error('AuthContext: Error loading API key:', error);
    });
  }, []);

  const login = async (key: string) => {
    await setItem('OPENAI_KEY', key);
    setApiKey(key);
  };

  const logout = async () => {
    await deleteItem('OPENAI_KEY');
    setApiKey(null);
  };

  return (
    <AuthContext.Provider value={{ apiKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
