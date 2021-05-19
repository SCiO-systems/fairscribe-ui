import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const authProviders = [
  { label: 'Scribe', value: 'scribe' },
  { label: 'Globus', value: 'globus' },
  { label: 'Orchid', value: 'orchid' },
];

export const Login = () => {
  const [authProvider, setAuthProvider] = useState(authProviders[0]);

  return (
    <div className="login-body">
      <Logo />
      <div className="p-d-flex p-jc-center p-ai-center p-mt-6">
        <div className="p-d-flex p-flex-column p-p-6 p-shadow-5 rounded">
          <h3 className="p-d-block p-text-center p-mb-5">Login with</h3>
          <div className="p-grid p-fluid p-mt-2">
            <div className="p-col-12">
              <Dropdown
                value={authProvider}
                options={authProviders}
                onChange={(e) => setAuthProvider(e.value)}
                placeholder="Select"
                className="p-d-flex"
              ></Dropdown>
            </div>
            <div className="p-col-12 p-text-center">
              <Button
                label="Login"
                className="p-d-inline p-mt-6"
                type="button"
                style={{ maxWidth: '80%' }}
              ></Button>
            </div>
            <p className="p-col-12 p-md-12 p-text-center p-mt-4">
              <Link to="/register">Sign-up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
