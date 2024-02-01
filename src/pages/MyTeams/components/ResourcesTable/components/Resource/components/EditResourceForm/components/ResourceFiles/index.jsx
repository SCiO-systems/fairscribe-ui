/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-new */
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Fieldset } from 'primereact/fieldset';
import { InputSwitch } from 'primereact/inputswitch';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import placeholderImage from '../../../../../../../../../../assets/img/placeholder.png';
import IntegrationService from '../../../../../../../../../../services/integrationService';
import ResourcesService from '../../../../../../../../../../services/resourcesService';
import { ToastContext } from '../../../../../../../../../../store';
import { handleError } from '../../../../../../../../../../utilities/errors';
import SimpleTextArea from '../SimpleTextArea';
import { DataAnnotationTemplate, PIIStatusTemplate, DataAnnotationTool } from './components';
import './styles.css';

const ResourceFiles = ({ mandatory, initialData, setter, mode, teamId, resourceId, resourceType, onSave, saveChanges }) => {
	const { t } = useTranslation();
	const { setError, setSuccess } = useContext(ToastContext);
	const thumbnailFile = useRef(null);
	const resourceFile = useRef(null);
	const [helpDialogOpen, setHelpDialogOpen] = useState(false);
	const [physicalFilesHelpDialogOpen, setPhysicalFilesHelpDialogOpen] = useState(false);
	const [resourceFiles, setResourceFiles] = useState(initialData?.resource_files || []);
	const [thumbnails, setThumbnails] = useState(initialData?.thumbnails || []);
	const [thumbnailUrl, setThumbnailUrl] = useState(placeholderImage);
	const [uploadThumbPending, setUploadThumbPending] = useState(false);
	const [uploadFilePending, setUploadFilePending] = useState(false);
	const [deleteFilePending, setDeleteFilePending] = useState(false);
	const [deleteFileId, setDeleteFileId] = useState(null);
	const [toggleAnnotationDialog, setToggleAnnotationDialog] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);

	useEffect(
		() => {
			console.log(resourceFiles);
		}, [resourceFiles]
	);

	const uploadResourceFile = (file) => {
		if (resourceFiles.find((item) => item.filename === file.name)) {
			setError('', 'A file with the same name is already uploaded');
			return;
		}
		setUploadFilePending(true);
		const formData = new FormData();
		formData.append('file', file);
		// const guidGenerator = () => {
		// 	const S4 = function () {
		// 		// eslint-disable-next-line no-bitwise
		// 		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		// 	};
		// 	return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
		// };
		const newResourceFiles = resourceFiles;
		// const newFile = {
		// 	// id: guidGenerator(),
		// 	filename: file.name,
		// 	mime_type: file.type,
		// 	data: file,
		// };
		ResourcesService.uploadFile(teamId, resourceId, formData)
			.then((data) => {
				const newFile = {
					id: data.data.id,
					filename: file.name,
					mime_type: file.type,
					data: file,
				};
				IntegrationService.getMimetype(data.data.filename)
					.then((response) => {
						console.log(newFile);
						console.log(response, data);
						newResourceFiles.push(newFile);
						setResourceFiles(newResourceFiles);
						setUploadFilePending(false);
						saveChanges(false, false);
						setSuccess('Resource File', 'Your file has been uploaded.');
						// setResourceFiles(
						// 	resourceFiles.concat({
						// 		id: data.id,
						// 		filename: data.filename,
						// 		mime_type: response.mime_type,
						// 		pii_check: data.pii_check_status,
						// 		location: [
						// 			{
						// 				url: data.url,
						// 			},
						// 		],
						// 	})
						// );
						// setUploadFilePending(false);
					})
					.catch((err) => {
						setError(handleError(err));
						setUploadFilePending(false);
					});
			})
			.catch((err) => {
				setError(handleError(err));
				setUploadFilePending(false);
			});
	};

	const deleteResourceFile = async (id) => {
		setDeleteFileId(id);
		setDeleteFilePending(true);
		ResourcesService.deleteFile(teamId, resourceId, id)
			.then((res) => {
				setSuccess('Resource File', 'The file has been deleted.');
				setResourceFiles(resourceFiles.filter((item) => item.id !== id));

				setDeleteFilePending(false);
				setDeleteFileId(null);
			})
			.catch((error) => {
				setError(handleError(error));

				setDeleteFilePending(false);
				setDeleteFileId(null);
			});
	};

	const uploadResourceThumbnail = async (thumbnail) => {
		setUploadThumbPending(true);
		const formData = new FormData();
		formData.append('file', thumbnail);
		ResourcesService.uploadThumbnail(teamId, resourceId, formData)
			.then((res) => {
				setSuccess('Resource Thumbnail', 'Your thumbnail has been uploaded.');
				setThumbnails([{ url: res.data?.url, id: res.data?.id }]);
				setThumbnailUrl(res.data?.url);
				saveChanges(false, false);
				setUploadThumbPending(false);
			})
			.catch((error) => {
				setError(handleError(error));

				setUploadThumbPending(false);
			});
	};

	const loadThumbnails = (team, resource, thumb) => {
		ResourcesService.getThumbnailURL(team, resource, thumb?.id)
			.then((res) => {
				setThumbnailUrl(res.data?.url);
			})
			.catch((error) => {
				setError(handleError(error));
				setThumbnailUrl(placeholderImage);
			});
	};

	const setLocked = async (id, locked) => {
		const f = resourceFiles.map((item) => {
			if (item.id === id) {
				return { ...item, locked };
			}
			return item;
		});
		setResourceFiles(f);
	};

	const setDescription = async (id, description) => {
		const f = resourceFiles.map((item) => {
			if (item.id === id) {
				return { ...item, description };
			}
			return item;
		});
		setResourceFiles(f);
	};

	const acceptTerms = (id) => {
		ResourcesService.acceptPIITerms(teamId, resourceId, id)
			.then((res) => {
				const f = resourceFiles.map((item) => {
					if (item.id === id) {
						return { ...item, pii_terms_accepted_at: res.data?.pii_terms_accepted_at };
					}
					return item;
				});
				setResourceFiles(f);
			})
			.catch((error) => {
				setError(handleError(error));
			});
	};

	useEffect(() => {
		if (thumbnails.length > 0) {
			loadThumbnails(teamId, resourceId, thumbnails[0]);
		}
  }, []); // eslint-disable-line

	useEffect(() => {
		setter(thumbnails, resourceFiles);
  }, [resourceFiles, thumbnails]); // eslint-disable-line

	const descriptionTemplate = ({ description }) => (
		<SimpleTextArea mode={mode} text={description} setText={setDescription} />
	);

	const piiTemplate = ({ id, pii_check: status, pii_terms_accepted_at: acceptedAt }) => (
		<PIIStatusTemplate
			status={status}
			termsAccepted={typeof acceptedAt === 'string'}
			setTermsAccepted={() => acceptTerms(id)}
			teamId={teamId}
			resourceId={resourceId}
			fileId={id}
		/>
	);

	const annotationTemplate = (rowData) => {
		if (rowData.filename) {
			return (
				<DataAnnotationTemplate
					currFilename={rowData.filename}
				/>
			);
		}
		return null;
	};

	const lockedTemplate = ({ id, locked }) => (
		<InputSwitch
			disabled={mode === 'review' || mode === 'view'}
			className="p-my-0 p-py-0"
			checked={locked || false}
			onChange={(e) => setLocked(id, e.value)}
		/>
	);
	const actionsTemplate = (rowData) => {
		const { filename } = rowData;
		let currentExtension = '';
		if (filename) {
			currentExtension = filename.split('.')?.pop();
		}
		const renderAnnotateButton = () => {
			const filenameSplit = rowData.filename.split('.fairscribe');
			if (filenameSplit.length === 1) {
				const annotation = resourceFiles.find((item) => {
					let temp = item.filename;
					if (temp) {
						temp = temp.split('.fairscribe');
						if (temp.length === 2) {
							if (temp[0] === filenameSplit[0]) {
								return true;
							}
						}
					}
					return false;
				});
				if (!annotation && ['csv', 'xls', 'xlsx'].includes(currentExtension)) {
					return (
						<Button
							label={t('ANNOTATE_DATASET')}
							onClick={() => {
								setUploadedFile(rowData);
								setToggleAnnotationDialog(true);
							}}
						/>
					);
				}
			}
			return null;
		};
		return (
			<div className="p-text-right" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px', justifyContent: 'center' }}>
				{filename ? renderAnnotateButton() : null}
				{/* {renderAnnotateButton()} */}
				<Button
					icon="pi pi-trash"
					loading={deleteFilePending && rowData.id === deleteFileId}
					className="p-button p-component p-button-danger p-button-icon-only"
					onClick={() => {
						setDeleteFileId(rowData.id);
						deleteResourceFile(rowData.id);
					}}
				/>
			</div>
		);
	};

	const filenameTemplate = (rowData) => {
		return (
			<div className="filename-template">
				<p>{rowData.filename}</p>
			</div>
		);
	};

	return (
		<Fieldset legend={t('RESOURCE_FILES')} className="p-mb-4">
			<div>
				<img src={thumbnailUrl} height="127px" className="rounded" alt="Resource Thumbnail" />
				<div className="p-formgrid p-grid">
					<div className="p-col-12 p-mt-2">
						<input
							type="file"
							className="hidden"
							id="thumbnail"
							multiple={false}
							ref={thumbnailFile}
							onChange={(e) => {
								uploadResourceThumbnail(e.target.files[0]);
								e.target.value = null;
							}}
						/>
						{mode === 'edit' && (
							<Button
								label={t('UPLOAD_THUMBNAIL')}
								icon="pi pi-image"
								loading={uploadThumbPending}
								className="p-mt-2 p-mb-2"
								onClick={() => thumbnailFile.current.click()}
							/>
						)}
					</div>
				</div>
			</div>
			<DataTable
				id="resource-files"
				header={
					<div className="p-d-flex" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<div>
							<span className="p-pr-1">{t('PHYSICAL_FILES')}</span>
							<Button
								onClick={() => setPhysicalFilesHelpDialogOpen(!physicalFilesHelpDialogOpen)}
								icon="pi pi-question-circle"
								style={{ padding: 0, marginBottom: 0, height: '20px', width: '20px' }}
								className="p-button-rounded p-button-lg p-button-text p-button-secondary"
							/>
						</div>
					</div>
				}
				emptyMessage=""
				value={resourceFiles}
				className="p-mt-4 upload-table"
				showGridlines
				resizableColumns
				columnResizeMode="expand"
			>
				<Column field="filename" header={t('FILE_NAME')} body={filenameTemplate} />
				<Column
					field="description"
					header={t('DESCRIPTION')}
					body={descriptionTemplate}
				/>
				<Column
					field="pii_check"
					header={t('PII_STATUS')}
					body={piiTemplate}
				/>
				{resourceType === 'dataset' && (
					<Column
						header={t('DATA_ANNOTATION')}
						body={annotationTemplate}
					/>
				)}
				<Column
					field="locked"
					header={
						<div className="p-d-flex">
							<span className="p-pr-1">{t('LOCKED')}</span>
							<Button
								onClick={() => setHelpDialogOpen(!helpDialogOpen)}
								icon="pi pi-question-circle"
								style={{ padding: 0, marginBottom: 0, height: '20px', width: '20px' }}
								className="p-button-rounded p-button-lg p-button-text p-button-secondary"
							/>
						</div>
					}
					body={lockedTemplate}
				/>
				{mode === 'edit' && (
					<Column
						header={t('ACTIONS')}
						body={actionsTemplate}
					/>
				)}
			</DataTable>
			<div className="p-formgrid p-grid">
				<div className="p-field p-col-12">
					<input
						className="hidden"
						type="file"
						multiple={false}
						ref={resourceFile}
						onChange={(e) => {
							uploadResourceFile(e.target.files[0]);
							e.target.value = null;
						}}
					/>
					{mode === 'edit' && (
						<Button
							label={t('UPLOAD_FILES')}
							className="p-mt-4"
							loading={uploadFilePending}
							icon="pi pi-upload"
							onClick={(e) => resourceFile.current.click()}
						/>
					)}
				</div>
			</div>
			<Dialog
				header={t('LOCKED')}
				onHide={() => setHelpDialogOpen(false)}
				visible={helpDialogOpen}
				style={{ width: '500px', maxWidth: '90%' }}
			>
				<p style={{ lineHeight: '1.75' }}>
					Resource accessible only to permitted users, due to presence of PII, for example. Access
					may be requested once resource is published to repository.
				</p>
			</Dialog>
			<Dialog
				header="Data Annotation"
				onHide={() => setToggleAnnotationDialog(false)}
				visible={toggleAnnotationDialog}
				style={{ width: '80%', height: '90%' }}
			>
				<DataAnnotationTool setResourceFiles={setResourceFiles} uploadedFile={uploadedFile} teamId={teamId} resourceId={resourceId} setToggleAnnotationDialog={setToggleAnnotationDialog} />
			</Dialog>
			<Dialog
				header={t('PHYSICAL_FILES')}
				onHide={() => setPhysicalFilesHelpDialogOpen(false)}
				visible={physicalFilesHelpDialogOpen}
				style={{ width: '900px', maxWidth: '90%' }}
			>
				<p style={{ lineHeight: '1.75' }}>
					Here you will need to upload the file you are in the process of annotating (publication,
					dataset, image or any other digital asset), and add a short but rich description of what
					the resources is about. Please follow these steps specifically for datasets:
					<ul>
						<li>
							Ensure that any personally-identifiable information (PII) is obscured or removed; then
							certify that the resource is free of PII by checking the box under “PII status”.
						</li>
						<li>
							Use the “Annotate Dataset” button to annotate data variables with labels/terms from
							standard ontologies and vocabularies (e.g., the ICASA variable list used by the crop
							modeling community).
						</li>
						<li>
							“Annotate Dataset” will take you to the VMapperPlus tool, co-developed by the
							University of Florida’s Agricultural Model Intercomparison and Improvement Project
							(AgMIP). You will need to upload the dataset to VMapperPlus.
						</li>
						<li>
							VMapper can accommodate datasets with multiple tabs. You will need to confirm “Table
							Definition” which will list all tabs. You can toggle to the correct spreadsheet (tab)
							that you want to annotate from the first VMapperPlus tab; the default is the first tab
							of the workbook (generally containing the metadata).
						</li>
						<li>
							Click on “Later” to define sheet rows. If the data structure in two tabs is replicated
							(e.g., the same data fields for different countries), you can save time by applying
							definitions from one sheet in the workbook to another by choosing “copy”.
						</li>
						<li>
							To annotate column headings (variables), right click on the column heading to “define
							column”.
						</li>
						<li>
							Choose either ICASA or ontological term annotation from the “variable type”, then
							click the “variable” field. Start typing the term to annotate (e.g., “fert” for
							“fertilizer” will bring up options to choose from. If you’re looking for ICASA
							variables but don’t find a relevant term, repeat the search in the “ontological term”
							option. We continue to improve this search feature, but you may need to try different
							terms to find the standard (e.g., you may not find “variety” as an ICASA term, but
							typing “var” will bring up various options for “cultivar”).
						</li>
						<li>
							If you are sure there is no controlled term available in either ICASA or ontologies,
							you can add a “customized variable” from the “variable type”. To do this, choose the
							appropriate “variable category”, enter a “variable code” (e.g., soil_temperature), add
							a description if possible, and choose the correct “value type”.
						</li>
						<li>
							Once you are done annotating all columns in your dataset, click on the blue “template”
							button at the top left of the tool, and choose “save template”.{' '}
							<strong>DO NOT change the file name</strong>, as the default filename is inextricably
							linked to the resource being annotated, and this link is required for the annotation
							to be complete.
						</li>
						<li>
							Go back to FAIRscribe and upload this (json) annotation file so that you will see your
							uploaded dataset and this annotation file. With a complete annotation file in place,
							you should see a green check under “data annotation” against your dataset. Remember to
							“save changes” as usual; you should see a higher interoperability score when you
							“check FAIR”.
						</li>
					</ul>
				</p>
			</Dialog>
		</Fieldset>
	);
};

export default ResourceFiles;
