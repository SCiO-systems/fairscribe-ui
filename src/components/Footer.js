import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LogoSCiO from '../assets/img/SCiO-sLogo-Dark.png';

library.add(fab);

const Footer = () => (
  <div className="footer">
    <div className="footer-phantom" />
    <div className="layout-footer">
      <div className="p-d-flex p-flex-row p-ai-center">
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
      <div className="p-d-flex p-flex-row p-ai-center">
        <span className="p-mr-3">powered by</span>
        <a href="https://scio.systems" rel="noreferrer" target="_blank">
          <img src={LogoSCiO} alt="SCiO Logo" height="40px" />
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
