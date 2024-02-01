import { TabPanel, TabView } from 'primereact/tabview';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { ResourceForm, CollectionsTable, ResourcesTable } from './components';
import TeamsService from '../../services/teamsService';
import { UserContext } from '../../store';

const findIndexForTab = (tab) => {
	switch (tab) {
	case 'collections':
		return 0;
	case 'resources':
		return 1;
	case 'tasks':
		return 2;
	case 'reviews':
		return 3;
	case 'publish':
		return 4;
	default:
		return 0;
	}
};

const MyTeams = () => {
	const { setUser, currentlyViewingTeam } = useContext(UserContext);
	const { id } = useParams();
	const { t } = useTranslation();
	const [team, setTeam] = useState({});
	const [activeIndex, setActiveIndex] = useState(0);
	const { search } = useLocation();

	const loadTeam = useCallback(() => {
		TeamsService.getSingleTeam(id)
			.then((res) => {
				setTeam(res.data);
				setUser({ currentlyViewingTeam: res.data });
			});
	}, [id, setUser]);

	// when mounted
	useEffect(() => {
		const tab = new URLSearchParams(search).get('tab');
		if (tab) {
			setActiveIndex(findIndexForTab(tab));
		}
		TeamsService.getSingleTeam(id)
			.then((res) => {
				setTeam(res.data);
				setUser({ currentlyViewingTeam: res.data });
			});
		return () => {
			setUser({ currentlyViewingTeam: null });
		};
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	if (currentlyViewingTeam === null) {
	// 		loadTeam();
	// 	}
	// }, [currentlyViewingTeam, loadTeam]);

	// useEffect(() => {
	// 	if (activeIndex !== 2 && taskFormOpen) {
	// 		setTaskFormOpen(false);
	// 	}
	// }, [activeIndex, taskFormOpen]);

	return (
		<div className="layout-dashboard">
			<div className="p-grid">
				<div className="p-col-12 p-pb-0">
					<h1 className="p-mb-0">{team?.name || 'Team'}</h1>
				</div>
				<div className="p-col-12">
					<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
						<TabPanel header="Collections">
							<CollectionsTable team={team} />
						</TabPanel>
						<TabPanel header="My Tasks">
							<ResourcesTable
								team={id}
								type="tasks"
								title={t('RESOURCES_UNDER_PREPARATION')}
							/>
						</TabPanel>
						<TabPanel header="My Reviews">
							<ResourcesTable team={id} type="reviews" title={t('RESOURCES_UNDER_REVIEW')} />
						</TabPanel>
						<TabPanel header="Publish">
							<ResourcesTable team={id} type="unpublished" title={t('UNPUBLISHED_RESOURCES')} />
						</TabPanel>
						<TabPanel header={t('PUBLISHED_RESOURCES')}>
							<ResourcesTable team={id} type="resources" title={t('PUBLISHED_RESOURCES')} />
						</TabPanel>
					</TabView>
				</div>
			</div>
		</div>
	);
};

export default MyTeams;
