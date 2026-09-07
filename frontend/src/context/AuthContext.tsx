'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch } from '@/lib/api';

export type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthApiResponse = {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
  data?: {
    token?: string;
    user?: User;
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('tripona_token')
        : null;

    if (!savedToken) {
      setLoading(false);
      return;
    }

    setToken(savedToken);

    apiFetch<{ success: boolean; user?: User; data?: User }>('/auth/me', {
      token: savedToken,
    })
      .then((response) => {
        setUser(response.user || response.data || null);
      })
      .catch(() => {
        localStorage.removeItem('tripona_token');
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(email: string, password: string) {
    const response = await apiFetch<AuthApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const responseToken = response.token || response.data?.token || null;
    const responseUser = response.user || response.data?.user || null;

    if (responseToken) {
      localStorage.setItem('tripona_token', responseToken);
      setToken(responseToken);
      setUser(responseUser);
    } else {
      throw new Error('Token not found in login response');
    }
  }

  async function register(name: string, email: string, password: string) {
    const response = await apiFetch<AuthApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    const responseToken = response.token || response.data?.token || null;
    const responseUser = response.user || response.data?.user || null;

    if (responseToken) {
      localStorage.setItem('tripona_token', responseToken);
      setToken(responseToken);
      setUser(responseUser);
    } else {
      throw new Error('Token not found in register response');
    }
  }

  function logout() {
    localStorage.removeItem('tripona_token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
