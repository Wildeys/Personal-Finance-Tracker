import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { stores, TokenType, AuthStatus } from '@/stores';
import type { ProfileInput } from '@/stores/auth-store';

interface AuthState {
  token: TokenType | null;
  status: AuthStatus;
  isFirstTime: boolean;
  name: string;
  email: string;
  password: string;
  phone: string;
  memberSince: string;
  signIn: (data: TokenType, profile?: ProfileInput) => void;
  signOut: () => Promise<void>;
  setIsFirstTime: (value: boolean) => void;
  updateProfile: (profile: ProfileInput) => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = observer(({ children }: { children: React.ReactNode }) => {
  const value: AuthState = {
    token: stores.auth.token,
    status: stores.auth.status,
    isFirstTime: stores.auth.isFirstTime,
    name: stores.auth.name,
    email: stores.auth.email,
    password: stores.auth.password,
    phone: stores.auth.phone,
    memberSince: stores.auth.memberSince,
    signIn: (data, profile) => stores.auth.signIn(data, profile),
    signOut: () => stores.auth.signOut(),
    setIsFirstTime: (value) => stores.auth.setIsFirstTime(value),
    updateProfile: (profile) => stores.auth.updateProfile(profile),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
