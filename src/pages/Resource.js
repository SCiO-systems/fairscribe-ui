import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditResourceForm from '../components/forms/EditResourceForm';
import Loading from '../components/Loading';
import { getSingleResource, getSingleTeam } from '../services/teams';
import { ToastContext, UserContext } from '../store';
import { handleError } from '../utilities/errors';

const Resource = () => {
  const { teamId, resourceId, mode } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useContext(ToastContext);
  const { setUser, currentlyViewingTeam } = useContext(UserContext);

  const loadResource = async (tId, rId) => {
    setLoading(true);
    try {
      const { data } = await getSingleResource(tId, rId);
      setResource(data);
    } catch (e) {
      setError(handleError(e));
    }
    setLoading(false);
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
    (currentlyViewingTeam && currentlyViewingTeam.id !== parseInt(teamId, 10))
  ) {
    return <Loading />;
  }

  return <EditResourceForm resource={resource} teamId={teamId} mode={mode} />;
};

export default Resource;
