import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Column, DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const availableLanguages = [
  { label: 'English', value: 'en-us' },
  { label: 'French', value: 'fr' },
  { label: 'Italian', value: 'it' },
];

const CollectionItemsTable = ({ type, items }) => {
  const { t } = useTranslation();
  const languageTemplate = (rowData) => <span>{rowData.language}</span>;
  const itemTemplate = (rowData) => (
    <span>{type === 'title' ? rowData.title : rowData.description}</span>
  );
  const actionsTemplate = (rowData) => (
    <div className="p-text-right">
      <Button
        icon="pi pi-trash"
        className="p-button p-component p-button-rounded p-button-danger p-button-text p-mr-2 p-mb-2 p-button-icon-only"
      />
    </div>
  );
  return items.length ? (
    <DataTable value={items} className="p-mb-3 p-datatable-sm">
      <Column
        field={type}
        sortable
        body={itemTemplate}
        header={
          type === 'title' ? t('COLLECTION_TITLE') : t('COLLECTION_DESCRIPTION')
        }
      />
      <Column
        field="language"
        body={languageTemplate}
        sortable
        header={
          type === 'title'
            ? t('COLLECTION_TITLE_LANGUAGE')
            : t('COLLECTION_DESCRIPTION_LANGUAGE')
        }
      />
      <Column body={actionsTemplate} />
    </DataTable>
  ) : (
    <></>
  );
};

