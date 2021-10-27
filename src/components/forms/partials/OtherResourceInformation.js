/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { autocompleteTerm } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';
import { transformFundingOrgValue, transformOrgValue } from '../../../utilities/transformers';
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

  const triggerAutocomplete = async ({ query }, term, setSuggestions) => {
    try {
      const results = await autocompleteTerm(term, query);
      setSuggestions(results.length > 0 ? results : []);
    } catch (error) {
      setError(handleError(error));
    }
  };

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
        onAutoComplete={(e, setSuggestions) => triggerAutocomplete(e, 'ror', setSuggestions)}
        onSelectAutoComplete={(e, setAutocomplete) => setAutocomplete(transformOrgValue(e))}
        itemTemplate={(item) => item?.name}
        className="p-mb-5"
      />
      <OrgsPersonsEntities
        mode={mode}
        title={t('FUNDING_ORGS')}
        entries={fundingOrganizations}
        setEntries={setFundingOrganizations}
        defaultScheme={SCHEME_ROR}
        onAutoComplete={(e, setSuggestions) => triggerAutocomplete(e, 'funders', setSuggestions)}
        onSelectAutoComplete={(e, setAutocomplete) => setAutocomplete(transformFundingOrgValue(e))}
        itemTemplate={(item) => item?.full_name}
        className="p-mb-5"
      />
      <OrgsPersonsEntities
        mode={mode}
        title={t('CONTACT_POINTS')}
        entries={contactPoints}
        setEntries={setContactPoints}
        onAutoComplete={(e, setSuggestions) => triggerAutocomplete(e, 'ror', setSuggestions)}
        onSelectAutoComplete={(e, setAutocomplete) => setAutocomplete(transformOrgValue(e))}
        itemTemplate={(item) => item?.name}
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
