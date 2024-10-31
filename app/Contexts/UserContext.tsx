'use client'
// contexts/UserContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextProps {
  username: string | null;
  fullname: string | null;
  setUserData: (username: string, fullname: string) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<{ username: string | null; fullname: string | null }>({
    username: null,
    fullname: null,
  });

  const value: UserContextProps = {
    username: userData.username,
    fullname: userData.fullname,
    setUserData: (username, fullname) => setUserData({ username, fullname }),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
