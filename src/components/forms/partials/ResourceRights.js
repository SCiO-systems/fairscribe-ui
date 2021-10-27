/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { autocompleteTerm } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';
import { transformOrgValue } from '../../../utilities/transformers';
import LicenseWizardDialog from '../../dialogs/LicenseWizardDialog';
import SimpleTextArea from '../../fields/SimpleTextArea';
import OrgsPersonsEntities from './OrgPersonEntities';

const licenses = [
  {
    label: 'Unlicensed',
    value: '',
  },
  {
    label: 'CC0 1.0',
    value: 'CC0 1.0',
  },
  {
    label: 'CC BY 4.0',
    value: 'CC BY 4.0',
  },
  {
    label: 'CC BY-SA 4.0',
    value: 'CC BY-SA 4.0',
  },
  {
    label: 'CC BY-ND 4.0',
    value: 'CC BY-ND 4.0',
  },
  {
    label: 'CC BY-NC 4.0',
    value: 'CC BY-NC 4.0',
  },
  {
    label: 'CC BY-NC-SA 4.0',
    value: 'CC BY-NC-SA 4.0',
  },
  {
    label: 'CC BY-NC-ND 4.0',
    value: 'CC BY-NC-ND 4.0',
  },
  {
    label: 'GNU AGPLv3',
    value: 'GNU AGPLv3',
  },
  {
    label: 'GNU GPLv3',
    value: 'GNU GPLv3',
  },
  {
    label: 'GNU LGPLv3',
    value: 'GNU LGPLv3',
  },
  {
    label: 'Mozilla Public License 2.0',
    value: 'Mozilla Public License 2.0',
  },
  {
    label: 'Apache License 2.0',
    value: 'Apache License 2.0',
  },
  {
    label: 'MIT License',
    value: 'MIT License',
  },
  {
    label: 'Boost Software License 1.0',
    value: 'Boost Software License 1.0',
  },
  {
    label: 'The Unlicense',
    value: 'The Unlicense',
  },
];

const ACCESS_RIGHT_OPEN = 'Open';
const ACCESS_RIGHT_LIMITED = 'Limited';

const rights = [
  {
    label: 'Open Access',
    value: ACCESS_RIGHT_OPEN,
  },
  {
    label: 'Limited Access',
    value: ACCESS_RIGHT_LIMITED,
  },
];

const ResourceRights = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);

  const [license, setLicense] = useState(initialData?.rights?.license || '');
  const [licenseWizardDialog, setLicenseWizardDialog] = useState(false);
  const [accessRights, setAccessRights] = useState(initialData?.rights?.access_right || '');
  const [termsOfUse, setTermsOfUse] = useState(initialData?.rights?.terms_of_use[0]?.value || '');
  const [disclaimer, setDisclaimer] = useState(initialData?.rights?.disclaimer[0]?.value || '');
  const [rightsHolders, setRightsHolders] = useState(initialData?.rights?.rights_holders || []);

  const triggerAutocomplete = async ({ query }, term, setSuggestions) => {
    try {
      const results = await autocompleteTerm(term, query);
      setSuggestions(results.length > 0 ? results : []);
    } catch (error) {
      setError(handleError(error));
    }
  };

  useEffect(() => {
    if (license !== '') {
      setAccessRights(ACCESS_RIGHT_OPEN);
    }
  }, [license]);

  useEffect(() => {
    setter({
      access: accessRights,
      license,
      terms_of_use: [
        {
          language: {
            name: 'English',
            iso_code_639_1: 'en',
            iso_code_639_2: 'eng',
          },
          value: termsOfUse,
        },
      ],
      disclaimer: [
        {
          language: {
            name: 'English',
            iso_code_639_1: 'en',
            iso_code_639_2: 'eng',
          },
          value: disclaimer,
        },
      ],
      rights_holders: rightsHolders,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [license, accessRights, termsOfUse, disclaimer, rightsHolders]);

  return (
    <Fieldset legend={t('RESOURCE_RIGHTS')} className="p-mb-4">
      <div id="resource-rights" className="p-fluid">
        <div className="p-formgrid p-grid p-d-flex p-ai-end">
          <div className="p-field p-col-12 p-md-5">
            <label htmlFor="accessRights">{t('RESOURCE_ACCESS_RIGHTS')}</label>
            <Dropdown
              id="accessRights"
              disabled={license !== '' || mode === 'review'}
              options={rights}
              value={accessRights}
              onChange={(e) => setAccessRights(e.target.value)}
              required
            />
          </div>
          <div className={mode === 'edit' ? 'p-field p-col-8 p-md-5' : 'p-field p-col-12 p-md-7'}>
            <label htmlFor="license">{t('RESOURCE_LICENSE')}</label>
            <Dropdown
              disabled={mode === 'review'}
              id="license"
              options={licenses}
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
            />
          </div>
          {mode === 'edit' && (
            <div className="p-field p-col-4 p-md-2">
              <Button
                label={t('LICENSE_WIZARD')}
                onClick={() => setLicenseWizardDialog(!licenseWizardDialog)}
              />
            </div>
          )}
        </div>
        <SimpleTextArea
          mode={mode}
          title={`${t('TERMS_OF_USE')} (in English)`}
          text={termsOfUse}
          setText={setTermsOfUse}
          className="p-mb-2"
        />
        <SimpleTextArea
          mode={mode}
          title={`${t('DISCLAIMER')} (in English)`}
          text={disclaimer}
          setText={setDisclaimer}
          className="p-mb-4"
        />
        <OrgsPersonsEntities
          mode={mode}
          title={t('RIGHTS_HOLDERS')}
          entries={rightsHolders}
          setEntries={setRightsHolders}
          onAutoComplete={(e, setSuggestions) => triggerAutocomplete(e, 'ror', setSuggestions)}
          onSelectAutoComplete={(e, setAutocomplete) => setAutocomplete(transformOrgValue(e))}
          itemTemplate={(item) => item?.name}
        />
      </div>
      {mode === 'edit' && (
        <LicenseWizardDialog
          setDialogOpen={setLicenseWizardDialog}
          dialogOpen={licenseWizardDialog}
          setLicense={setLicense}
        />
      )}
    </Fieldset>
  );
};

export default ResourceRights;
