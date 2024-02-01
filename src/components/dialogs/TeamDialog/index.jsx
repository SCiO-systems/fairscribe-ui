import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TeamsService from '../../../services/teamsService';
import { ToastContext, UserContext } from '../../../store';
import { handleError } from '../../../utilities/errors';

const TeamDialog = ({ dialogOpen, setDialogOpen, team, setMyTeams }) => {
	const { t } = useTranslation();
	const [teamName, setTeamName] = useState(team?.name || '');
	const [teamDescription, setTeamDescription] = useState(
		team?.description || ''
	);
	const [isLoading, setIsLoading] = useState(false);
	const { id: userId, setUser } = useContext(UserContext);
	const { setSuccess, setError } = useContext(ToastContext);

	useEffect(() => {
		setTeamName(team?.name || '');
		setTeamDescription(team?.description || '');
	}, [team]);

	const reloadTeams = () => {
		TeamsService.getAllOwnedTeams(userId)
			.then((res) => {
				TeamsService.getAllSharedTeams()
					.then((sharedTeamsRes) => {
						setUser({
							ownTeams: res.data,
							sharedTeams: sharedTeamsRes.data,
						});
						setDialogOpen(false);
					})
					.catch((er) => {
						if (er.response) {
							setError('Oops!', er.response.data.error);
						}
					});
			});
		TeamsService.getOwnedTeams(userId, 1).then((res) => {
			setMyTeams(res.data);
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (team && team.id) {
			// we're updating
			TeamsService.updateTeam(userId, team.id, {
				name: teamName,
				description: teamDescription,
			})
				.then((res) => {
					reloadTeams();
					setSuccess('Done!', 'Your changes were saved.');
				})
				.catch((error) => {
					setError(handleError(error));
				});
		} else {
			// we're making a new team
			TeamsService.createTeam(userId, {
				name: teamName,
				description: teamDescription,
			})
				.then((res) => {
					reloadTeams();
					setSuccess('Done!', 'Your team has been created.');
				})
				.catch((error) => {
					setError(handleError(error));
				});
		}
		setIsLoading(false);
	};

	return (
		<Dialog
			header={team ? t('EDIT_TEAM') : t('CREATE_A_NEW_TEAM')}
			visible={dialogOpen}
			style={{ width: '400px' }}
			draggable={false}
			modal
			onHide={() => setDialogOpen(false)}
		>
			<div className="p-fluid">
				<div className="p-formgrid p-grid">
					<form onSubmit={handleSubmit}>
						<div className="p-col-12">
							<div className="p-field">
								<label htmlFor="teamName">{t('YOUR_TEAM_NAME')}</label>
								<InputText
									id="teamName"
									value={teamName}
									onChange={(e) => setTeamName(e.target.value)}
								/>
							</div>
							<div className="p-mt-4 p-field">
								<label htmlFor="teamDescription">{t('YOUR_TEAM_DESC')}</label>
								<InputTextarea
									id="teamDescription"
									rows={5}
									cols={30}
									value={teamDescription}
									onChange={(e) => setTeamDescription(e.target.value)}
								/>
							</div>
						</div>
						<div className="p-col-12 p-text-center p-mt-4">
							<div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
								<Button
									label={team ? 'Save' : t('CREATE_TEAM')}
									icon={team ? 'pi pi-save' : 'pi pi-plus'}
									className="p-mr-2 p-mb-2"
									onClick={handleSubmit}
									loading={isLoading}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Dialog>
	);
};

export default TeamDialog;
