import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InformationPanel from '../components/InformationPanel';
import TeamDialog from '../components/dialogs/TeamDialog';
import InviteTeamMembersDialog from '../components/dialogs/InviteTeamMembersDialog';

const myTeams = [{ name: 'EiA', tasks: '4', reviews: '13', uploads: '21' }];

const sharedTeams = [
  { name: 'CSI Team', tasks: '4', reviews: '13' },
  { name: 'Org Data Team', tasks: '9', reviews: '6' },
];

const Dashboard = () => {
  const { t } = useTranslation();
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [viewTeam, setViewTeam] = useState(null);
  const [inviteMembersDialogOpen, setInviteMembersDialogOpen] = useState(false);
  const history = useHistory();

  const nameTemplate = (rowData) => <h5>{rowData.name}</h5>;

  const tasksTemplate = (rowData) => (
    <span>
      <strong>{rowData.tasks}</strong>
      <br />
      {t('ACTIVE_TASKS')}
    </span>
  );

  const reviewsTemplate = (rowData) => (
    <span>
      <strong>{rowData.reviews}</strong>
      <br />
      {t('PENDING_REVIEWS')}
    </span>
  );

  const uploadsTemplate = (rowData) => (
    <span>
      <strong>{rowData.uploads}</strong>
      <br />
      {t('PENDING_UPLOADS')}
    </span>
  );

  return (
    <div className="layout-dashboard">
      <div className="p-grid">
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name={t('MY_ACTIVE_TASKS')}
          value="21"
          icon="pi pi-pencil"
          extraClass="widget-overview-box-3"
        />
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name={t('PENDING_REVIEWS')}
          value="123"
          icon="pi pi-list"
          extraClass="widget-overview-box-2"
        />
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name={t('PENDING_UPLOADS')}
          value="42"
          icon="pi pi-upload"
          extraClass="widget-overview-box-1"
        />
        <div className="p-col-12">
          <div className="card">
            <div className="p-d-flex p-jc-between">
              <h4>{t('MY_TEAMS')}</h4>
              <span>
                <Button
                  label={t('CREATE_TEAM')}
                  icon="pi pi-plus-circle"
                  onClick={() => {
                    setViewTeam(null);
                    setTeamDialogOpen(true);
                  }}
                />
              </span>
            </div>
            <DataTable value={myTeams} className="p-mt-2">
              <Column field="name" header={t('NAME')} body={nameTemplate} />
              <Column
                field="tasks"
                header={t('ACTIVE_TASKS')}
                body={tasksTemplate}
              />
              <Column
                field="reviews"
                header={t('PENDING_REVIEWS')}
                body={reviewsTemplate}
              />
              <Column
                field="uploads"
                header={t('PENDING_UPLOADS')}
                body={uploadsTemplate}
              />
              <Column
                body={(rowData) => (
                  <div className="p-text-right">
                    <Button
                      onClick={() => setInviteMembersDialogOpen(true)}
                      icon="pi pi-user-plus"
                      className="p-button-outlined p-button-icon-only p-button-rounded p-mr-2"
                    />
                    <Button
                      icon="pi pi-cog"
                      onClick={() => {
                        setViewTeam({
                          name: 'EiA',
                          description: 'My sample description',
                        });
                        setTeamDialogOpen(true);
                      }}
                      className="p-button-outlined p-button-icon-only p-button-rounded p-button-secondary p-mr-2"
                    />
                    <Button
                      label={t('VIEW_DETAILS')}
                      icon="pi pi-eye"
                      onClick={() => history.push('/team/1')}
                      className="p-button-secondary"
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
          <div className="card p-mt-4">
            <h4>{t('SHARED_TEAMS')}</h4>
            <DataTable value={sharedTeams} className="p-mt-2">
              <Column field="name" header={t('NAME')} body={nameTemplate} />
              <Column
                field="tasks"
                header={t('ACTIVE_TASKS')}
                body={tasksTemplate}
              />
              <Column
                field="reviews"
                header={t('PENDING_REVIEWS')}
                body={reviewsTemplate}
              />
              <Column header="" />
              <Column
                body={(rowData) => (
                  <div className="p-text-right">
                    <Button
                      label={t('VIEW_DETAILS')}
                      icon="pi pi-eye"
                      className="p-button-secondary"
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <TeamDialog
        team={viewTeam}
        dialogOpen={teamDialogOpen}
        setDialogOpen={setTeamDialogOpen}
      />
      <InviteTeamMembersDialog
        dialogOpen={inviteMembersDialogOpen}
        setDialogOpen={setInviteMembersDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
