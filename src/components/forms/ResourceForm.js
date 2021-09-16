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
  const [subtype, setSubtype] = useState('');
  const [resourceTypes, setResourceTypes] = useState([]);
  const [resourceSubtypes, setResourceSubtypes] = useState([]);
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
    try {
      const { default: types } = await getResourceTypes();
      const defaultTypeValue = types[0]?.value || '';
      const defaultSubtypeValue = types[0]?.subtypes[0]?.value || '';
      setResourceTypes(types || []);
      setResourceSubtypes(types[0]?.subtypes || []);
      setType(defaultTypeValue);
      setSubtype(defaultSubtypeValue);
    } catch (e) {
      setError(handleError(e));
    }
  };

  useEffect(() => {
    const loggedInUser = { firstname, lastname, email, id: userId };
    setAuthoringTeamMembers(currentlyViewingTeam.users);
    setReviewTeamMembers(currentlyViewingTeam.users);
    setSelectedAuthoringTeamMembers([loggedInUser]);
    setSelectedReviewTeamMembers([currentlyViewingTeam.owner]);
    loadResourceTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const subtypes = resourceTypes
      .filter(({ value }) => value === type)
      ?.pop()?.subtypes;
    const defaultSubtypeValue = subtypes[0]?.value || '';
    setResourceSubtypes(subtypes || []);
    setSubtype(defaultSubtypeValue);
  }, [type]); // eslint-disable-line

  const onAuthoringTeamChange = ({ source, target }) => {
    if (source.find(({ id }) => id === userId)) {
      // the creator of the task is always in the authoring team
      setWarn('Warning!', t('AUTHORING_TASK_OWNER_WARNING'));
      return;
    }
    setAuthoringTeamMembers(source);
    setSelectedAuthoringTeamMembers(target);
  };

  const onReviewTeamChange = ({ source, target }) => {
    if (source.find(({ id }) => id === userId)) {
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
              filter
              filterBy="label"
              value={type}
              options={resourceTypes?.map(({ name, value }) => ({
                label: name,
                value,
              }))}
              placeholder={t('RESOURCE_TYPE')}
              onChange={(e) => setType(e.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="resource-subtype">{t('RESOURCE_SUBTYPE')}</label>
            <Dropdown
              id="resource-subtype"
              filter
              filterBy="label"
              value={subtype}
              options={
                resourceSubtypes?.map(({ name, value }) => ({
                  label: name,
                  value,
                })) || []
              }
              placeholder={t('RESOURCE_SUBTYPE')}
              onChange={(e) => setSubtype(e.value)}
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
              icon="pi pi-times"
              onClick={() => setTaskFormOpen(false)}
            />
            <Button
              icon="pi pi-send"
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
