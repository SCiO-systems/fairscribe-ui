import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { UserTargetedRepositories, UserProfile, UserPassword, RepoAccessManagerDialog } from './components';
import UsersService from '../../services/usersService';
import { UserContext } from '../../store';

const AccountSettings = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const { id } = useContext(UserContext);
	const [identityProvider, setIdentityProvider] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		UsersService.getUserProfile(id)
			.then((res) => {
				setIdentityProvider(res.data?.identity_provider);
				setUserData(res.data);
			});
  }, []); // eslint-disable-line

	return (
		<>
			<div className="account-settings-page">
				<div className="layout-content">
					{/* User profile */}
					<UserProfile
						identityProvider={identityProvider}
						userId={id}
						dialogOpen={dialogOpen}
						setDialogOpen={setDialogOpen}
						userData={userData}
					/>
					{/* UI Preferences */}
					{/* <UserInterfacePreferences /> */}
					{identityProvider === 'scribe' && <UserPassword userId={id} />}
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
