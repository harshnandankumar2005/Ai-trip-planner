import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('tripwise_token') || '');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(true);

  // Check stored user on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('tripwise_token');
      const storedUser = localStorage.getItem('tripwise_user');
      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (e) {
          localStorage.removeItem('tripwise_token');
          localStorage.removeItem('tripwise_user');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('tripwise_token', res.token);
      localStorage.setItem('tripwise_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
      setIsAuthModalOpen(false);
      return res.user;
    }
  };

  const register = async (name, email, password) => {
    const res = await api.register({ name, email, password });
    if (res.success && res.token) {
      localStorage.setItem('tripwise_token', res.token);
      localStorage.setItem('tripwise_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
      setIsAuthModalOpen(false);
      return res.user;
    }
  };

  const logout = () => {
    localStorage.removeItem('tripwise_token');
    localStorage.removeItem('tripwise_user');
    setToken('');
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
