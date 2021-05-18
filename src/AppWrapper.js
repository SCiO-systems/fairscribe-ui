import React, { useEffect } from 'react';
import { Route, useLocation, withRouter } from 'react-router-dom';
import { Login } from './pages/Login';

const AppWrapper = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  switch (location.pathname) {
    case '/login':
      return <Route path="/login" component={Login} />;
    default:
      return <Login />;
  }
};

export default withRouter(AppWrapper);
