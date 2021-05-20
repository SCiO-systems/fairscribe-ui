import React, { createContext } from 'react';
import hooks from '../utilities/hooks';

const initialState = {
  userId: '',
  token: '',
  language: 'en',
};

const UserContext = createContext(initialState);

function UserProvider({ children }) {
  const [user, setUser] = hooks.useLocalStorage('user', initialState);

  return (
    <UserContext.Provider
      value={{
        ...user,
        setUserId: (id) => setUser({ ...user, id }),
        setToken: (token) => setUser({ ...user, token }),
        setLanguage: (language) => setUser({ ...user, language }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default {
  UserContext,
  UserProvider,
};