const CollectionDialog = ({ dialogOpen, setDialogOpen, collection }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [titleLanguage, setTitleLanguage] = useState(availableLanguages[0]);
  const [description, setDescription] = useState('');
  const [descriptionLanguage, setDescriptionLanguage] = useState(
    availableLanguages[0],
  );
  const [inheritCollectionInformation, setInheritCollectionInformation] =
    useState(false);
  const [collectionKeywordsExtracted, setCollectionKeywordsExtracted] =
    useState(false);
  const [publishCollection, setPublishCollection] = useState(false);
  const [gardianPID, setGardianPID] = useState('');
  const [Doi, setDoi] = useState('');
  const [publisher, setPublisher] = useState('');
  const [embargoDate, setEmbargoDate] = useState('');

  return (
    <Dialog
      header={t('CREATE_A_NEW_COLLECTION')}
      visible={dialogOpen}
      style={{ width: '600px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-col-12">
            {/* Collection title */}
            <CollectionItemsTable
              type="title"
              items={(collection && collection.titles) || []}
            />
            <div className="p-field">
              <label htmlFor="collection-title">{t('COLLECTION_TITLE')}</label>
              <InputTextarea
                id="collection-title"
                autoResize
                rows="3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* Collection title language */}
            <div className="p-field">
              <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center">
                <div className="p-col-2">
                  <label htmlFor="title-language">
                    {t('COLLECTION_TITLE_LANGUAGE')}
                  </label>
                </div>
                <div className="p-col-8">
                  <Dropdown
                    id="title-language"
                    value={titleLanguage}
                    options={availableLanguages}
                    onChange={(e) => setTitleLanguage(e.value)}
                  />
                </div>
                <div className="p-col-2 p-text-right">
                  <Button
                    label={t('COLLECTION_TITLE_ADD')}
                    icon="pi pi-plus"
                    className="p-button-sm p-component"
                  />
                </div>
              </div>
            </div>
            {/* Collection description */}
            <div className="p-mt-5">
              <CollectionItemsTable
                type="description"
                items={(collection && collection.descriptions) || []}
              />
              <div className="p-field">
                <label htmlFor="collection-description">
                  {t('COLLECTION_DESCRIPTION')}
                </label>
                <InputTextarea
                  id="collection-description"
                  value={description}
                  autoResize
                  rows="5"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* Collection description language */}
              <div className="p-field">
                <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center">
                  <div className="p-col-2">
                    <label htmlFor="description-language">
                      {t('COLLECTION_DESCRIPTION_LANGUAGE')}
                    </label>
                  </div>
                  <div className="p-col-8">
                    <Dropdown
                      id="description-language"
                      value={descriptionLanguage}
                      options={availableLanguages}
                      onChange={(e) => setDescriptionLanguage(e.value)}
                    />
                  </div>
                  <div className="p-col-2 p-text-right">
                    <Button
                      label={t('COLLECTION_DESCRIPTION_ADD')}
                      icon="pi pi-plus"
                      className="p-button-sm p-component"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-mt-5">
              {/* Inherit collection information */}
              <div className="p-field-checkbox">
                <Checkbox
                  inputId="inherit-collection-information"
                  name="inherit-collection-information"
                  checked={inheritCollectionInformation}
                  onChange={(e) => setInheritCollectionInformation(e.checked)}
                />
                <label htmlFor="inherit-collection-information">
                  {t('INHERIT_COLLECTION_INFORMATION')}
                </label>
              </div>
              {/* Collection keywords extracted from resources */}
              <div className="p-field-checkbox">
                <Checkbox
                  inputId="collection-keywords-from-resources"
                  name="collection-keywords-from-resources"
                  checked={collectionKeywordsExtracted}
                  onChange={(e) => setCollectionKeywordsExtracted(e.checked)}
                />
                <label htmlFor="collection-keywords-from-resources">
                  {t('COLLECTION_KEYWORDS_EXTRACTED_FROM_RESOURCES')}
                </label>
              </div>
              {/* Publish collection as catalogue of resources */}
              <div className="p-field-checkbox">
                <Checkbox
                  inputId="publish-as-catalogue-of-resources"
                  name="publish-as-catalogue-of-resources"
                  checked={publishCollection}
                  onChange={(e) => setPublishCollection(e.checked)}
                />
                <label htmlFor="publish-as-catalogue-of-resources">
                  {t('PUBLISH_COLLECTION_AS_CATALOGUE_OF_RESOURCES')}
                </label>
              </div>
            </div>
            <div className="p-mt-5">
              {/* Gardian PID */}
              <div className="p-field">
                <label htmlFor="gardian-pid-title">
                  {t('GARDIAN_PID_TITLE')}
                </label>
                <InputText
                  id="gardian-pid-title"
                  value={gardianPID}
                  onChange={(e) => setGardianPID(e.target.value)}
                />
              </div>
              {/* DOI */}
              <div className="p-field">
                <label htmlFor="title-language">{t('DOI_TITLE')}</label>
                <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center">
                  <div className="p-col-9">
                    <InputText
                      id="title-language"
                      value={Doi}
                      onChange={(e) => setDoi(e.value)}
                    />
                  </div>
                  <div className="p-col-3 p-text-right">
                    <Button
                      label={t('GET_DOI')}
                      icon="pi pi-cloud-download"
                      className="p-button-sm p-component"
                    />
                  </div>
                </div>
              </div>
              {/* Publisher */}
              <div className="p-field">
                <label htmlFor="publisher">{t('PUBLISHER_TITLE')}</label>
                <InputText
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </div>
              {/* Embargo Date */}
              <div className="p-field">
                <label htmlFor="embargo-date">{t('EMBARGO_DATE_TITLE')}</label>
                <Calendar
                  showIcon
                  showButtonBar
                  id="embargo-date"
                  value={embargoDate}
                  onChange={(e) => setEmbargoDate(e.value)}
                />
              </div>
              {/* Geospatial coverage */}
              <div className="p-field-checkbox">
                <Checkbox
                  inputId="geospatial-coverage"
                  name="geospatial-coverage"
                  checked={publishCollection}
                  onChange={(e) => setPublishCollection(e.checked)}
                />
                <label htmlFor="geospatial-coverage">
                  {t('GEOSPATIAL_COVERAGE_COLLECTION_RESOURCES')}
                </label>
              </div>
              {/* Temporal coverage */}
              <div className="p-field-checkbox">
                <Checkbox
                  inputId="temporal-coverage"
                  name="temporal-coverage"
                  checked={publishCollection}
                  onChange={(e) => setPublishCollection(e.checked)}
                />
                <label htmlFor="temporal-coverage">
                  {t('TEMPORAL_COVERAGE_COLLECTION_RESOURCES')}
                </label>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-text-center p-mt-4">
            <div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
              <Button
                icon="pi pi-plus"
                label={t('CREATE_COLLECTION_BUTTON')}
                className="p-mr-2 p-mb-2"
                onClick={() => setDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CollectionDialog;
