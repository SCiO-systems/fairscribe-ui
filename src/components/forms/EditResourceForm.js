import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { listLanguages } from '../../services/integrations';
import { updateResource, updateResourceComments } from '../../services/resources';
import { getAllCollections } from '../../services/teams';
import { ToastContext } from '../../store';
import { isDevelopmentEnvironment } from '../../utilities/environment';
import { handleError } from '../../utilities/errors';
import { transformLanguages } from '../../utilities/transformers';
import FairScoreDialog from '../dialogs/FairScoreDialog';
import Sticky from '../utilities/Sticky';
import DataCollectionMethodology from './partials/DataCollectionMethodology';
import GeospatialCoverage from './partials/GeospatialCoverage';
import OtherResourceInformation from './partials/OtherResourceInformation';
import PublishingInformation from './partials/PublishingInformation';
import ResourceClassification from './partials/ResourceClassification';
import ResourceFiles from './partials/ResourceFiles';
import ResourceGeneralInformation from './partials/ResourceGeneralInformation';
import ResourceLifecycle from './partials/ResourceLifecycle';
import ResourceRelatedResources from './partials/ResourceRelatedResources';
import ResourceRights from './partials/ResourceRights';
import TemporalCoverage from './partials/TemporalCoverage';

const EditResourceForm = ({ resource, teamId, mode }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { resourceId } = useParams();
  const { setError, setSuccess } = useContext(ToastContext);

  const [quickSaveStyles, setQuickSaveStyles] = useState({});
  const [fairScoreDialogOpen, setFairScoreDialogOpen] = useState(false);
  const [rightOffset, setRightOffset] = useState('30px');
  const [quickSaveVisibility, setQuickSaveVisibility] = useState(true);
  const [metadataRecord, setMetadataRecord] = useState(resource?.metadata_record || {});
  const [comments, setComments] = useState(resource.comments || '');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState(resource?.collections);
  const { type, subtype } = resource;

  useScrollPosition(({ currPos }) => {
    if (currPos.y > -10) {
      setQuickSaveStyles({
        transition: 'all 3ms',
      });
      setRightOffset('30px');
      setQuickSaveVisibility(true);
    } else {
      setQuickSaveStyles({
        background: 'white',
        border: '1px solid #dee2e6',
        padding: '1rem',
        boxSizing: 'border-box',
        transition: 'all 3ms',
      });
      setRightOffset('-1px');
    }
  });

  const fallbackTitle = [
    {
      language: {
        name: 'English',
        label: 'English',
        value: 'English',
        iso_code_639_1: 'en',
        iso_code_639_2: 'eng',
      },
      value: resource.title,
    },
  ];

  const fallbackDescription = [
    {
      language: {
        name: 'English',
        label: 'English',
        value: 'English',
        iso_code_639_1: 'en',
        iso_code_639_2: 'eng',
      },
      value: resource.description,
    },
  ];

  const updateStatus = async (status, successMessage) => {
    try {
      await updateResource(teamId, resourceId, {
        status,
        collections: selectedCollections.map(({ id }) => id),
      });
      setSuccess('Resource', successMessage || 'Changes were saved!');
      history.push(`/teams/${teamId}`);
    } catch (error) {
      setError(handleError(error));
    }
  };

  const saveChanges = async (sendForReview, showMessage = false) => {
    try {
      let status = sendForReview ? 'under_review' : resource?.status;
      // TODO: Fix this asap.
      if (status === 'published') {
        status = 'under_preparation';
      }
      const record = {
        title: fallbackTitle,
        description: fallbackDescription,
        ...metadataRecord,
        dataCORE_version: '1.0',
        dataNODE_id: '',
        providers: [],
        sources: [],
        resource_type: { type, subtype },
      };
      if (isDevelopmentEnvironment()) {
        console.log('Generated metadata record:', record); // eslint-disable-line
      }
      await updateResource(teamId, resourceId, {
        collections: selectedCollections.map(({ id }) => id),
        status,
        metadata_record: record,
      });
      if (showMessage) {
        setSuccess('Resource', 'Resource changes have been saved!');
      }
      if (sendForReview) {
        history.push(`/teams/${teamId}`);
      }
    } catch (error) {
      setError(handleError(error));
    }
  };

  const saveResourceComments = async (e) => {
    e.preventDefault();
    try {
      await updateResourceComments(teamId, resourceId, { comments });
      setSuccess('Review', 'The comments have been saved!');
    } catch (error) {
      setError(handleError(error));
    }
  };

  const mainSetter = (data) => {
    setMetadataRecord(() => ({ ...metadataRecord, ...data }));
  };

  useEffect(() => {
    listLanguages()
      .then((data) => setAvailableLanguages(transformLanguages(data)))
      .catch((error) => setError(handleError(error)));

    getAllCollections(teamId)
      .then(({ data }) =>
        setCollections(
          data.filter((c) => {
            if (selectedCollections.some((sc) => sc.id === c.id)) {
              return false;
            }
            return true;
          })
        )
      )
      .catch((error) => setError(handleError(error)));

    if (mode === 'edit') {
      saveChanges(false, false);
    }
  }, []); // eslint-disable-line

  return (
    <>
      <div className="p-pb-6" id="editResourceForm">
        <div className="p-d-flex p-jc-between" style={{ minHeight: '4.7rem' }}>
          <h4 className="p-text-uppercase">{t('RESOURCE_METADATA_RECORD')}</h4>
          {mode === 'edit' && (
            <Sticky rightOffset={rightOffset}>
              <div style={quickSaveStyles}>
                {/* only show the arrow if the user has scrolled */}
                {rightOffset === '-1px' && (
                  <Button
                    label=""
                    className={classNames(
                      'p-button-secondary',
                      'p-button-rounded',
                      'p-button-text',
                      'p-button-icon-only',
                      { 'p-mr-2': quickSaveVisibility }
                    )}
                    icon={quickSaveVisibility ? 'pi pi-angle-right' : 'pi pi-angle-left'}
                    onClick={() => setQuickSaveVisibility(!quickSaveVisibility)}
                  />
                )}
                {quickSaveVisibility && (
                  <>
                    <Button
                      label={t('BACK')}
                      onClick={() => history.push(`/teams/${teamId}`)}
                      className="p-button-secondary p-mr-2"
                    />
                    <Button
                      className="p-mr-2"
                      label={t('CHECK_FAIR')}
                      onClick={(e) => setFairScoreDialogOpen(true)}
                    />
                    <Button
                      className="p-mr-2"
                      label={t('SEND_FOR_REVIEW')}
                      onClick={() => saveChanges(true, true)}
                    />
                    <Button label={t('SAVE_CHANGES')} onClick={() => saveChanges(false, true)} />
                  </>
                )}
              </div>
            </Sticky>
          )}
          {mode === 'review' && (
            <>
              <Sticky rightOffset={rightOffset}>
                <div style={quickSaveStyles}>
                  {rightOffset === '-1px' && (
                    <Button
                      label=""
                      className={classNames(
                        'p-button-secondary',
                        'p-button-rounded',
                        'p-button-text',
                        'p-button-icon-only',
                        { 'p-mr-2': quickSaveVisibility }
                      )}
                      icon={quickSaveVisibility ? 'pi pi-angle-right' : 'pi pi-angle-left'}
                      onClick={() => setQuickSaveVisibility(!quickSaveVisibility)}
                    />
                  )}
                  {quickSaveVisibility && (
                    <>
                      <Button
                        label={t('BACK')}
                        onClick={() => history.push(`/teams/${teamId}`)}
                        className="p-button-secondary p-mr-2"
                      />
                      <Button
                        className="p-mr-2"
                        label={t('SEND_FOR_REEDITING')}
                        onClick={() =>
                          updateStatus('under_preparation', 'Resource was sent for re-editing!')
                        }
                      />
                      <Button
                        className="p-button-success"
                        label={t('APPROVE')}
                        onClick={() =>
                          updateStatus('approved', 'Resource is approved and ready for publishing!')
                        }
                      />
                    </>
                  )}
                </div>
              </Sticky>
              <div className="review-comments">
                <form onSubmit={saveResourceComments}>
                  <h5>{t('COMMENTS')}</h5>
                  <InputTextarea
                    style={{ width: '100%', overflowY: 'scroll', resize: 'none' }}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    autoResize={false}
                    rows={5}
                  />
                  <Button type="submit" className="p-my-2" label={t('SAVE_CHANGES')} />
                </form>
              </div>
            </>
          )}
        </div>
        {mode === 'edit' && resource?.comments && (
          <Message
            severity="warn"
            className="p-mb-5 p-d-flex p-jc-start p-ai-start"
            content={() => (
              <>
                <div className="p-mx-3 p-py-4">
                  <i className="pi pi-book" style={{ fontSize: '2rem' }} />
                </div>
                <div className="p-py-4 p-pr-4">
                  <h5 className="p-mb-2">{t('REVIEW_COMMENTS')}</h5>
                  <p className="p-text-justify">{resource?.comments}</p>
                </div>
              </>
            )}
          />
        )}
        <ResourceGeneralInformation
          mode={mode}
          availableLanguages={availableLanguages}
          teamCollections={collections}
          setTeamCollections={setCollections}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          initialData={{
            title: metadataRecord?.title || fallbackTitle,
            description: metadataRecord?.description || fallbackDescription,
            resource_language: metadataRecord?.resource_language,
            citation: metadataRecord?.citation,
          }}
          setter={(title, description, resourceLanguage, citation) =>
            mainSetter({
              title,
              description,
              resource_language: resourceLanguage,
              citation,
            })
          }
        />
        {type === 'dataset' && (
          <DataCollectionMethodology
            mode={mode}
            initialData={{
              units: metadataRecord?.methodology?.unit_of_analysis,
              universe: metadataRecord?.methodology?.universe,
              frequency: metadataRecord?.methodology?.data_collection_frequency,
              collectionMode: metadataRecord?.methodology?.data_collection_mode,
              instrument: metadataRecord?.methodology?.instrument,
              process: metadataRecord?.methodology?.sampling_process,
            }}
            setter={(units, universe, frequency, collectionMode, instrument, process) =>
              mainSetter({
                methodology: {
                  unit_of_analysis: units,
                  universe,
                  data_collection_frequency: frequency,
                  data_collection_mode: collectionMode,
                  instrument,
                  sampling_process: process,
                },
              })
            }
          />
        )}
        {type === 'dataset' && (
          <TemporalCoverage
            mode={mode}
            initialData={{
              data_temporal_coverage: metadataRecord?.data_temporal_coverage,
              data_collection_period: metadataRecord?.data_collection_period,
            }}
            setter={(temporalCoverage, collectionPeriod) =>
              mainSetter({
                data_temporal_coverage: temporalCoverage,
                data_collection_period: collectionPeriod,
              })
            }
          />
        )}
        <ResourceFiles
          mode={mode}
          initialData={{
            thumbnails: metadataRecord.thumbnails,
            resource_files: metadataRecord.resource_files,
          }}
          setter={(thumbnails, resourceFiles) =>
            mainSetter({ thumbnails, resource_files: resourceFiles })
          }
        />
        <PublishingInformation
          mode={mode}
          type={metadataRecord?.resource_type?.type}
          initialData={{
            title: metadataRecord?.title || fallbackTitle,
            dois: metadataRecord?.dois,
            pids: metadataRecord?.other_pids,
          }}
          setter={(dois, pids) => mainSetter({ dois, other_pids: pids })}
        />
        <ResourceLifecycle
          mode={mode}
          initialData={{
            resource_version: metadataRecord?.resource_version,
            resource_version_description: metadataRecord?.resource_version_description,
            release_date: metadataRecord?.release_date,
            embargo_date: metadataRecord?.embargo_date,
          }}
          setter={(rV, rVD, rD, eD) =>
            mainSetter({
              resource_version: rV,
              resource_version_description: rVD,
              release_date: rD,
              embargo_date: eD,
            })
          }
        />
        <OtherResourceInformation
          mode={mode}
          initialData={{
            authors: metadataRecord?.authors,
            projects: metadataRecord?.projects,
            funding_organisations: metadataRecord?.funding_organisations,
            contact_points: metadataRecord?.contact_points,
          }}
          setter={(authors, projects, fundingOrganizations, contactPoints) =>
            mainSetter({
              authors,
              projects,
              funding_organisations: fundingOrganizations,
              contact_points: contactPoints,
            })
          }
        />
        <ResourceClassification
          mode={mode}
          initialData={{
            keywords: metadataRecord?.keywords,
            title: metadataRecord?.title || fallbackTitle,
            description: metadataRecord?.description || fallbackDescription,
          }}
          setter={(keywords) => mainSetter({ keywords })}
        />
        <GeospatialCoverage
          mode={mode}
          initialData={{
            regions: metadataRecord?.geography?.regions,
            countries: metadataRecord?.geography?.countries,
          }}
          setter={(regions, countries) => mainSetter({ geography: { regions, countries } })}
        />
        <ResourceRights
          mode={mode}
          initialData={{ rights: metadataRecord?.rights }}
          setter={(rights) => mainSetter({ rights })}
        />
        <ResourceRelatedResources
          mode={mode}
          initialData={{
            related_resources: metadataRecord?.related_resources,
          }}
          setter={(relatedResources) => mainSetter({ related_resources: relatedResources })}
        />
        {mode === 'review' && <div style={{ height: '150px' }}>&nbsp;</div>}
      </div>
      <FairScoreDialog
        dialogOpen={fairScoreDialogOpen}
        setDialogOpen={setFairScoreDialogOpen}
        teamId={teamId}
        resourceId={resource?.id}
      />
    </>
  );
};

export default EditResourceForm;
