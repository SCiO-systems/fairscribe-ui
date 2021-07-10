import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useContext, useEffect, useState } from 'react';
import RepoAccessManagerDialog from '../components/dialogs/RepoManagerAccessDialog';
import Footer from '../components/Footer';
import UserPassword from '../components/UserPassword';
import UserProfile from '../components/UserProfile';
import UserTargetedRepositories from '../components/UserTargetedRepositories';
import { getUserProfile } from '../services/users';
import { UserContext } from '../store';

const AccountSettings = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const isScribeUser = async () => {
    const { data } = await getUserProfile(id);
    if (data.identity_provider === 'scribe') {
      setShowPassword(true);
    }
  };

  useEffect(() => {
    isScribeUser();
  }, []); // eslint-disable-line

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
          {showPassword && <UserPassword userId={id} />}
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
