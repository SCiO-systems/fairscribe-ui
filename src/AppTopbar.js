import { Button } from 'primereact/button';
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import AppBreadcrumb from './AppBreadcrumb';
import { UserContext } from './store';
import MiniLogo from './assets/img/dataSCRIBE-mini.png';
import { getSharedTeams } from './services/teams';
import { getMyInvites, acceptInvite, rejectInvite } from './services/invites';

const AppTopbar = ({ onMenuButtonClick, routers, displayName, signOut }) => {
  const { t } = useTranslation();
  const [notificationMenuVisible, setNotificationMenuVisible] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const { id: userId, setUser } = useContext(UserContext);

  useEffect(() => {
    getMyInvites(userId).then((resp) => setInvitations(resp.data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshInvites = () =>
    getMyInvites(userId).then((resp) => setInvitations(resp.data));
  const reject = (invId) => rejectInvite(userId, invId).then(refreshInvites);
  const accept = (invId) =>
    acceptInvite(userId, invId)
      .then(getSharedTeams)
      .then((sharedTeamsRes) => setUser({ sharedTeams: sharedTeamsRes.data }))
      .then(refreshInvites);

  return (
    <div className="layout-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="menu-button p-link"
          onClick={onMenuButtonClick}
        >
          <i className="pi pi-chevron-left" />
        </button>
        <span className="topbar-separator" />

        <div
          className="layout-breadcrumb viewname"
          style={{ textTransform: 'uppercase' }}
        >
          <AppBreadcrumb routers={routers} />
        </div>

        <img
          id="logo-mobile"
          className="mobile-logo"
          src={MiniLogo}
          alt="dataSCRIBE"
        />
      </div>

      <div className="topbar-right">
        <ul className="topbar-menu">
          <li className="p-d-flex p-ai-center">
            <img
              src="/assets/img/user-default.png"
              alt="user"
              className="profile-image p-mr-4"
            />
            <span className="p-mr-4 profile-name">
              <small>{t('LOGGED_IN_AS')}</small>
              <br />
              {displayName}
            </span>
          </li>
          <li className="notifications-item active-menuitem">
            <button
              type="button"
              className="p-link"
              onClick={() =>
                invitations.length &&
                setNotificationMenuVisible(!notificationMenuVisible)
              }
            >
              <i className="pi pi-bell" />
              {invitations && invitations.length > 0 && (
                <span className="topbar-badge">{invitations.length}</span>
              )}
            </button>
            {notificationMenuVisible && (
              <ul className="notifications-menu fade-in-up p-pt-2">
                {invitations.map((i) => (
                  <li key={i.id} role="menuitem" className="p-mb-2">
                    <div className="p-d-flex p-jc-between">
                      <div>
                        <strong>{i.user.name}</strong> {t('INVITED_TEXT')}{' '}
                        <strong>{i.team.name}</strong>.
                      </div>
                      <div className="actionable-buttons">
                        <Button
                          title={t('ACCEPT_INVITE')}
                          label=""
                          icon="pi pi-check"
                          className="p-button-success p-button-sm"
                          onClick={() => accept(i.id)}
                        />
                        <Button
                          title={t('REJECT_INVITE')}
                          label=""
                          icon="pi pi-times"
                          className="p-button-danger p-button-sm p-ml-2"
                          onClick={() => reject(i.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/account-settings" style={{ width: '100%' }}>
              <Button
                label={t('ACCOUNT_SETTINGS')}
                icon="pi pi-cog"
                className="p-button-secondary p-button-sm"
              />
            </NavLink>
          </li>
          <li>
            <Button
              onClick={signOut}
              title={t('SIGN_OUT')}
              label=""
              icon="pi pi-sign-out"
              className="p-button-info p-button-sm"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppTopbar;
