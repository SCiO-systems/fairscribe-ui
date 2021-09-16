import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PickList } from 'primereact/picklist';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getResourceTypes } from '../../services/resources';
import { createResource } from '../../services/teams';
import { ToastContext, UserContext } from '../../store';
import { handleError } from '../../utilities/errors';

const ResourceForm = ({ setTaskFormOpen, resource }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [resourceTypes, setResourceTypes] = useState([]);
  const {
    firstname,
    lastname,
    email,
    currentlyViewingTeam,
    id: userId,
  } = useContext(UserContext);
  const { setWarn, setError, setSuccess } = useContext(ToastContext);
  const [authoringTeamMembers, setAuthoringTeamMembers] = useState([]);
  const [selectedAuthoringTeamMembers, setSelectedAuthoringTeamMembers] =
    useState([]);
  const [reviewTeamMembers, setReviewTeamMembers] = useState([]);
  const [selectedReviewTeamMembers, setSelectedReviewTeamMembers] = useState(
    []
  );

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      type,
      authoring_team: selectedAuthoringTeamMembers.map((m) => m.id),
      review_team: selectedReviewTeamMembers.map((m) => m.id),
    };
    try {
      await createResource(currentlyViewingTeam.id, payload);
      setSuccess('Done!', 'Your task has been created.');
      setTaskFormOpen(false);
    } catch (e) {
      setError(handleError(e));
    }
  };

  const loadResourceTypes = async () => {
    const response = await getResourceTypes();
    return response.data.map((rt) => ({ label: rt.name, value: rt.value }));
  };

  useEffect(() => {
    const loggedInUser = { firstname, lastname, email, id: userId };
    setAuthoringTeamMembers(currentlyViewingTeam.users);
    setReviewTeamMembers(currentlyViewingTeam.users);
    setSelectedAuthoringTeamMembers([loggedInUser]);
    setSelectedReviewTeamMembers([currentlyViewingTeam.owner]);
    loadResourceTypes().then((rt) => setResourceTypes(rt));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onAuthoringTeamChange = ({ source, target }) => {
    if (source.find((u) => u.id === userId)) {
      // the creator of the task is always in the authoring team
      setWarn('Warning!', t('AUTHORING_TASK_OWNER_WARNING'));
      return;
    }
    setAuthoringTeamMembers(source);
    setSelectedAuthoringTeamMembers(target);
  };

  const onReviewTeamChange = ({ source, target }) => {
    if (source.find((u) => u.id === userId)) {
      // the team owner is always in the review team
      setWarn('Warning!', t('REVIEW_TEAM_OWNER_WARNING'));
      return;
    }
    setReviewTeamMembers(source);
    setSelectedReviewTeamMembers(target);
  };

  return (
    <Fieldset className="p-my-2 p-col-8" legend={t('NEW_RESOURCE')}>
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-12">
          <div className="p-field">
            <label htmlFor="resource-title">
              {t('RESOURCE_TITLE')} (in English)
            </label>
            <InputText
              id="resource-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-12">
          <div className="p-field">
            <label htmlFor="resource-description">
              {t('RESOURCE_DESCRIPTION')} (in English)
            </label>
            <InputTextarea
              id="resource-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-12">
          <div className="p-field">
            <label htmlFor="resource-type">{t('RESOURCE_TYPE')}</label>
            <Dropdown
              id="resource-type"
              value={type}
              options={resourceTypes}
              placeholder={t('RESOURCE_TYPE')}
              onChange={(e) => setType(e.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-12">
          <div className="p-field">
            <label htmlFor="authoring-team">
              {t('RESOURCE_METADATA_AUTHORING_TEAM')}
            </label>
            <PickList
              id="authoring-team"
              source={authoringTeamMembers}
              target={selectedAuthoringTeamMembers}
              itemTemplate={(item) => `${item.firstname} ${item.lastname}`}
              onChange={onAuthoringTeamChange}
              showSourceControls={false}
              showTargetControls={false}
              sourceHeader={t('TEAM_MEMBERS')}
              targetHeader={t('RESOURCE_METADATA_AUTHORING_TEAM')}
            />
          </div>
        </div>
      </div>
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-12">
          <div className="p-field">
            <label htmlFor="review-team">
              {t('RESOURCE_METADATA_REVIEW_TEAM')}
            </label>
            <PickList
              id="review-team"
              source={reviewTeamMembers}
              target={selectedReviewTeamMembers}
              itemTemplate={(item) => `${item.firstname} ${item.lastname}`}
              onChange={onReviewTeamChange}
              showSourceControls={false}
              showTargetControls={false}
              sourceHeader={t('TEAM_MEMBERS')}
              targetHeader={t('RESOURCE_METADATA_REVIEW_TEAM')}
            />
          </div>
        </div>
      </div>
      <div className="p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-12">
          <div className="p-d-flex">
            <Button
              className="p-button-secondary p-mr-2"
              label={t('CANCEL')}
              onClick={() => setTaskFormOpen(false)}
            />
            <Button
              label={t('CREATE_TASK_AND_SEND_INVITES')}
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceForm;
