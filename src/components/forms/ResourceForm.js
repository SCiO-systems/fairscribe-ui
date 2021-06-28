import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PickList } from 'primereact/picklist';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext, UserContext } from '../../store';

const resourceTypes = [{ label: 'Dataset', value: 'dataset' }];

const ResourceForm = ({ setTaskFormOpen, resource }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState((resource && resource.title) || '');
  const [description, setDescription] = useState(
    (resource && resource.description) || ''
  );
  const [type, setType] = useState('');
  const {
    firstname,
    lastname,
    email,
    currentlyViewingTeam,
    id: userId,
  } = useContext(UserContext);
  const { setWarn } = useContext(ToastContext);
  const [authoringTeamMembers, setAuthoringTeamMembers] = useState([]);
  const [selectedAuthoringTeamMembers, setSelectedAuthoringTeamMembers] =
    useState([]);
  const [reviewTeamMembers, setReviewTeamMembers] = useState([]);
  const [selectedReviewTeamMembers, setSelectedReviewTeamMembers] = useState(
    []
  );

  useEffect(() => {
    const loggedInUser = { firstname, lastname, email, id: userId };
    setAuthoringTeamMembers(currentlyViewingTeam.users);
    setReviewTeamMembers(currentlyViewingTeam.users);
    setSelectedAuthoringTeamMembers([loggedInUser]);
    setSelectedReviewTeamMembers([currentlyViewingTeam.owner]);
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
              onChange={(e) => setTitle(e.value)}
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
              onChange={(e) => setDescription(e.value)}
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
              onClick={() => setTaskFormOpen(false)}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceForm;
