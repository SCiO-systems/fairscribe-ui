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
import { ToastContext } from '../../store';
import { isDevelopmentEnvironment } from '../../utilities/environment';
import { handleError } from '../../utilities/errors';
import { transformLanguages } from '../../utilities/transformers';
import FairScoreDialog from '../dialogs/FairScoreDialog';
import Sticky from '../utilities/Sticky';
import DataCollectionMethodology from './partials/DataCollectionMethodology';
import OtherResourceInformation from './partials/OtherResourceInformation';
import PublishingInformation from './partials/PublishingInformation';
import ResourceClassification from './partials/ResourceClassification';
import ResourceCoverage from './partials/ResourceCoverage';
import ResourceFiles from './partials/ResourceFiles';
import ResourceGeneralInformation from './partials/ResourceGeneralInformation';
import ResourceLifecycle from './partials/ResourceLifecycle';
import ResourceRelatedResources from './partials/ResourceRelatedResources';
import ResourceRights from './partials/ResourceRights';
import TemporalCoverage from './partials/TemporalCoverage';

const EditResourceForm = ({ resource, teamId, mode }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setError, setSuccess } = useContext(ToastContext);
  const [quickSaveStyles, setQuickSaveStyles] = useState({});
  const [fairScoreDialogOpen, setFairScoreDialogOpen] = useState(false);
  const [rightOffset, setRightOffset] = useState('30px');
  const [quickSaveVisibility, setQuickSaveVisibility] = useState(true);
  const [metadataRecord, setMetadataRecord] = useState(resource?.metadata_record || {});
  const [comments, setComments] = useState(resource.comments || '');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const { resourceId } = useParams();
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

  const saveChanges = async (sendForReview) => {
    try {
      const status = sendForReview ? 'under_review' : 'under_preparation';
      const record = {
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
      await updateResource(teamId, resourceId, { status, metadata_record: record });
      setSuccess('Resource', 'Resource changes have been saved!');
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
  }, []); // eslint-disable-line

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
                      label={t('CANCEL')}
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
                      onClick={() => saveChanges(true)}
                    />
                    <Button label={t('SAVE_CHANGES')} onClick={() => saveChanges(false)} />
                  </>
                )}
              </div>
            </Sticky>
          )}
          {mode === 'review' && (
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
          )}
        </div>
        {mode === 'edit' && resource.comments && (
          <Message
            severity="warn"
            className="p-mb-4"
            content={() => (
              <>
                <div className="p-mr-3 p-pl-2">
                  <i className="pi pi-book" />
                </div>
                <div className="p-pt-2">
                  <h5>{t('REVIEW_COMMENTS')}</h5>
                  <p className="p-pb-2 p-pr-2">{resource.comments}</p>
                </div>
              </>
            )}
          />
        )}
        <ResourceGeneralInformation
          mode={mode}
          availableLanguages={availableLanguages}
          initialData={{
            title: metadataRecord.title || fallbackTitle,
            description: metadataRecord.description || fallbackDescription,
            resource_language: metadataRecord.resource_language,
            citation: metadataRecord.citation,
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
            title: metadataRecord.title || fallbackTitle,
            dois: metadataRecord.dois,
            pids: metadataRecord.other_pids,
          }}
          setter={(dois, pids) => mainSetter({ dois, other_pids: pids })}
        />

        <ResourceLifecycle
          mode={mode}
          initialData={{
            resource_version: metadataRecord.resource_version,
            resource_version_description: metadataRecord.resource_version_description,
            release_date: metadataRecord.release_date,
            embargo_date: metadataRecord.embargo_date,
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
            authors: metadataRecord.authors,
            projects: metadataRecord.projects,
            funding_organisations: metadataRecord.funding_organisations,
            contact_points: metadataRecord.contact_points,
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
          initialData={{ keywords: metadataRecord.keywords }}
          setter={(keywords) => mainSetter({ keywords })}
        />
        <ResourceRights
          mode={mode}
          initialData={{ rights: metadataRecord.rights }}
          setter={(rights) => mainSetter({ rights })}
        />
        <ResourceCoverage
          mode={mode}
          initialData={{
            geospatial_coverage: metadataRecord.geospatial_coverage,
            temporal_coverage: metadataRecord.temporal_coverage,
          }}
          setter={(gsc, tc) => mainSetter({ geospatial_coverage: gsc, temporal_coverage: tc })}
        />
        <ResourceRelatedResources
          mode={mode}
          initialData={{
            related_resources: metadataRecord.related_resources,
          }}
          setter={(relatedResources) => mainSetter({ related_resources: relatedResources })}
        />
      </div>
      <FairScoreDialog
        dialogOpen={fairScoreDialogOpen}
        setDialogOpen={setFairScoreDialogOpen}
        metadataRecord={metadataRecord}
      />
    </>
  );
};

export default EditResourceForm;
