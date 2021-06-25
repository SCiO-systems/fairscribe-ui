import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditResourceForm from '../components/forms/EditResourceForm';
import Loading from '../components/Loading';

const Resource = () => {
  const { teamId, resourceId, mode } = useParams();
  const [loading, setLoading] = useState(true);

  // when mounted
  useEffect(() => {
    console.log(teamId, resourceId, mode);
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  }

  return <EditResourceForm resourceId={resourceId} teamId={teamId} />;
};

export default Resource;
