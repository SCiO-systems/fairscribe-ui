import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import React, { useState } from 'react';
import Logo from './../assets/img/dataSCRIBE-logo.png';

const authProviders = [
  { label: 'Scribe', value: 'scribe' },
  { label: 'Globus', value: 'globus' },
  { label: 'Orchid', value: 'orchid' },
];

export const Login = () => {
  const [authProvider, setAuthProvider] = useState(authProviders[0]);

  return (
    <div className="login-body">
      <img src={Logo} alt="dataSCRIBE Logo" className="img-logo" />
      <div className="p-d-flex p-jc-center p-ai-center p-mt-6">
        <div className="p-d-flex p-flex-column p-p-6 p-shadow-5">
          <h3 className="p-d-block p-text-center p-mb-4">Login with</h3>
          <div className="p-grid">
            <Dropdown
              value={authProvider}
              options={authProviders}
              onChange={(e) => setAuthProvider(e.value)}
              placeholder="Select"
              className="p-col-12 p-md-12 p-mt-2 p-mb-6"
            ></Dropdown>
            <Button
              label="Login"
              className="p-col-12 p-md-6 p-mr-auto p-mx-auto p-mt-6"
              type="button"
            ></Button>
            <p className="p-col-12 p-md-12 p-text-center p-mt-4">
              <a href="/">Sign-up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
