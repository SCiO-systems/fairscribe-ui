import { Button } from 'primereact/button';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBreadcrumb from './AppBreadcrumb';
import MiniLogo from './assets/img/dataSCRIBE-mini.png';

const AppTopbar = ({ onMenuButtonClick, routers, displayName, signOut }) => {
  const { t } = useTranslation();

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
          <li>
            <Link to="/account-settings" style={{ width: '100%' }}>
              <Button
                label={t('ACCOUNT_SETTINGS')}
                icon="pi pi-cog"
                className="p-button-secondary p-button-sm"
              />
            </Link>
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
