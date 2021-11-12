import React, { createContext } from 'react';
import axiosInstance from '../utilities/api-client';
import { useLocalStorage } from '../utilities/hooks';

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
  // md5sum: scio-fairscribe-v1.1.0
  const localStorageKey = 'user-35d0c79fd3a72c59350dc4b1f4ffe786';
  const [userData, setUserData] = useLocalStorage(localStorageKey, initialState);

  if (userData.access_token !== null) {
    axiosInstance.setup(() => {
      setUserData({ ...initialState });
    }, userData.access_token);
  }

  return (
    <UserContext.Provider
      value={{
        ...userData,
        setUser: (user) => {
          if (user.access_token) {
            axiosInstance.setup(() => {
              setUserData({ ...initialState });
            }, user.access_token);
          }
          setUserData({ ...userData, ...user });
        },
        resetData: () => {
          axiosInstance.resetInterceptors();
          setUserData({ ...initialState });
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
