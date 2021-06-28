import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const uiLanguageOptions = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Spanish', value: 'es' },
];

const uiLanguageDisplayOptions = [
  { label: 'Native name (endonym)', value: 'endonym' },
];

const uiDatesDisplayOptions = [{ label: 'YYYY-MM-DD', value: 'YYY-MM-DD' }];

const UserInterfacePreferences = () => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();
  const [uiLanguage, setUILanguage] = useState(uiLanguageOptions[0]);
  const [uiLanguagesDisplay, setUILanguagesDisplay] = useState(
    uiLanguageDisplayOptions[0]
  );
  const [uiDatesDisplay, setUIDatesDisplay] = useState(
    uiDatesDisplayOptions[0]
  );

  return (
    <div className="p-grid p-my-3">
      <div className="p-col-12">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5>{t('USER_INTERFACE_PREFERENCES_TITLE')}</h5>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="ui-language">{t('UI_LANGUAGE_TITLE')}</label>
              <Dropdown
                id="ui-language"
                value={uiLanguage}
                options={uiLanguageOptions}
                onChange={(e) => setUILanguage(e.value)}
                placeholder={t('SELECT_UI_LANGUAGE')}
                className="p-d-flex"
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="ui-language-display">
                {t('UI_LANGUAGES_DISPLAY')}
              </label>
              <Dropdown
                id="ui-language-display"
                value={uiLanguagesDisplay}
                options={uiLanguageDisplayOptions}
                onChange={(e) => setUILanguagesDisplay(e.value)}
                placeholder={t('SELECT_UI_LANGUAGE_DISPLAY')}
                className="p-d-flex"
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="ui-dates-display">{t('UI_DATES_DISPLAY')}</label>
              <Dropdown
                id="ui-dates-display"
                value={uiDatesDisplay}
                options={uiDatesDisplayOptions}
                onChange={(e) => setUIDatesDisplay(e.value)}
                placeholder={t('SELECT_UI_DATES_DISPLAY')}
                className="p-d-flex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInterfacePreferences;
