import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useEffect } from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider, ToastProvider } from './store';
import 'primeflex/primeflex.css';
import './styles/app.scss';

const AppWrapper = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const findRoute = (pathname) => {
		switch (pathname) {
		case '/login':
			return <Routes><Route path="/login" element={<Login />} /></Routes>;
		case '/register':
			return <Routes><Route path="/register" element={<Register />} /></Routes>;
		default:
			return (
				<App />
			);
		}
	};

	return (
		<UserProvider>
			<ToastProvider>
				<App />
			</ToastProvider>
		</UserProvider>
	);

	// return <UserProvider>{findRoute(location.pathname)}</UserProvider>;
};

export default AppWrapper;
