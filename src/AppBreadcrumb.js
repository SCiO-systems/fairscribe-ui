import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const AppBreadcrumb = ({ routers }) => {
  const location = useLocation();
  const { pathname } = location;

  let name = pathname.replace('/', '');
  if (routers) {
    const currentRouter = routers.find((router) => router.path === pathname);
    name = currentRouter ? currentRouter.meta.breadcrumb[0].label : name;
  }

  return <span>{name}</span>;
};

export default withRouter(AppBreadcrumb);
