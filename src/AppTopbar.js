import React from "react";
import AppBreadcrumb from "./AppBreadcrumb";
import { Button } from "primereact/button";

const AppTopbar = (props) => {
  return (
    <div className="layout-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="menu-button p-link"
          onClick={props.onMenuButtonClick}
        >
          <i className="pi pi-chevron-left"></i>
        </button>
        <span className="topbar-separator"></span>

        <div
          className="layout-breadcrumb viewname"
          style={{ textTransform: "uppercase" }}
        >
          <AppBreadcrumb routers={props.routers} />
        </div>

        <img
          id="logo-mobile"
          className="mobile-logo"
          src="assets/layout/images/logo-dark.svg"
          alt="diamond-layout"
        />
      </div>

      <div className="topbar-right">
        <ul className="topbar-menu">
          <li className="p-d-flex p-ai-center">
            <img
              src="/assets/img/user-default.png"
              alt="diamond-layout"
              className="profile-image p-mr-4"
            />
            <span className="p-mr-4 profile-name">
              <small>Logged in as:</small>
              <br />
              Test User with long name
            </span>
          </li>
          <li>
            <Button
              label="Account Settings"
              icon="pi pi-cog"
              className="p-button-secondary p-button-sm"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppTopbar;
