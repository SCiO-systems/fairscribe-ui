import { Button } from 'primereact/button';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Logo from './assets/img/dataSCRIBE-Horizontal.png';
import InviteTeamMembersDialog from './components/dialogs/InviteTeamMembersDialog';
import TeamDialog from './components/dialogs/TeamDialog';
import { getAllOwnedTeams, getAllSharedTeams } from './services/teams';
import { ToastContext, UserContext } from './store';

const AppMenu = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [showOwnTeams, setShowOwnTeams] = useState(false);
  const [showSharedTeams, setShowSharedTeams] = useState(false);
  const { currentlyViewingTeam, ownTeams, sharedTeams, id, setUser } =
    useContext(UserContext);
  const { setError } = useContext(ToastContext);
  const [inviteTeamMembersDialog, setInviteTeamMembersDialog] = useState(false);

  const loadTeams = async () => {
    try {
      const ownTeamsRes = await getAllOwnedTeams(id);
      const sharedTeamsRes = await getAllSharedTeams();
      setUser({
        ownTeams: ownTeamsRes.data,
        sharedTeams: sharedTeamsRes.data,
      });
      if (ownTeamsRes.data.length > 0) {
        setShowOwnTeams(true);
      }
      if (sharedTeamsRes.data.length > 0) {
        setShowSharedTeams(true);
      }
    } catch (e) {
      if (e.response) {
        setError('Oops!', e.response.data.error);
      }
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    loadTeams();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // essentially reload teams table when the teamDialog closes
    if (teamDialogOpen === false) {
      loadTeams();
    }
  }, [teamDialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="layout-sidebar"
      role="button"
      tabIndex="0"
      onClick={onMenuClick}
    >
      <div className="logo">
        <NavLink to="/">
          <img
            id="app-logo"
            className="logo-image"
            src={Logo}
            alt="dataSCRIBE"
          />
        </NavLink>
      </div>

      <div className="layout-menu-container">
        <ul className="layout-menu" role="menu">
          <li className="layout-root-menuitem" role="menuitem">
            <ul className="layout-menu" role="menu">
              <li className="" role="menuitem">
                <NavLink to="/" activeClassName="p-button" exact>
                  <i className="layout-menuitem-icon pi pi-fw pi-home" />
                  <span className="layout-menuitem-text">{t('DASHBOARD')}</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu-separator" role="separator" />
          <li className="layout-root-menuitem" role="menuitem">
            <button type="button" className="p-ripple p-link">
              <i className="layout-menuitem-icon pi pi-fw pi-users" />
              <span className="layout-menuitem-text">{t('MY_TEAMS')}</span>
              <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />
            </button>
            <div className="layout-root-menuitem p-d-flex p-ai-center p-jc-between">
              <div className="layout-menuitem-root-text">{t('MY_TEAMS')}</div>
              <button
                type="button"
                title={t('CREATE_TEAM')}
                onClick={() => setTeamDialogOpen(true)}
                className="add-team-btn p-button p-button-sm p-component p-button-rounded p-button-icon-only"
              >
                <span className="p-button-icon p-c pi pi-plus" />
                <span className="p-button-label p-c">&nbsp;</span>
              </button>
            </div>
            <ul className="layout-menu" role="menu">
              {showOwnTeams &&
                ownTeams.map((team) => (
                  <li key={`${team.name}-${team.id}`} role="menuitem">
                    <NavLink
                      to={`/teams/${team.id}`}
                      activeClassName="p-button"
                      exact
                    >
                      <i className="layout-menuitem-icon pi pi-fw pi-users" />
                      <span className="layout-menuitem-text">{team.name}</span>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
          <li className="menu-separator" role="separator" />
          <li className="layout-root-menuitem" role="menuitem">
            <button type="button" className="p-ripple p-link">
              <i className="layout-menuitem-icon pi pi-fw pi-users" />
              <span className="layout-menuitem-text">{t('SHARED_TEAMS')}</span>
              <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />
            </button>
            <div className="layout-root-menuitem">
              <div className="layout-menuitem-root-text">
                {t('SHARED_TEAMS')}
              </div>
            </div>
            <ul className="layout-menu" role="menu">
              {showSharedTeams &&
                sharedTeams.map((team) => (
                  <li key={`${team.name}-${team.id}`} role="menuitem">
                    <NavLink to={`/teams/${team.id}`} className="p-ripple">
                      <i className="layout-menuitem-icon pi pi-fw pi-users" />
                      <span className="layout-menuitem-text">{team.name}</span>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
          {/* TODO: Split to team members component */}
          {currentlyViewingTeam && (
            <>
              <li className="menu-separator" role="separator" />
              <li className="layout-root-menuitem" role="menuitem">
                <Button
                  label={t('TEAM_MEMBERS')}
                  className="p-ripple p-link"
                  icon="pi pi-fw pi-users"
                />
                <div className="layout-root-menuitem p-d-flex p-ai-center p-jc-between">
                  <div className="layout-menuitem-root-text">
                    {t('TEAM_MEMBERS')}
                  </div>
                  <button
                    type="button"
                    title={t('INVITE_MEMBERS_TO_TEAM')}
                    onClick={() => setInviteTeamMembersDialog(true)}
                    className="add-team-btn p-button p-button-sm p-component p-button-rounded p-button-icon-only"
                  >
                    <span className="p-button-icon p-c pi pi-plus" />
                    <span className="p-button-label p-c">&nbsp;</span>
                  </button>
                </div>
                <ul className="layout-menu" role="menu">
                  {currentlyViewingTeam.users &&
                    currentlyViewingTeam.users.length &&
                    currentlyViewingTeam.users.map((u) => (
                      <li key={u.id} className="" role="menuitem">
                        <NavLink to="#" className="p-ripple">
                          <i className="layout-menuitem-icon pi pi-fw pi-user" />
                          <span className="layout-menuitem-text">{`${u.firstname} ${u.lastname}`}</span>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
      <TeamDialog
        dialogOpen={teamDialogOpen}
        setDialogOpen={setTeamDialogOpen}
      />

      <InviteTeamMembersDialog
        team={currentlyViewingTeam}
        dialogOpen={inviteTeamMembersDialog}
        setDialogOpen={setInviteTeamMembersDialog}
      />
    </div>
  );
};

export default AppMenu;
