import React, { createContext } from 'react';
import { useLocalStorage } from '../utilities/hooks';

const initialState = {
  userId: '',
  name: '',
  token: '',
  language: 'en',
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', initialState);

  return (
    <UserContext.Provider
      value={{
        ...user,
        setData: (data) => setUser({ ...user, ...data }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
