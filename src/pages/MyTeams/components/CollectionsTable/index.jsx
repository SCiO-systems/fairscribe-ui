import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionService from '../../../../services/collectionsService';
import { UserContext } from '../../../../store';
import { CurrentCollectionDialog, DeleteCollectionDialog } from './components';
import ResourcesTable from '../ResourcesTable';

const CollectionsTable = ({ team }) => {
	const { t } = useTranslation();
	const { ownTeams } = useContext(UserContext);
	const [globalFilter, setGlobalFilter] = useState('');
	const [helpDialog, setHelpDialog] = useState({ isOpen: false, description: null });
	const [collections, setCollections] = useState([]);
	const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false);
	const [deleteCollectionDialogOpen, setDeleteCollectionDialogOpen] = useState(false);
	const [editCollectionDialogOpen, setEditCollectionDialogOpen] = useState(false);
	const [selectedCollection, setSelectedCollection] = useState(null);
	const [expandedRows, setExpandedRows] = useState(null);
	const dt = useRef(null);

	// The user owns this team.
	const ownedTeam = ownTeams.filter(({ id }) => id === team.id).length === 1;

	const updateCollections = () => {
		CollectionService.getTeamCollections(team.id, 1)
			.then((res) => {
				setCollections(res.data);
			})
			.catch((e) => {
				setCollections([]);
				// TODO: Handle the exception here.
				console.error(e); // eslint-disable-line
			});
	};

	useEffect(() => {
		if (team.id) {
			updateCollections();
		}
	}, [team]); // eslint-disable-line react-hooks/exhaustive-deps

	const rowExpansionTemplate = (teamId, collectionId) => (
		<ResourcesTable team={teamId} collectionId={collectionId} />
	);

	const toggleExpandRow = (id) => {
		const exp = expandedRows == null ? [] : [...expandedRows];
		if (exp[id]) {
			delete exp[id];
		} else {
			exp[id] = true;
		}
		setExpandedRows(exp);
	};

	const tableHeader = (
		<div className="p-d-flex p-flex-row p-jc-between p-ai-center">
			<h4 className="p-my-0 p-text-uppercase">{t('TEAM_COLLECTIONS')}</h4>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="p-mr-3"
					placeholder={t('SEARCH_FOR_COLLECTIONS')}
				/>
				<Button
					onClick={() => setNewCollectionDialogOpen(true)}
					label={t('CREATE_NEW_COLLECTION')}
					icon="pi pi-plus"
				/>
			</span>
		</div>
	);

	const titleTemplate = (rowData) => (
		<>
			<strong>{rowData.title}</strong>
			<Button
				onClick={() => setHelpDialog({
					isOpen: !helpDialog.isOpen,
					description: rowData.description,
				})}
				icon="pi pi-question-circle"
				style={{ padding: 0, marginBottom: 0, height: '20px', width: '20px' }}
				className="p-ml-2 p-button-rounded p-button-lg p-button-text p-button-secondary"
			/>
		</>
	);

	const resourcesTemplate = (rowData) => (
		<span>
			<strong>{`${rowData.resources_count}`}</strong>
			<br />
			{t('RESOURCES')}
		</span>
	);

	const averageScoringTemplate = (rowData) => (
		<span>
			<strong>{`${rowData.fair_scoring}`}</strong>
			<br />
			{t('AVERAGE_FAIR_SCORING')}
		</span>
	);

	const actionsTemplate = (rowData) => (
		<div className="p-d-flex p-ai-center p-jc-end p-flex-wrap">
			<Button
				icon="pi pi-pencil"
				className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
				title="Edit collection"
				onClick={() => {
					setSelectedCollection(rowData);
					setEditCollectionDialogOpen(true);
				}}
			/>
			<Button
				icon={expandedRows && expandedRows[rowData.id] ? 'pi pi-eye-slash' : 'pi pi-eye'}
				title="View collection resources"
				className="p-button-secondary p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
				onClick={() => toggleExpandRow(rowData.id)}
			/>
			{ownedTeam && (
				<Button
					icon="pi pi-trash"
					title="Delete collection"
					onClick={() => {
						setSelectedCollection(rowData);
						setDeleteCollectionDialogOpen(true);
					}}
					className="p-button-icon-only p-button-rounded p-button-danger p-mr-2 p-mb-2"
				/>
			)}
		</div>
	);

	return (
		<>
			<DataTable
				header={tableHeader}
				paginator
				rows={5}
				rowsPerPageOptions={[5, 10]}
				lazy
				dataKey="id"
				expandedRows={expandedRows}
				rowExpansionTemplate={(rowData) => rowExpansionTemplate(team.id, rowData.id)}
				emptyMessage="No collections were found."
				value={collections}
				className="p-mt-2"
				ref={dt}
			>
				<Column sortable field="title" header={t('COLLECTION_TITLE')} body={titleTemplate} />
				<Column
					sortable
					field="resources"
					header={t('COLLECTION_RESOURCES')}
					body={resourcesTemplate}
				/>
				<Column
					sortable
					field="averageScoring"
					header={t('COLLECTION_FAIR_SCORING')}
					body={averageScoringTemplate}
				/>
				<Column
					body={actionsTemplate}
				/>
			</DataTable>
			<CurrentCollectionDialog
				dialogOpen={newCollectionDialogOpen}
				setDialogOpen={setNewCollectionDialogOpen}
				team={team}
				updateCollections={updateCollections}
			/>
			<CurrentCollectionDialog
				dialogOpen={editCollectionDialogOpen}
				setDialogOpen={setEditCollectionDialogOpen}
				collection={selectedCollection}
				team={team}
				updateCollections={updateCollections}
			/>
			<DeleteCollectionDialog
				dialogOpen={deleteCollectionDialogOpen}
				setDialogOpen={setDeleteCollectionDialogOpen}
				team={team}
				collection={selectedCollection}
				updateCollections={updateCollections}
			/>
			<Dialog
				header={t('DESCRIPTION')}
				onHide={() => setHelpDialog({ isOpen: false, description: null })}
				visible={helpDialog.isOpen}
				style={{ width: '500px', maxWidth: '90%' }}
			>
				<p style={{ lineHeight: '1.75' }}>{helpDialog.description}</p>
			</Dialog>
		</>
	);
};

export default CollectionsTable;
