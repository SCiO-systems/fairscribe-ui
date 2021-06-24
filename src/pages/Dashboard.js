import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react/cjs/react.development';
import InviteTeamMembersDialog from '../components/dialogs/InviteTeamMembersDialog';
import TeamDialog from '../components/dialogs/TeamDialog';
import InformationPanel from '../components/InformationPanel';
import MyTeamsTable from '../components/tables/MyTeamsTable';
import SharedTeamsTable from '../components/tables/SharedTeamsTable';
import { getUserStats } from '../services/users';
import { UserContext } from '../store';

const Dashboard = () => {
  const { t } = useTranslation();
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [viewTeam, setViewTeam] = useState(null);
  const [inviteMembersDialogOpen, setInviteMembersDialogOpen] = useState(false);
  const [myActiveTasks, setMyActiveTasks] = useState(null);
  const [myPendingReviews, setMyPendingReviews] = useState(null);
  const [myPendingUploads, setMyPendingUploads] = useState(null);
  const { id: userId } = useContext(UserContext);

  useEffect(() => {
    getUserStats(userId)
      .then(({ data }) => {
        setMyActiveTasks(data.active_tasks);
        setMyPendingReviews(data.pending_review_tasks);
        setMyPendingUploads(data.pending_upload_tasks);
      })
      .catch((e) => {
        // Silently...
        setMyActiveTasks(0);
        setMyPendingReviews(0);
        setMyPendingUploads(0);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="layout-dashboard">
      <div className="p-grid">
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name={t('MY_ACTIVE_TASKS')}
          value={myActiveTasks}
          icon="pi pi-pencil"
          extraClass="widget-overview-box-3"
        />
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name={t('PENDING_REVIEWS')}
          value={myPendingReviews}
          icon="pi pi-list"
          extraClass="widget-overview-box-2"
        />
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name={t('PENDING_UPLOADS')}
          value={myPendingUploads}
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
