import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { UserContext } from '../store';

const authProviders = [
  { label: 'Scribe', value: 'scribe' },
  { label: 'Globus', value: 'globus' },
  { label: 'OrchID', value: 'orchid' },
];

const Login = () => {
  const { t } = useTranslation();
  const { token, setData } = useContext(UserContext);
  const [authProvider, setAuthProvider] = useState(authProviders[0]);

  const login = () => {
    // TODO: Change this with actual login logic
    // There's no need to redirect, since the component will re-render anyway
    setData({
      userId: 1,
      name: 'John Doe',
      token: 'test-auth',
    });
  };

  if (token) {
    return <Redirect to="/" />;
  }

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
                  label={t('LOGIN_BUTTON_TEXT')}
                  className="p-d-inline p-mt-6"
                  type="button"
                  style={{ maxWidth: '80%' }}
                  onClick={login}
                />
              </div>
              <p className="p-col-12 p-md-12 p-text-center p-mt-4">
                <NavLink to="/register">{t('SIGN_UP_LINK_TEXT')}</NavLink>
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
