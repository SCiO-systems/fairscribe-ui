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

const languages = [
  { label: 'English', value: 'English' },
  { label: 'French', value: 'French' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Spanish', value: 'Spanish' },
];

const CollectionItemsTable = ({
  type,
  items,
  removeTitle,
  removeDescription,
}) => {
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
        onClick={() => {
          type === 'title' ? removeTitle(rowData) : removeDescription(rowData);
        }}
      />
    </div>
  );
  return (
    <DataTable
      emptyMessage={
        type === 'title'
          ? t('NO_AVAILABLE_TITLES')
          : t('NO_AVAILABLE_DESCRIPTIONS')
      }
      value={items}
      className="p-mb-3 p-datatable-sm"
    >
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
  );
};

const CollectionDialog = ({ dialogOpen, setDialogOpen, collection }) => {
  const { t } = useTranslation();

  const [titles, setTitles] = useState((collection && collection.titles) || []);
  const [descriptions, setDescriptions] = useState(
    (collection && collection.descriptions) || [],
  );

  const [title, setTitle] = useState('');
  const [titleLanguage, setTitleLanguage] = useState(languages[0].value);
  const [description, setDescription] = useState('');
  const [descriptionLanguage, setDescriptionLanguage] = useState(
    languages[0].value,
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
  const [geospatialCoverage, setGeospatialCoverage] = useState(false);
  const [temporalCoverage, setTemporalCoverage] = useState(false);

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
              items={titles}
              removeTitle={(rowData) => {
                setTitles(
                  titles.filter((item) => item.title !== rowData.title),
                );
              }}
            />
            {/* Collection title language */}
            <div className="p-field">
              <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center">
                <div className="p-col-3">
                  <Dropdown
                    id="title-language"
                    value={titleLanguage}
                    placeholder={t('COLLECTION_TITLE_LANGUAGE')}
                    options={languages}
                    onChange={(e) => setTitleLanguage(e.value)}
                  />
                </div>
                <div className="p-col-7">
                  <InputText
                    id="collection-title"
                    autoResize
                    rows="3"
                    value={title}
                    placeholder={t('COLLECTION_ENTER_TITLE')}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="p-col-2 p-text-right">
                  <Button
                    label={t('COLLECTION_TITLE_ADD')}
                    icon="pi pi-plus"
                    className="p-button-sm p-component"
                    disabled={title.length === 0}
                    onClick={() => {
                      setTitles([
                        ...titles,
                        { title, language: titleLanguage },
                      ]);
                      setTitle('');
                      setTitleLanguage(languages[0].value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Collection description */}
            <div className="p-mt-5">
              <CollectionItemsTable
                type="description"
                items={descriptions}
                removeDescription={(rowData) => {
                  setDescriptions(
                    descriptions.filter(
                      (item) => item.description !== rowData.description,
                    ),
                  );
                }}
              />
              {/* Collection description language */}
              <div className="p-field">
                <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-start">
                  <div className="p-col-3">
                    <Dropdown
                      id="description-language"
                      value={descriptionLanguage}
                      options={languages}
                      placeholder={t('COLLECTION_DESCRIPTION_LANGUAGE')}
                      onChange={(e) => setDescriptionLanguage(e.value)}
                    />
                  </div>
                  <div className="p-col-7">
                    <InputTextarea
                      id="collection-description"
                      value={description}
                      placeholder={t('COLLECTION_ENTER_DESCRIPTION')}
                      autoResize
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="p-col-2 p-text-right">
                    <Button
                      label={t('COLLECTION_DESCRIPTION_ADD')}
                      icon="pi pi-plus"
                      className="p-button-sm p-component"
                      disabled={description.length === 0}
                      onClick={() => {
                        setDescriptions([
                          ...descriptions,
                          { description, language: descriptionLanguage },
                        ]);
                        setDescription('');
                        setDescriptionLanguage(languages[0].value);
                      }}
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
                  checked={geospatialCoverage}
                  onChange={(e) => setGeospatialCoverage(e.checked)}
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
                  checked={temporalCoverage}
                  onChange={(e) => setTemporalCoverage(e.checked)}
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
