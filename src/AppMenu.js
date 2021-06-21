import { Button } from 'primereact/button';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Logo from './assets/img/dataSCRIBE-Horizontal.png';
import InviteTeamMembersDialog from './components/dialogs/InviteTeamMembersDialog';
import TeamDialog from './components/dialogs/TeamDialog';
import { UserContext } from './store';
import { getOwnedTeams, getSharedTeams } from './services/teams';

const AppMenu = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const { currentlyViewingTeam, ownTeams, sharedTeams, id, setData } =
    useContext(UserContext);
  const [inviteTeamMembersDialog, setInviteTeamMembersDialog] = useState(false);

  // eslint-disable-next-line
  useEffect(async () => {
    const ownTeamsRes = await getOwnedTeams(id);
    const sharedTeamsRes = await getSharedTeams();
    setData({
      ownTeams: ownTeamsRes,
      sharedTeams: sharedTeamsRes,
    });
  }, []);

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
              {ownTeams.length &&
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
              {sharedTeams.length &&
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
                    title={t('INVITE_MEMBERS_TO_TEAM', {
                      teamName: currentlyViewingTeam.name,
                    })}
                    onClick={() => setInviteTeamMembersDialog(true)}
                    className="add-team-btn p-button p-button-sm p-component p-button-rounded p-button-icon-only"
                  >
                    <span className="p-button-icon p-c pi pi-plus" />
                    <span className="p-button-label p-c">&nbsp;</span>
                  </button>
                </div>
                <ul className="layout-menu" role="menu">
                  {currentlyViewingTeam.members &&
                    currentlyViewingTeam.members.length &&
                    currentlyViewingTeam.members.map((m) => (
                      <li key={m} className="" role="menuitem">
                        <NavLink to="#" className="p-ripple">
                          <i className="layout-menuitem-icon pi pi-fw pi-user" />
                          <span className="layout-menuitem-text">{m}</span>
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
        dialogOpen={inviteTeamMembersDialog}
        setDialogOpen={setInviteTeamMembersDialog}
      />
    </div>
  );
};

export default AppMenu;
