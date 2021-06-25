import { TabPanel, TabView } from 'primereact/tabview';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResourceForm from '../components/forms/ResourceForm';
import Loading from '../components/Loading';
import EditResourceForm from '../components/forms/EditResourceForm';

const Resource = () => {
  const { teamId, resourceId, mode } = useParams();
  const [loading, setLoading] = useState(true);

  // when mounted
  useEffect(() => {
    console.log(teamId, resourceId, mode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  }

  return <EditResourceForm />;
};

export default Resource;
