import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditResourceForm from '../components/forms/EditResourceForm';
import Loading from '../components/Loading';
import { getSingleResource } from '../services/teams';
import { ToastContext } from '../store';

const Resource = () => {
  const { teamId, resourceId, mode } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useContext(ToastContext);

  const loadResource = async (tId, rId) => {
    try {
      setLoading(true);
      const response = await getSingleResource(tId, rId);
      setResource(response.data);
    } catch (e) {
      setError('Error', 'Failed to load resource');
    } finally {
      setLoading(false);
    }
  };

  // when mounted
  useEffect(() => {
    loadResource(teamId, resourceId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  }

  return <EditResourceForm resource={resource} teamId={teamId} mode={mode} />;
};

export default Resource;
