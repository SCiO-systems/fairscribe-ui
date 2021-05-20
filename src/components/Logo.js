import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/img/dataSCRIBE-logo.png';

const Logo = () => (
  <div className="p-text-center">
    <Link to="/">
      <img
        src={LogoImage}
        alt="dataSCRIBE logo"
        width="100px"
        style={{ margin: '25px 0' }}
      />
    </Link>
  </div>
);

export default Logo;
