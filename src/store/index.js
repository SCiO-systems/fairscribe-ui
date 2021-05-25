import React, { createContext } from 'react';
import { useLocalStorage } from '../utilities/hooks';

const initialState = {
  userId: '',
  name: '',
  token: '',
  language: 'en',
  currentlyViewingTeam: null,
  ownTeams: [{ id: 1, name: 'EiA', tasks: '4', reviews: '13', uploads: '21' }],
  sharedTeams: [
    { id: 2, name: 'CSI Team', tasks: '4', reviews: '13' },
    { id: 3, name: 'Org Data Team', tasks: '9', reviews: '6' },
  ],
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
