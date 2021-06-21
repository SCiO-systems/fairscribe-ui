import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useEffect, useContext, useRef } from 'react';
import { Route, useLocation, withRouter } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider, UserContext } from './store';
import { setupMiddleware, removeMiddleware } from './utilities/api-client';
import { logout } from './services/auth';
import './styles/app.scss';

const findRoute = (pathname) => {
  switch (pathname) {
    case '/login':
      return <Route path="/login" component={Login} />;
    case '/register':
      return <Route path="/register" component={Register} />;
    default:
      return <App />;
  }
};

const AppWrapper = () => {
  const { resetData } = useContext(UserContext);
  const location = useLocation();
  const toast = useRef();

  useEffect(() => {
    setupMiddleware((error) => {
      if (
        error.response &&
        (error.response.status === 419 ||
          error.response.status === 401 ||
          error.response.status === 403) &&
        error.response.config.url !== '/api/v1/logout'
      ) {
        logout()
          .then(() => {
            resetData();
          })
          .finally(() => resetData());
      } else if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Oops!',
          detail: 'Something went wrong.',
        });
      }
    });
    return () => removeMiddleware();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <UserProvider>
      <Toast ref={toast} position="top-right" />
      {findRoute(location.pathname)}
    </UserProvider>
  );
};

export default withRouter(AppWrapper);
