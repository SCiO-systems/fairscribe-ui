import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import FairScoreDialog from '../dialogs/FairScoreDialog';
import Sticky from '../utilities/Sticky';
import PublishingInformation from './partials/PublishingInformation';
import ResourceClassification from './partials/ResourceClassification';
import ResourceCoverage from './partials/ResourceCoverage';
import ResourceFiles from './partials/ResourceFiles';
import ResourceGeneralInformation from './partials/ResourceGeneralInformation';
import ResourceLifecycle from './partials/ResourceLifecycle';
import ResourceRelatedResources from './partials/ResourceRelatedResources';
import ResourceRights from './partials/ResourceRights';

const EditResourceForm = ({ resource, teamId, mode }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [quickSaveStyles, setQuickSaveStyles] = useState({});
  const [fairScoreDialogOpen, setFairScoreDialogOpen] = useState(false);
  const [rightOffset, setRightOffset] = useState('30px');
  const [quickSaveVisibility, setQuickSaveVisibility] = useState(true);
  const [metadataRecord, setMetadataRecord] = useState(
    resource.metadata_record ?? {}
  );

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

  const mainSetter = (data) => {
    setMetadataRecord(() => ({ ...metadataRecord, ...data }));
  };

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
                    icon={
                      quickSaveVisibility
                        ? 'pi pi-angle-right'
                        : 'pi pi-angle-left'
                    }
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
                      label={t('SAVE_CHANGES')}
                      onClick={() => {
                        // eslint-disable-next-line
                        console.log({
                          dataCORE: {
                            CORE_version: '1.0',
                            ...metadataRecord,
                            resource_type: {
                              value: 'dataset',
                            },
                          },
                        });
                      }}
                    />
                  </>
                )}
              </div>
            </Sticky>
          )}
          {mode === 'review' && (
            <div className="review-comments">
              <form onSubmit={() => {}}>
                <h5>{t('COMMENTS')}</h5>
                <InputTextarea
                  style={{ width: '100%', overflowY: 'scroll', resize: 'none' }}
                  autoResize={false}
                  rows={5}
                />
                <Button
                  type="submit"
                  className="p-my-2"
                  label={t('SAVE_CHANGES')}
                />
              </form>
            </div>
          )}
        </div>
        <ResourceFiles
          mode={mode}
          initialData={{
            thumbnail: metadataRecord.thumbnail,
            resource_files: metadataRecord.resource_files,
          }}
          setter={(thumbnail, resourceFiles) =>
            mainSetter({ thumbnail, resource_files: resourceFiles })
          }
        />
        <PublishingInformation
          mode={mode}
          initialData={{
            identifier: metadataRecord.identifier,
            type: metadataRecord.resource_type,
          }}
          setter={(identifier) => mainSetter({ identifier })}
        />
        <ResourceGeneralInformation
          mode={mode}
          initialData={{
            title: metadataRecord.title,
            description: metadataRecord.description,
            resource_language: metadataRecord.resource_language,
            citation: metadataRecord.citation,
            authors: metadataRecord.authors,
            metadata_authors: metadataRecord.metadata_authors,
            project_id: metadataRecord.project_id,
            project_name: metadataRecord.project_name,
            project_partners: metadataRecord.project_partners,
            funding_organisations: metadataRecord.funding_organisations,
            contact_point: metadataRecord.contact_point,
          }}
          setter={(
            title,
            description,
            languages,
            authors,
            metadataAuthors,
            projectId,
            projectName,
            projectPartners,
            fundingOrganizations,
            contactPoints,
            citation
          ) =>
            mainSetter({
              title,
              description,
              resource_language: languages,
              authors,
              metadata_authors: metadataAuthors,
              project_id: projectId,
              project_name: projectName,
              project_partners: projectPartners,
              funding_organisations: fundingOrganizations,
              contact_point: contactPoints,
              citation,
            })
          }
        />
        <ResourceLifecycle
          mode={mode}
          initialData={{
            resource_version: metadataRecord.resource_version,
            resource_version_description:
              metadataRecord.resource_version_description,
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
          setter={(gsc, tc) =>
            mainSetter({ geospatial_coverage: gsc, temporal_coverage: tc })
          }
        />
        <ResourceRelatedResources
          mode={mode}
          initialData={{
            related_resources: metadataRecord.related_resources,
          }}
          setter={(relatedResources) =>
            mainSetter({ related_resources: relatedResources })
          }
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
