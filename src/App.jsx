import React, { useContext, useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import { Route, useNavigate, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import AccountSettings from './pages/AccountSettings';
import Dashboard from './pages/Dashboard';
import Resource from './pages/MyTeams/components/ResourcesTable/components/Resource';
import MyTeams from './pages/MyTeams';
import Login from './pages/Login';
import Register from './pages/Register';
import Loader from './components/Loader';
import AuthService from './services/authService';
import { ToastContext, UserContext } from './store';
import { http } from './services';
import Menu from './components/Menu';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';

const App = () => {
	const toast = useRef();

	const location = useLocation();

	const [isLoading, setIsLoading] = useState(true);
	// const [toggleLoader, setToggleLoader] = useState(false);
	const [toggleLoader, setToggleLoader] = useState(0);

	const {
		resetData,
		isLoggedIn,
		access_token: accessToken,
		setUser,
	} = useContext(UserContext);

	const { content: toastContent, clear: toastClear } = useContext(ToastContext);
	const { setError } = useContext(ToastContext);
	const { t } = useTranslation();

	const navigate = useNavigate();

	const routers = [
		{
			path: '/',
			component: <Dashboard />,
			exact: true,
			meta: { breadcrumb: [{ parent: t('DASHBOARD'), label: t('DASHBOARD') }] },
		},
		// {
		// 	path: '/login',
		// 	component: <Login />,
		// 	exact: true,
		// 	meta: { breadcrumb: [{ parent: t('DASHBOARD'), label: t('DASHBOARD') }] },
		// },
		// {
		// 	path: '/register',
		// 	component: <Register />,
		// 	exact: true,
		// 	meta: { breadcrumb: [{ parent: t('DASHBOARD'), label: t('DASHBOARD') }] },
		// },
		{
			path: '/account-settings',
			component: <AccountSettings />,
			exact: true,
			meta: {
				breadcrumb: [{ parent: t('ACCOUNT_SETTINGS'), label: t('ACCOUNT_SETTINGS') }],
			},
		},
		{
			path: '/teams/:id',
			component: <MyTeams />,
			exact: true,
			meta: {
				breadcrumb: [{ parent: t('DASHBOARD'), label: t('TEAM_DASHBOARD') }],
			},
		},
		{
			path: '/teams/:teamId/resources/:resourceId/mode/:mode',
			component: <Resource />,
			exact: true,
			meta: {
				breadcrumb: [{ parent: t('TEAM_DASHBOARD'), label: t('RESOURCE') }],
			},
		},
	];

	useEffect(
		() => {
			if (!isLoggedIn) {
				navigate('/login');
			}
		}, [isLoggedIn]
	);

	useEffect(() => {
		if (toastContent === null) return;
		toast.current?.show({ ...toastContent });
	}, [toastContent]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
		http.interceptors.request.use(
			(config) => {
				if (!config.url.includes('/integrations/vocabularies/autocomplete') && !config.url.includes('/integrations/vocabularies/autosuggest')) {
					setToggleLoader((prev) => prev + 1);
				}
				return config;
			},
			(error) => {
				setToggleLoader((prev) => prev + 1);
				return Promise.reject(error);
			}
		);

		http.interceptors.response.use(
			(response) => {
				if (!response.config.url.includes('/integrations/vocabularies/autocomplete') && !response.config.url.includes('/integrations/vocabularies/autosuggest')) {
					setToggleLoader((prev) => prev - 1);
				}
				return response;
			},
			(error) => {
				setToggleLoader((prev) => prev - 1);
				if (axios.isCancel(error)) return () => {};
				return Promise.reject(error);
			}
		);
		if (accessToken) {
			AuthService.verify(accessToken)
				.then(({ data }) => {
					setUser({
						...data,
						access_token: accessToken,
						isLoggedIn: true,
					});
					setIsLoading(false);
				})
				.catch(() => {
					resetData();
				});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	switch (location.pathname) {
	case '/login':
		return <Routes><Route path="/login" element={<Login />} /></Routes>;
	case '/register':
		return <Routes><Route path="/register" element={<Register />} /></Routes>;
	default:

		return (
			<>
				{toggleLoader ? <Loader /> : null}
				<Toast ref={toast} position="top-right" onHide={toastClear} onRemove={toastClear} />
				<Menu routers={routers} />
			</>
		);
	}
};

export default App;
