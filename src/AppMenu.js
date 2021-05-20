import React from "react";
import { Link } from "react-router-dom";

const AppMenu = (props) => {
  return (
    <div className="layout-sidebar" onClick={props.onMenuClick}>
      <div className="logo">
        <img
          id="app-logo"
          className="logo-image"
          src="assets/layout/images/logo-white.svg"
          alt="diamond layout"
        />
        <span className="app-name">dataSCRIBE</span>
      </div>

      <div className="layout-menu-container">
        <ul className="layout-menu" role="menu">
          <li className="layout-root-menuitem" role="menuitem">
            <ul className="layout-menu" role="menu">
              <li className="" role="menuitem">
                <Link to="/dashboard" className="p-button p-ripple">
                  <i className="layout-menuitem-icon pi pi-fw pi-home"></i>
                  <span className="layout-menuitem-text">My Dashboard</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-separator" role="separator"></li>
          <li className="layout-root-menuitem" role="menuitem">
            <button type="button" className="p-ripple p-link">
              <i className="layout-menuitem-icon pi pi-fw pi-users"></i>
              <span className="layout-menuitem-text">My Teams</span>
              <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
            </button>
            <div className="layout-root-menuitem p-d-flex p-ai-center p-jc-between">
              <div className="layout-menuitem-root-text">My Teams</div>
              <button className="add-team-btn p-button p-button-sm p-component p-button-rounded p-button-icon-only">
                <span className="p-button-icon p-c pi pi-plus"></span>
                <span className="p-button-label p-c">&nbsp;</span>
              </button>
            </div>
            <ul className="layout-menu" role="menu">
              <li className="" role="menuitem">
                <Link to="/dashboard" className="p-ripple">
                  <i className="layout-menuitem-icon pi pi-fw pi-users"></i>
                  <span className="layout-menuitem-text">EiA Team</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-separator" role="separator"></li>
          <li className="layout-root-menuitem" role="menuitem">
            <button type="button" className="p-ripple p-link">
              <i className="layout-menuitem-icon pi pi-fw pi-users"></i>
              <span className="layout-menuitem-text">Shared Teams</span>
              <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
            </button>
            <div className="layout-root-menuitem">
              <div className="layout-menuitem-root-text">Shared Teams</div>
            </div>
            <ul className="layout-menu" role="menu">
              <li className="" role="menuitem">
                <Link to="/dashboard" className="p-ripple">
                  <i className="layout-menuitem-icon pi pi-fw pi-users"></i>
                  <span className="layout-menuitem-text">CSI Team</span>
                </Link>
              </li>
              <li className="" role="menuitem">
                <Link to="/dashboard" className="p-ripple">
                  <i className="layout-menuitem-icon pi pi-fw pi-users"></i>
                  <span className="layout-menuitem-text">Org Data Team</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppMenu;
