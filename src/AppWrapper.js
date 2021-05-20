import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React, { useEffect } from 'react';
import { Route, useLocation, withRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/app.scss';

const AppWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  switch (location.pathname) {
    case '/dashboard':
      return <Route path="/dashboard" component={App} />;
    case '/login':
      return <Route path="/login" component={Login} />;
    case '/register':
      return <Route path="/register" component={Register} />;
    default:
      return <Login />;
  }
};

export default withRouter(AppWrapper);
