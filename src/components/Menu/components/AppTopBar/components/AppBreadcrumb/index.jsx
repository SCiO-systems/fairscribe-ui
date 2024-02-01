import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';

const AppBreadcrumb = ({ routers }) => {
	const location = useLocation();
	const { pathname } = location;

	let name = pathname.replace('/', '');
	if (routers) {
		// eslint-disable-next-line
    const currentRouter = routers.find((router) => {
			const mp = matchPath({ path: router.path }, pathname);
			return mp ? mp.isExact : false;
		});
		name = currentRouter ? currentRouter.meta.breadcrumb[0].label : name;
	}

	return <span>{name}</span>;
};

export default AppBreadcrumb;
