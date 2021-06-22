import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RepoAccessManagerDialog from '../components/dialogs/RepoManagerAccessDialog';
import Footer from '../components/Footer';
import UserPassword from '../components/UserPassword';
import UserProfile from '../components/UserProfile';
import UserTargetedRepositories from '../components/UserTargetedRepositories';
import { getProfile, getRepositories } from '../services/user';
import { UserContext } from '../store';

// TODO: Maybe initialise all stuff here and pass as props to components.

const AccountSettings = () => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState(null);

  useEffect(() => {
    // Set the user profile.
    getProfile(id)
      .then(({ data }) => {
        setProfile(data);
      })
      .catch((error) => {
        setProfile(null);
      });

    // Set the user repositories.
    getRepositories(id)
      .then(({ data }) => {
        setRepositories(data);
      })
      .catch((error) => {
        setRepositories(null);
      });
  }, []);

  return (
    <>
      <div className="account-settings-page">
        <div className="layout-content">
          {/* User profile */}
          <UserProfile
            userId={id}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
          />
          {/* UI Preferences */}
          {/* <UserInterfacePreferences /> */}
          <UserPassword userId={id} />
          {/* Targeted Repositories */}
          <UserTargetedRepositories userId={id} />
        </div>
        {/* TODO: Make this reusable. */}
        <RepoAccessManagerDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
