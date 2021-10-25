/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { autocompleteTerm } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';
import OrgsPersonsEntities, { SCHEME_ROR } from './OrgPersonEntities';
import ProjectsList from './ProjectsList';

const OtherResourceInformation = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);

  const [authors, setAuthors] = useState(initialData?.authors || []);
  const [projects, setProjects] = useState(initialData?.projects || []);
  const [fundingOrganizations, setFundingOrganizations] = useState(
    initialData?.funding_organisations || []
  );
  const [contactPoints, setContactPoints] = useState(initialData?.contact_points || []);
  const [fundingOrgSuggestions, setFundingOrgSuggestions] = useState([]);
  const [fundingOrgData, setFundingOrgData] = useState(null);

  const triggerFundingOrgAutocomplete = async ({ query }) => {
    try {
      const results = await autocompleteTerm('funders', query);
      setFundingOrgData(null);
      if (results.length > 0) {
        setFundingOrgSuggestions(results);
      } else {
        setFundingOrgSuggestions([]);
      }
    } catch (error) {
      setError(handleError(error));
    }
  };

  const onSelectFundingOrg = async (e) => setFundingOrgData(e?.value);
  const fundingOrgItemTemplate = (item) => item?.full_name;

  useEffect(() => {
    setter(authors, projects, fundingOrganizations, contactPoints);
  }, [authors, projects, fundingOrganizations, contactPoints]);

  return (
    <Fieldset legend={t('OTHER_RESOURCE_INFORMATION')} className="p-mb-4">
      <OrgsPersonsEntities
        mode={mode}
        title={t('AUTHORS')}
        entries={authors}
        setEntries={setAuthors}
        className="p-mb-5"
      />
      <OrgsPersonsEntities
        mode={mode}
        initialFullName={fundingOrgData?.full_name}
        initialShortName={fundingOrgData?.short_name}
        initialId={fundingOrgData?.agent_ids[0]?.value}
        initialEmail={fundingOrgData?.email}
        initialUrl={fundingOrgData?.url}
        title={t('FUNDING_ORGS')}
        entries={fundingOrganizations}
        setEntries={setFundingOrganizations}
        defaultScheme={SCHEME_ROR}
        onAutoComplete={triggerFundingOrgAutocomplete}
        onSelectAutoComplete={onSelectFundingOrg}
        suggestions={fundingOrgSuggestions}
        itemTemplate={fundingOrgItemTemplate}
        className="p-mb-5"
      />
      <OrgsPersonsEntities
        mode={mode}
        title={t('CONTACT_POINTS')}
        entries={contactPoints}
        setEntries={setContactPoints}
      />
      <ProjectsList
        mode={mode}
        title={t('CRPS_PLATFORMS_INITIATIVES')}
        projectEntries={projects}
        setProjectEntries={setProjects}
      />
    </Fieldset>
  );
};

export default OtherResourceInformation;
