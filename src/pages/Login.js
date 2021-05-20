import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const authProviders = [
  { label: 'Scribe', value: 'scribe' },
  { label: 'Globus', value: 'globus' },
  { label: 'OrchID', value: 'orchid' },
];

const Login = () => {
  const { t } = useTranslation();
  const [authProvider, setAuthProvider] = useState(authProviders[0]);
  const history = useHistory();

  const navigateToDashboard = (e) => {
    e.preventDefault();
    history.push('/dashboard');
  };

  return (
    <>
      <div className="login-body">
        <Logo />
        <div className="p-d-flex p-jc-center p-ai-center p-mt-6">
          <div className="p-d-flex p-flex-column p-p-6 p-shadow-5 rounded">
            <h3 className="p-d-block p-text-center p-mb-5">
              {t('LOGIN_WITH')}
            </h3>
            <div className="p-grid p-fluid p-mt-2">
              <div className="p-col-12">
                <Dropdown
                  value={authProvider}
                  options={authProviders}
                  onChange={(e) => setAuthProvider(e.value)}
                  placeholder="Select"
                  className="p-d-flex"
                />
              </div>
              <div className="p-col-12 p-text-center">
                <Button
                  label="Login"
                  className="p-d-inline p-mt-6"
                  type="button"
                  style={{ maxWidth: '80%' }}
                  onClick={navigateToDashboard}
                />
              </div>
              <p className="p-col-12 p-md-12 p-text-center p-mt-4">
                <Link to="/register">Sign-up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
