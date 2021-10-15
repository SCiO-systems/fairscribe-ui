/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrgsPersonsEntities, { SCHEME_ROR } from './OrgPersonEntities';

const OtherResourceInformation = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [authors, setAuthors] = useState(initialData?.authors || []);
  const [projects, setProjects] = useState(initialData?.projects || []);
  const [fundingOrganizations, setFundingOrganizations] = useState(
    initialData?.funding_organisations || []
  );
  const [contactPoints, setContactPoints] = useState(initialData?.contact_points || []);

  useEffect(() => {
    setter(authors, projects, fundingOrganizations, contactPoints);
  }, [authors, projects, fundingOrganizations, contactPoints]);

  return (
    <Fieldset
      legend={t('OTHER_RESOURCE_INFORMATION')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <OrgsPersonsEntities
        mode={mode}
        title={t('AUTHORS')}
        entries={authors}
        setEntries={setAuthors}
        className="p-mb-5"
      />
      <OrgsPersonsEntities
        mode={mode}
        title={t('FUNDING_ORGS')}
        entries={fundingOrganizations}
        setEntries={setFundingOrganizations}
        defaultScheme={SCHEME_ROR}
        className="p-mb-5"
      />
      <OrgsPersonsEntities
        mode={mode}
        title={t('CONTACT_POINTS')}
        entries={contactPoints}
        setEntries={setContactPoints}
      />
    </Fieldset>
  );
};

export default OtherResourceInformation;
