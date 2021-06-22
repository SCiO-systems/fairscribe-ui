import React, { createContext } from 'react';
import { useLocalStorage } from '../utilities/hooks';
import axiosIntance from '../utilities/api-client';

const initialState = {
  access_token: null,
  isLoggedIn: false,
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  role: null,
  avatar_url: null,
  ui_language: null,
  ui_language_display_format: null,
  ui_date_display_format: null,
  currentlyViewingTeam: null,
  ownTeams: [],
  sharedTeams: [],
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  // md5sum: scio-datascribe-v1.1.0
  const localStorageKey = 'user-35d0c79fd3a72c59350dc4b1f4ffe786';
  const [userData, setUserData] = useLocalStorage(
    localStorageKey,
    initialState,
  );

  return (
    <UserContext.Provider
      value={{
        ...userData,
        setUser: (user) => {
          if (user.access_token) {
            axiosIntance.setup(() => {
              setUserData({ ...initialState });
            }, user.access_token);
          }
          setUserData({ ...userData, ...user });
        },
        resetData: () => {
          axiosIntance.resetInterceptors();
          setUserData({ ...initialState });
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
