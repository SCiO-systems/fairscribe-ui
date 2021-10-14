/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthorsTable from '../../tables/AuthorsTable';
import ContactPoints from './ContactPoints';
import FundingOrganizations from './FundingOrganizations';

const OtherResourceInformation = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [authors, setAuthors] = useState(initialData.authors || []);
  const [projects, setProjects] = useState(initialData.projects || []);
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
      <AuthorsTable
        mode={mode}
        authors={authors}
        setAuthors={setAuthors}
        header={t('AUTHORS_TITLE')}
      />
      <FundingOrganizations
        mode={mode}
        fundingOrganizations={fundingOrganizations}
        setFundingOrganizations={setFundingOrganizations}
        className="p-mt-4"
      />
      <ContactPoints
        mode={mode}
        contactPoints={contactPoints}
        setContactPoints={setContactPoints}
        className="p-mt-4"
      />
    </Fieldset>
  );
};

export default OtherResourceInformation;
