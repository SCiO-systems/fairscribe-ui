import React, { createContext } from 'react';
import hooks from '../utilities/hooks';

const initialState = {
  userId: '',
  name: '',
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
        setData: (data) => setUser({ ...user, ...data }),
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
