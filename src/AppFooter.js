import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LogoSCiO from './assets/img/SCiO-sLogo-Dark.png';

const AppFooter = () => (
  <div className="layout-footer">
    <div className="footer-logo-container">
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        title="Creative Commons Attribution-ShareAlike 4.0 International License"
        target="_blank"
        rel="noreferrer"
      >
        <span className="hover-item">
          <FontAwesomeIcon
            className="p-mr-3"
            icon={['fab', 'creative-commons']}
            size="2x"
          />
          <FontAwesomeIcon
            className="p-mr-3"
            icon={['fab', 'creative-commons-by']}
            size="2x"
          />
          <FontAwesomeIcon
            className="p-mr-3"
            icon={['fab', 'creative-commons-sa']}
            size="2x"
          />
        </span>
      </a>
    </div>
    <span className="copyright p-d-flex p-ai-center p-jc-center">
      <span className="p-mr-3">powered by</span>
      <a href="https://scio.systems" rel="noreferrer" target="_blank">
        <img src={LogoSCiO} alt="SCiO Logo" height="30px" />
      </a>
    </span>
  </div>
);

export default AppFooter;
