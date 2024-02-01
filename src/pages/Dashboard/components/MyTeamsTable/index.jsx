import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TeamsService from '../../../../services/teamsService';
import { UserContext } from '../../../../store';

const MyTeamsTable = ({
	teamDialogOpen,
	setTeamDialogOpen,
	setViewTeam,
	setInviteMembersDialogOpen,
	deleteTeamDialogOpen,
	setDeleteTeamDialogOpen,
	setMyTeams,
	myTeams,
}) => {
	const { t } = useTranslation();
	const [globalFilter, setGlobalFilter] = useState('');
	// const [myTeams, setMyTeams] = useState([]);
	const { id: userId, setUser, ownTeams } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(
		() => {
			TeamsService.getAllOwnedTeams(userId)
				.then((res) => {
					TeamsService.getAllSharedTeams()
						.then((sharedTeamsRes) => {
							setUser({
								ownTeams: res.data,
								sharedTeams: sharedTeamsRes.data,
							});
						})
						.catch((e) => {
							if (e.response) {
								// setError('Oops!', e.response.data.error);
							}
						});
				})
				.catch((e) => {
					if (e.response) {
						// setError('Oops!', e.response.data.error);
					}
				});
		}, []
	);

	const tableHeader = (
		<div className="p-d-flex p-flex-row p-jc-between p-ai-center">
			<h4 className="p-my-0">{t('MY_TEAMS')}</h4>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					value={globalFilter}
					className="p-mr-3"
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder={t('SEARCH_FOR_TEAMS')}
				/>
				<Button
					label={t('CREATE_TEAM')}
					icon="pi pi-plus-circle"
					onClick={() => {
						setViewTeam(null);
						setTeamDialogOpen(true);
					}}
				/>
			</span>
		</div>
	);

	const nameTemplate = (rowData) => <h5>{rowData.name}</h5>;

	const tasksTemplate = (rowData) => (
		<span>
			<strong>{rowData.active_tasks}</strong>
			<br />
			{t('ACTIVE_TASKS')}
		</span>
	);

	const reviewsTemplate = (rowData) => (
		<span>
			<strong>{rowData.pending_review_tasks}</strong>
			<br />
			{t('PENDING_REVIEWS')}
		</span>
	);

	const uploadsTemplate = (rowData) => (
		<span>
			<strong>{rowData.pending_upload_tasks}</strong>
			<br />
			{t('PENDING_UPLOADS')}
		</span>
	);

	const actionsTemplate = ({ id, name, description }) => (
		<div className="p-d-flex p-flex-row p-ai-center p-jc-end p-flex-wrap">
			<Button
				onClick={() => {
					setViewTeam({ id, name, description });
					setInviteMembersDialogOpen(true);
				}}
				icon="pi pi-user-plus"
				className="p-button-icon-only p-button-rounded p-mb-2 p-mr-2"
			/>
			<Button
				icon="pi pi-pencil"
				onClick={() => {
					setViewTeam({ id, name, description });
					setTeamDialogOpen(true);
				}}
				className="p-button-icon-only p-button-rounded p-mb-2 p-mr-2"
			/>
			<Button
				icon="pi pi-eye"
				onClick={() => navigate(`/teams/${id}`)}
				className="p-button-icon-only p-button-rounded p-button-secondary p-mb-2 p-mr-2"
			/>
			<Button
				icon="pi pi-trash"
				onClick={() => {
					setViewTeam({ id, name, description });
					setDeleteTeamDialogOpen(true);
				}}
				className="p-button-icon-only p-button-rounded p-button-danger p-mb-2 p-mr-2"
			/>
		</div>
	);

	return (
		<DataTable
			header={tableHeader}
			paginator
			rows={5}
			rowsPerPageOptions={[5, 10]}
			emptyMessage="No teams were found."
			value={ownTeams}
			className="p-mt-2"
		>
			<Column field="name" header={t('NAME')} body={nameTemplate} />
			<Column field="tasks" header={t('ACTIVE_TASKS')} body={tasksTemplate} />
			<Column
				field="reviews"
				header={t('PENDING_REVIEWS')}
				body={reviewsTemplate}
			/>
			<Column
				field="uploads"
				header={t('PENDING_UPLOADS')}
				body={uploadsTemplate}
			/>
			<Column
				body={actionsTemplate}
			/>
		</DataTable>
	);
};

export default MyTeamsTable;
