import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import EditResourceForm from '../components/forms/EditResourceForm';
import Loading from '../components/Loading';
import { getSingleResource, getSingleTeam } from '../services/teams';
import { ToastContext, UserContext } from '../store';

const Resource = () => {
  const { teamId, resourceId, mode } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useContext(ToastContext);
  const { setUser, currentlyViewingTeam } = useContext(UserContext);

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

  const loadTeam = useCallback(async () => {
    if (currentlyViewingTeam === null || currentlyViewingTeam.id !== teamId) {
      setLoading(true);
      const teamRes = await getSingleTeam(teamId);
      setUser({ currentlyViewingTeam: teamRes.data });
      setLoading(false);
    }
  }, [teamId, setUser]); // eslint-disable-line react-hooks/exhaustive-deps

  // when mounted
  useEffect(() => {
    loadTeam();
  }, [teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  // when mounted
  useEffect(() => {
    loadResource(teamId, resourceId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (
    loading ||
    resource === null ||
    currentlyViewingTeam === null ||
    (currentlyViewingTeam && currentlyViewingTeam.id !== teamId)
  ) {
    return <Loading />;
  }

  return <EditResourceForm resource={resource} teamId={teamId} mode={mode} />;
};

export default Resource;
