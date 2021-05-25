import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImage from '../assets/img/dataSCRIBE-logo.png';

const Logo = () => (
  <div className="p-text-center">
    <NavLink to="/">
      <img
        src={LogoImage}
        alt="dataSCRIBE logo"
        width="100px"
        style={{ margin: '25px 0' }}
      />
    </NavLink>
  </div>
);

export default Logo;
