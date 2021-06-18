import React, { createContext } from 'react';
import { useLocalStorage } from '../utilities/hooks';

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  role: null,
  profile_picture_url: null,
  ui_language: null,
  ui_language_display_format: null,
  ui_date_display_format: null,
  isLoggedIn: false,
  currentlyViewingTeam: null,
  ownTeams: [],
  sharedTeams: [],
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  // md5sum: scio-datascribe-v1.0.0
  const localStorageKey = 'user-9C9B69C14E32B146599D0F6E30902C0C';
  const [user, setUser] = useLocalStorage(localStorageKey, initialState);

  return (
    <UserContext.Provider
      value={{
        ...user,
        setData: (data) => setUser({ ...user, ...data }),
        resetData: () => setUser({ ...initialState }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
