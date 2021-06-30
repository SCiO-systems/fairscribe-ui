import { TabPanel, TabView } from 'primereact/tabview';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import ResourceForm from '../components/forms/ResourceForm';
import Loading from '../components/Loading';
import CollectionsTable from '../components/tables/CollectionsTable';
import ResourcesTable from '../components/tables/ResourcesTable';
import { UserContext } from '../store';
import { getSingleTeam } from '../services/teams';

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

const Team = () => {
  const { setUser, currentlyViewingTeam } = useContext(UserContext);
  const { id } = useParams();
  const { t } = useTranslation();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const { search } = useLocation();

  const loadTeam = useCallback(async () => {
    setLoading(true);
    const teamRes = await getSingleTeam(id);
    setTeam(teamRes.data);
    setUser({ currentlyViewingTeam: teamRes.data });
    setLoading(false);
  }, [id, setUser]);

  // when mounted
  useEffect(() => {
    const tab = new URLSearchParams(search).get('tab');
    if (tab) {
      setActiveIndex(findIndexForTab(tab));
    }
    loadTeam();
    return () => {
      setUser({ currentlyViewingTeam: null });
    };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentlyViewingTeam === null) {
      loadTeam();
    }
  }, [currentlyViewingTeam, loadTeam]);

  useEffect(() => {
    if (activeIndex !== 2 && taskFormOpen) {
      setTaskFormOpen(false);
    }
  }, [activeIndex, taskFormOpen]);

  if (loading || team === null) {
    return <Loading />;
  }

  return (
    <div className="layout-dashboard">
      <div className="p-grid">
        <div className="p-col-12 p-pb-0">
          <h1 className="p-mb-0">{team && team.name}</h1>
        </div>
        <div className="p-col-12">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Collections">
              <CollectionsTable team={team} />
            </TabPanel>
            <TabPanel header="Resources">
              <ResourcesTable
                team={id}
                type="resources"
                title={t('PUBLISHED_RESOURCES')}
              />
            </TabPanel>
            <TabPanel header="My Tasks">
              {taskFormOpen ? (
                <ResourceForm setTaskFormOpen={setTaskFormOpen} />
              ) : (
                <ResourcesTable
                  team={id}
                  setTaskFormOpen={setTaskFormOpen}
                  type="tasks"
                  title={t('RESOURCES_UNDER_PREPARATION')}
                />
              )}
            </TabPanel>
            <TabPanel header="My Reviews">
              <ResourcesTable
                team={id}
                type="reviews"
                title={t('RESOURCES_UNDER_REVIEW')}
              />
            </TabPanel>
            <TabPanel header="Publish">
              <ResourcesTable
                team={id}
                type="unpublished"
                title={t('UNPUBLISHED_RESOURCES')}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Team;
