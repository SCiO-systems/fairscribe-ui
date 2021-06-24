import { TabPanel, TabView } from 'primereact/tabview';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ResourceForm from '../components/forms/ResourceForm';
import Loading from '../components/Loading';
import CollectionsTable from '../components/tables/CollectionsTable';
import ResourcesTable from '../components/tables/ResourcesTable';
import { UserContext } from '../store';

// TODO: Remove this mock data
const allTeams = [
  {
    id: 1,
    name: 'EiA',
    tasks: '4',
    reviews: '13',
    uploads: '21',
    members: [
      'John Doe',
      'Anjali Gupta',
      'Alice Doe',
      'John Baraka',
      'Jane Doe',
    ],
  },
];

// TODO: Remove this mock fetch
// eslint-disable-next-line
const fetchTeam = (id) => allTeams.find((t) => t.id == id);

const Team = () => {
  const { setUser } = useContext(UserContext);
  const { id } = useParams();
  const { t } = useTranslation();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  // when mounted
  useEffect(() => {
    // Simulate API call...
    // TODO: Replace with an actual API
    setTimeout(() => {
      const response = fetchTeam(id);
      setTeam(response);
      setUser({ currentlyViewingTeam: response });
      setLoading(false);
    }, 300);
    // when component is going to be un-mounted
    return function cleanup() {
      setUser({ currentlyViewingTeam: null });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
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
                type="resources"
                title={t('PUBLISHED_RESOURCES')}
              />
            </TabPanel>
            <TabPanel header="My Tasks">
              {taskFormOpen ? (
                <ResourceForm setTaskFormOpen={setTaskFormOpen} />
              ) : (
                <ResourcesTable
                  setTaskFormOpen={setTaskFormOpen}
                  type="tasks"
                  title={t('RESOURCES_UNDER_PREPARATION')}
                />
              )}
            </TabPanel>
            <TabPanel header="My Reviews">
              <ResourcesTable
                type="reviews"
                title={t('RESOURCES_UNDER_REVIEW')}
              />
            </TabPanel>
            <TabPanel header="Publish">
              <ResourcesTable
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
