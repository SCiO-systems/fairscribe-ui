import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import RepoAccessManagerDialog from '../components/dialogs/RepoManagerAccessDialog';
import UserInterfacePreferences from '../components/UserInterfacePreferences';
import UserProfile from '../components/UserProfile';
import UserTargetedRepositories from '../components/UserTargetedRepositories';

// TODO: Maybe initialise all stuff here and pass as props to components.

const AccountSettings = () => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="account-settings-page">
        <div className="layout-content">
          {/* User profile */}
          <UserProfile dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          {/* UI Preferences */}
          <UserInterfacePreferences />
          {/* Targeted Repositories */}
          <UserTargetedRepositories />
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
