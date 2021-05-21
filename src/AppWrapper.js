import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useEffect } from 'react';
import { Route, useLocation, withRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import store from './store';
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
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <store.UserProvider>{findRoute(location.pathname)}</store.UserProvider>
  );
};

export default withRouter(AppWrapper);
