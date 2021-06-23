import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InviteTeamMembersDialog from '../components/dialogs/InviteTeamMembersDialog';
import TeamDialog from '../components/dialogs/TeamDialog';
import InformationPanel from '../components/InformationPanel';
import MyTeamsTable from '../components/tables/MyTeamsTable';
import SharedTeamsTable from '../components/tables/SharedTeamsTable';

const Dashboard = () => {
  const { t } = useTranslation();
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [viewTeam, setViewTeam] = useState(null);
  const [inviteMembersDialogOpen, setInviteMembersDialogOpen] = useState(false);

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
            <MyTeamsTable
              teamDialogOpen={teamDialogOpen}
              setInviteMembersDialogOpen={setInviteMembersDialogOpen}
              setTeamDialogOpen={setTeamDialogOpen}
              setViewTeam={setViewTeam}
            />
          </div>
          <div className="card p-mt-4">
            <SharedTeamsTable />
          </div>
        </div>
      </div>
      <TeamDialog
        team={viewTeam}
        dialogOpen={teamDialogOpen}
        setDialogOpen={setTeamDialogOpen}
      />
      <InviteTeamMembersDialog
        team={viewTeam}
        dialogOpen={inviteMembersDialogOpen}
        setDialogOpen={setInviteMembersDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
