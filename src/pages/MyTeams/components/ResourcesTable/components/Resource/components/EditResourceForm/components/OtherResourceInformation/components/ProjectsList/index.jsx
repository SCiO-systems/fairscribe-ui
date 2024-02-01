import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import IntegrationService from '../../../../../../../../../../../../services/integrationService';
import { ToastContext } from '../../../../../../../../../../../../store';
import { handleError } from '../../../../../../../../../../../../utilities/errors';

const ProjectsList = ({ mandatory, mode, title, projectEntries, setProjectEntries, className }) => {
	const { t } = useTranslation();
	const { setError } = useContext(ToastContext);

	const [availableProjects, setAvailableProjects] = useState([]);
	const [project, setProject] = useState('');
	const [newValueDialog, setNewValueDialog] = useState(false);

	const addProject = async (projectFullName) => {
		const selectedProject = availableProjects.filter((p) => p.full_name === projectFullName)?.pop();
		setProjectEntries(
			projectEntries
				.filter((p) => p.full_name !== projectFullName)
				.concat({
					full_name: selectedProject?.full_name || '',
					short_name: selectedProject?.short_name || '',
					url: selectedProject?.url || '',
				})
		);
	};

	const removeProject = async (projectFullName) => {
		setProjectEntries(projectEntries.filter((p) => p.full_name !== projectFullName));
	};

	const loadProjects = () => {
		IntegrationService.listProjects()
			.then((results) => {
				setAvailableProjects(results.map((p) => ({ ...p, label: p.full_name, value: p.full_name })));
			})
			.catch((e) => {
				setError(handleError(e));
			});
	};

	const getAvailableProjects = () => {
		const existingProjects = projectEntries.map((p) => p.full_name);
		return availableProjects.filter((p) => !existingProjects.includes(p.full_name));
	};

	useEffect(() => {
		loadProjects();
  }, []); // eslint-disable-line

	const projectsFooterTemplate = mode === 'edit' && (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				addProject(project);
				setProject('');
			}}
		>
			<div className="p-mt-2 p-formgrid p-grid p-fluid">
				<div className="p-col-10">
					<Dropdown
						filter
						filterBy="label"
						id="type"
						name="type"
						value={project || ''}
						options={getAvailableProjects()}
						placeholder="Choose CRP / Platform / Initiative."
						onChange={(e) => setProject(e.value)}
					/>
				</div>
				<div className="p-col-2">
					<Button label={t('ADD')} type="submit" icon="pi pi-plus" />
				</div>
			</div>
		</form>
	);

	const removeTemplate = (rowData) => (
		<div className="p-text-right">
			<Button
				className="p-button-danger"
				icon="pi pi-trash"
				onClick={() => removeProject(rowData.full_name)}
			/>
		</div>
	);

	const headerTemplate = () => {
		return (
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				{mandatory ? <p style={{ color: 'red', margin: '0' }}>{title} *</p> : <p style={{ margin: '0' }}>{title}</p>}
				{mode === 'edit' && 		(
					<Button label={t('ADD')} onClick={() => setNewValueDialog(true)} icon="pi pi-plus" />
				)
				}
			</div>
		);
	};

	const dialogFooter = () => {
		return (
			<div>
				<Button label="Cancel" onClick={() => setNewValueDialog(false)} />
				<Button
					label="Add"
					onClick={() => {
						addProject(project);
						setProject('');
						setNewValueDialog(false);
					}}
					disabled={!project}
				/>

			</div>
		);
	};

	return (
		<div className={className || 'p-mb-4'}>
			<DataTable
				header={headerTemplate}
				emptyMessage=""
				value={projectEntries}
				style={{ wordBreak: 'break-word' }}
			>
				<Column field="full_name" header={t('FULLNAME')} />
				<Column field="short_name" header={t('SHORTNAME')} />
				<Column field="url" header={t('URL')} />
				{mode === 'edit' && (
					<Column
						body={removeTemplate}
					/>
				)}
			</DataTable>
			<Dialog header={title} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div>
					<div className="p-mt-2 p-formgrid p-grid p-fluid">
						<div className="p-col-10">
							<Dropdown
								filter
								filterBy="label"
								id="type"
								name="type"
								value={project || ''}
								options={getAvailableProjects()}
								placeholder="Choose CRP / Platform / Initiative."
								onChange={(e) => setProject(e.value)}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default ProjectsList;
