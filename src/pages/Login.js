import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import 'primereact/resources/primereact.min.css';
import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import { NavLink, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { UserContext } from '../store';
import { login, getUser } from '../services/auth';

const authProviders = [
  { label: 'Scribe', value: 'scribe' },
  { label: 'Globus', value: 'globus' },
  { label: 'OrchID', value: 'orchid' },
];

const Login = () => {
  const { t } = useTranslation();
  const toast = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(null);
  const [authProvider, setAuthProvider] = useState(authProviders[0]);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const { data: responseData } = await login(email, password);
      setIsLoading(null);
      setUser({
        ...responseData.data.user,
        access_token: responseData.data.access_token,
        isLoggedIn: true,
      });
    } catch (e) {
      setIsLoading(null);
      const statusCode = e.response && e.response.status;
      console.log(e, e.response);
      const error =
        statusCode === 422
          ? e.response.data.errors[Object.keys(e.response.data.errors)[0]][0]
          : e.response.data.error;
      toast.current.show({
        severity: 'error',
        summary: 'Oops!',
        detail: error,
      });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="login-body">
        <Logo />
        <div className="p-d-flex p-jc-center p-ai-center p-mt-6">
          <div
            className="p-d-flex p-flex-column p-p-6 p-shadow-5 rounded"
            style={{ minWidth: '535px' }}
          >
            <h3 className="p-d-block p-text-center p-mb-5">
              {t('LOGIN_WITH')}
            </h3>
            <form onSubmit={(e) => e.preventDefault()}>
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
                {authProvider === 'scribe' && (
                  <div className="p-col-12">
                    <InputText
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    <Password
                      className="p-mt-4"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      feedback={false}
                    />
                  </div>
                )}
                <div className="p-col-12 p-text-center">
                  <Button
                    label={t('LOGIN_BUTTON_TEXT')}
                    className="p-d-inline p-mt-4"
                    icon={isLoading ? 'pi pi-spin pi-spinner' : null}
                    type="submit"
                    disabled={isLoading}
                    style={{ maxWidth: '80%' }}
                    onClick={loginHandler}
                  />
                </div>
                <p className="p-col-12 p-md-12 p-text-center p-mt-2">
                  <NavLink to="/register">{t('SIGN_UP_LINK_TEXT')}</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
