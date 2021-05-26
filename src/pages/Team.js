import { TabPanel, TabView } from 'primereact/tabview';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    members: ['John Baraka', 'Anjali Gupta'],
  },
];

// TODO: Remove this mock fetch
const fetchTeam = (id) => allTeams.find((t) => t.id == id);

const Team = () => {
  const { setData } = useContext(UserContext);
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);

  // when mounted
  useEffect(() => {
    // Simulate API call...
    // TODO: Replace with an actual API
    setTimeout(() => {
      const response = fetchTeam(id);
      setTeam(response);
      setData({ currentlyViewingTeam: response });
      setLoading(false);
    }, 300);
    // when component is going to be un-mounted
    return function cleanup() {
      setData({ currentlyViewingTeam: null });
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="layout-dashboard">
      <div className="p-grid">
        <div className="p-col-12 p-pb-0">
          <h1 className="p-mb-0">{team.name}</h1>
        </div>
        <div className="p-col-12">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Collections">
              <CollectionsTable />
            </TabPanel>
            <TabPanel header="Resources">
              <ResourcesTable />
            </TabPanel>
            <TabPanel header="My Tasks">tasks</TabPanel>
            <TabPanel header="My Reviews">reviews</TabPanel>
            <TabPanel header="Publish">publish</TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Team;
