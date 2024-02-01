import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeamsService from '../../../../../../services/teamsService';
import IntegrationService from '../../../../../../services/integrationService';
import { ToastContext, UserContext } from '../../../../../../store';
import { handleError } from '../../../../../../utilities/errors';
import { EditResourceForm } from './components';
import prefilled from '../../../../../../assets/prefilled';

const Resource = (props) => {
	const { teamId, resourceId, mode } = useParams();
	// const { teamId, resourceId, mode } = props;
	const [resource, setResource] = useState(null);
	const { setError } = useContext(ToastContext);
	const { setUser, currentlyViewingTeam } = useContext(UserContext);

	// when mounted
	useEffect(() => {
		if (currentlyViewingTeam === null || currentlyViewingTeam.id !== teamId) {
			TeamsService.getSingleTeam(teamId)
				.then((teamRes) => {
					setUser({ currentlyViewingTeam: teamRes.data });
				});
		}
	}, [teamId]); // eslint-disable-line react-hooks/exhaustive-deps

	// when mounted
	useEffect(() => {
		if (resourceId) {
			TeamsService.getSingleResource(teamId, resourceId)
				.then((res) => {
					if (!res.data?.metadata_record) {
						const collections = res.data?.collections;
						const status = 'under_preparation';
						const { type, subtype } = res.data;
						const fallbackTitle = [
							{
								language: {
									name: 'English',
									label: 'English',
									value: 'English',
									iso_code_639_1: 'en',
									iso_code_639_2: 'eng',
								},
								value: res.data?.title,
							},
						];

						const fallbackDescription = [
							{
								language: {
									name: 'English',
									label: 'English',
									value: 'English',
									iso_code_639_1: 'en',
									iso_code_639_2: 'eng',
								},
								value: res.data?.description,
							},
						];
						const metadataRecord = {};
						const record = {
							title: fallbackTitle,
							description: fallbackDescription,
							...metadataRecord,
							dataCORE_version: '1.0',
							dataNODE_id: '',
							providers: [],
							sources: [],
							resource_type: { type, subtype },
						};
						setResource({
							collections: collections.map(({ id }) => id),
							status,
							metadata_record: record,
						});
					} else {
						setResource(res.data);
					}
				})
				.catch((error) => {
					setError(handleError(error));
				});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (
		resource === null ||
    currentlyViewingTeam === null ||
    (currentlyViewingTeam && currentlyViewingTeam.id !== parseInt(teamId, 10))
	) {
		return null;
	}

	return (
		<div className="edit-resource-form">
			<EditResourceForm resource={resource} teamId={teamId} mode={mode} />
		</div>
	);
};

export default Resource;
