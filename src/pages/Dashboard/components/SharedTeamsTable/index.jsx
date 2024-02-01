import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TeamsService from '../../../../services/teamsService';
import { UserContext } from '../../../../store';

const SharedTeamsTable = ({
	teamDialogOpen,
	setTeamDialogOpen,
	setViewTeam,
	setInviteMembersDialogOpen,
}) => {
	const { t } = useTranslation();
	const [globalFilter, setGlobalFilter] = useState('');
	const [sharedTeams, setSharedTeams] = useState([]);
	const { sharedTeams: sharedTeamsContext, isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		TeamsService.getSharedTeams(1)
	// 			.then((res) => {
	// 				setSharedTeams(res.data);
	// 			});
	// 	}
	// }, [sharedTeamsContext]); // eslint-disable-line react-hooks/exhaustive-deps

	const tableHeader = (
		<div className="p-d-flex p-flex-row p-jc-between p-ai-center">
			<h4 className="p-my-0">{t('SHARED_TEAMS')}</h4>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					value={globalFilter}
					className="p-mr-3"
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder={t('SEARCH_FOR_TEAMS')}
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

	const detailsTemplate = (rowData) => (
		<div className="p-d-flex p-flex-row p-ai-center p-jc-end p-flex-wrap">
			<Button
				label={t('VIEW_DETAILS')}
				icon="pi pi-eye"
				onClick={() => navigate(`/teams/${rowData.id}`)}
				className="p-button-secondary p-mb-1"
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
			value={sharedTeamsContext}
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
				body={detailsTemplate}
			/>
		</DataTable>
	);
};

export default SharedTeamsTable;
