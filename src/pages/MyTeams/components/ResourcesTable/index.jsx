import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ResourcesService from '../../../../services/resourcesService';
import TeamsService from '../../../../services/teamsService';
import { useDebounce } from '../../../../utilities/hooks';
import { FairScoreMiniChart, Resource, DeleteResourceDialog, EditResourceDialog, UploadToRepoDialog, EditResourceMetadata } from './components';
import ResourceForm from '../ResourceForm';

const fairScoreTransformer = (data) => [
	{
		category: 'R',
		label: 'FAIR',
		cat: 'Reusable',
		value: data.reusable_score,
		full: 5,
	},
	{
		category: 'I',
		label: 'FAIR',
		cat: 'Interoperable',
		value: data.interoperable_score,
		full: 5,
	},
	{
		category: 'A',
		label: 'FAIR',
		cat: 'Accessible',
		value: data.accessible_score,
		full: 5,
	},
	{
		category: 'F',
		label: 'FAIR',
		cat: 'Findable',
		value: data.findable_score,
		full: 5,
	},
];

const deletableStatuses = ['under_preparation', 'under_review', 'draft'];

const ResourcesTable = ({ type, title, team: teamId, collectionId }) => {
	const { t } = useTranslation();

	const navigate = useNavigate();
	const [globalFilter, setGlobalFilter] = useState('');
	const debouncedGlobalFilter = useDebounce(globalFilter, 300);
	const [uploadToRepoDialogOpen, setUploadToRepoDialog] = useState(false);
	const [deleteResourceDialogOpen, setDeleteResourceDialogOpen] = useState(false);
	const [editResourceDialogOpen, setEditResourceDialogOpen] = useState(false);
	const [selectedResource, setSelectedResource] = useState(null);
	const [data, setData] = useState([]);
	const [resourceDialog, setResourceDialog] = useState(false);
	const [resourceDialogContent, setResourceDialogContent] = useState(null);
	const [taskFormOpen, setTaskFormOpen] = useState(false);
	const [updateData, setUpdateData] = useState(0);
	const [editResourceMetadataDialog, setEditResourceMetadataDialog] = useState(false);
	const [changeStatusDialog, setChangeStatusDialog] = useState(false);
	const dt = useRef(null);

	let status = '';
	switch (type) {
	case 'tasks':
		status = 'under_preparation';
		break;
	case 'reviews':
		status = 'under_review';
		break;
	case 'unpublished':
		status = 'approved';
		break;
	case 'resources':
	case undefined:
	default:
		status = 'published';
	}

	// useEffect(() => {
	// 	onFilter();
	// }, [debouncedGlobalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(
		() => {
			if (collectionId) {
				ResourcesService.getTeamCollectionResources(teamId, collectionId, 'published')
					.then((res) => {
						setData(res);
					});
			} else {
				TeamsService.getResources(teamId, status)
					.then((res) => {
						setData(res);
					});
			}
		}, [teamId, collectionId, updateData]
	);
	//
	// const { data, isLoading, isFetching } = useQuery(['resources', teamId, status], () => {
	// 	if (collectionId) {
	// 		return ResourcesService.getTeamCollectionResources(teamId, collectionId, 'published');
	// 	}
	// 	return TeamsService.getResources(teamId, status);
	// });

	const queryClient = useQueryClient();

	const onFilter = () => {
		const f = debouncedGlobalFilter.toLowerCase();
		if (f === '') {
			queryClient.invalidateQueries(['resources', teamId, status]);
			return;
		}
		data.data.filter((r) => {
			const searchable = r.title.toLowerCase();
			return searchable.includes(f.toLowerCase());
		});
	};

	const tableHeader = (
		<div className="p-d-flex p-flex-row p-jc-between p-ai-center">
			<h4 className="p-my-0 p-text-uppercase">{title}</h4>
			<div className="p-d-flex p-flex-row p-ai-center">
				<span className="p-input-icon-left p-mr-3">
					<i className="pi pi-search" />
					<InputText
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						placeholder={t('SEARCH_FOR_RESOURCES')}
					/>
				</span>
				{type === 'tasks' && (
					<Button
						onClick={() => setTaskFormOpen(true)}
						label={t('CREATE_NEW_TASK')}
						icon="pi pi-plus"
					/>
				)}
			</div>
		</div>
	);

	const titleTemplate = ({ title: resourceTitle }) => <strong>{resourceTitle || 'N/A'}</strong>;

	const collectionsTemplate = ({ collections_count: count }) => (
		<span>{t('IN_X_COLLECTIONS', { count })}</span>
	);

	// TODO: Bring that back if you need an extra column to display PII statuses
	// const piiStatusTemplate = ({ pii_check: piiCheck }) => <PIIStatusTemplate status={piiCheck} />;

	const fairScoringTemplate = (rowData) => {
		return (
			<div>
				<FairScoreMiniChart resourceId={rowData?.id} data={fairScoreTransformer(rowData)} />
			</div>
		);
	};

	const formatDate = (rowData) => {
		const d = new Date(rowData.created_at);
		return `${d.getDate()}/${d.getUTCMonth() + 1}/${d.getFullYear()}`;
	};

	const resourceLink = (tId, resourceId, mode) =>
		`/teams/${tId}/resources/${resourceId}/mode/${mode}`;

	const actionsTemplate = (rowData) => (
		<div className="p-text-right">
			{rowData.status === 'approved' && (
				<Button
					icon="pi pi-upload"
					className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
					onClick={() => {
						setSelectedResource(rowData);
						setUploadToRepoDialog(true);
					}}
				/>
			)}
			{rowData?.status === 'under_preparation' && (
				<>
					<Button
						title="Edit resource"
						icon="pi pi-pencil"
						onClick={() => navigate(resourceLink(teamId, rowData.id, 'edit'))}
						className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
					/>
					{/* <Button */}
					{/*	title="Edit metadata" */}
					{/*	// icon="pi pi-pencil" */}
					{/*	onClick={() => { */}
					{/*		setSelectedResource(rowData); */}
					{/*		setEditResourceMetadataDialog(true); */}
					{/*	}} */}
					{/*	className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2" */}
					{/* /> */}
				</>
			)}
			{rowData?.status === 'published' && (
				<Button
					title="Update resource"
					icon="pi pi-pencil"
					onClick={() => {
						setSelectedResource(rowData);
						setEditResourceDialogOpen(true);
					}}
					className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
				/>
			)}
			{(rowData?.status === 'published' || rowData.status === 'approved') && (
				<Button
					title="View resource"
					icon="pi pi-eye"
					onClick={() => navigate(resourceLink(teamId, rowData.id, 'view'))}
					// onClick={() => {
					// 	setResourceDialog(true);
					// 	setResourceDialogContent(<Resource
					// 		teamId={teamId}
					// 		resourceId={rowData.id}
					// 		mode="view"
					// 	/>);
					// }}
					className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2 p-mb-2"
				/>
			)}
			{(rowData.status === 'approved') && (
				<Button
					title="View resource"
					icon="pi pi-pencil"
					onClick={() => {
						setSelectedResource(rowData);
						setChangeStatusDialog(true);
					}}
					className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2 p-mb-2"
				/>
			)}
			{rowData?.status === 'under_review' && (
				<Button
					title="Review resource"
					icon="pi pi-eye"
					onClick={() => navigate(resourceLink(teamId, rowData.id, 'review'))}
					// onClick={() => {
					// 	setResourceDialog(true);
					// 	setResourceDialogContent(<Resource
					// 		teamId={teamId}
					// 		resourceId={rowData.id}
					// 		mode="review"
					// 	/>);
					// }}
					className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2 p-mb-2"
				/>
			)}
			{deletableStatuses?.includes(rowData?.status) && (
				<Button
					title="Delete resource"
					icon="pi pi-trash"
					onClick={() => {
						setSelectedResource(rowData);
						setDeleteResourceDialogOpen(true);
					}}
					className="p-button-icon-only p-button-rounded p-button-danger p-mr-2 p-mb-2"
				/>
			)}
		</div>
	);

	const changeStatusDialogFooter = () => {
		return (
			<div>
				<Button
					label="Edit"
					onClick={() => {
						ResourcesService.updateResourceStatus(teamId, selectedResource.id, 'under_preparation');
						setChangeStatusDialog(false);
					}}
				/>
				<Button label="Cancel" onClick={() => setChangeStatusDialog(false)} />
			</div>
		);
	};

	if (taskFormOpen) {
		return <ResourceForm setTaskFormOpen={setTaskFormOpen} setUpdateData={setUpdateData} />;
	}

	return (
		<>
			<DataTable
				header={tableHeader}
				paginator
				rows={5}
				rowsPerPageOptions={[5, 10]}
				emptyMessage="No resources were found."
				value={data?.data || []}
				className="p-mt-2"
				ref={dt}
			>
				<Column sortable field="created_at" header={t('ISSUE_DATE')} body={formatDate} />
				<Column sortable field="title" body={titleTemplate} header={t('TITLE')} />
				<Column sortable field="type" header={t('TYPE')} />
				<Column sortable field="subtype" header={t('SUBTYPE')} />
				<Column sortable field="collections" body={collectionsTemplate} header={t('COLLECTIONS')} />
				<Column sortable field="fairScore" body={fairScoringTemplate} header={t('FAIR_SCORING')} />
				<Column
					body={actionsTemplate}
				/>
			</DataTable>
			<UploadToRepoDialog
				dialogOpen={uploadToRepoDialogOpen}
				setDialogOpen={setUploadToRepoDialog}
				resource={selectedResource}
				teamId={teamId}
				onFilter={onFilter}
			/>
			<DeleteResourceDialog
				dialogOpen={deleteResourceDialogOpen}
				setDialogOpen={setDeleteResourceDialogOpen}
				resource={selectedResource}
				teamId={teamId}
				onSuccess={() => {
					setUpdateData((prev) => prev + 1);
					// queryClient.invalidateQueries(['resources', teamId, status]);
				}}
			/>
			<EditResourceDialog
				dialogOpen={editResourceDialogOpen}
				setDialogOpen={setEditResourceDialogOpen}
				resource={selectedResource}
				teamId={teamId}
			/>
			<Dialog header="Resource" visible={resourceDialog} style={{ width: '90vw' }} onHide={() => setResourceDialog(false)}>
				{resourceDialogContent}
			</Dialog>
			<EditResourceMetadata
				editResourceMetadataDialog={editResourceMetadataDialog}
				setEditResourceMetadataDialog={setEditResourceMetadataDialog}
				selectedResource={selectedResource}
				teamId={teamId}
			/>
			<Dialog header="Are you sure you want to edit this resource?" visible={changeStatusDialog} footer={changeStatusDialogFooter} style={{ width: '50vw' }} onHide={() => setChangeStatusDialog(false)}>
				<p>
					This will move the resource to the Tasks Tab
				</p>
			</Dialog>
		</>
	);
};

export default ResourcesTable;
