import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/primereact.min.css';
import { Toast } from 'primereact/toast';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import AuthService from '../../services/authService';
import { UserContext } from '../../store';
import LogoImage from '../../assets/img/FAIRscribe-logo.png';
import { Home, ContactUs, About, MenuBar } from './components';
import './styles.css';

const authProviders = [
	{ label: 'Scribe', value: 'scribe' },
	{ label: 'ORCID', value: 'orcid' },
	{ label: 'Globus', value: 'globus' },
];

const Login = () => {
	const { t } = useTranslation();
	const toast = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isLoggedIn, setUser, resetData } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(null);
	const [authProvider, setAuthProvider] = useState(authProviders[0]);
	const [currentPage, setCurrentPage] = useState('home');
	const { search } = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
		// resetData();
		const accessToken = new URLSearchParams(search).get('access_token');
		if (accessToken) {
			setIsLoading(true);
			AuthService.verify(accessToken)
				.then(({ data }) => {
					setUser({
						...data,
						access_token: accessToken,
						isLoggedIn: true,
					});
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					//
				});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(
		() => {
			if (isLoggedIn) {
				navigate('/');
			}
		}, [isLoggedIn]
	);

	const authScribe = () => {
		AuthService.login(email, password)
			.then((res) => {
				setUser({
					...res.data.user,
					access_token: res.data.access_token,
					isLoggedIn: true,
				});
			})
			.catch((err) => {
				let error = 'Something went wrong';
				if (err.response) {
					const statusCode = err.response && err.response.status;
					error = statusCode === 422 ? err.response.data.errors[Object.keys(err.response.data.errors)[0]][0] : err.response.data.error;
				}
				toast.current.show({
					severity: 'error',
					summary: 'Oops!',
					detail: error,
				});
			});
	};

	const authWithORCID = async () => {
		window.location.href = process.env.REACT_APP_ORCID_REDIRECT_URL;
	};

	const authWithGlobus = async () => {
		// eslint-disable-next-line no-alert
		alert('Not yet implemented');
	};

	const loginHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		switch (authProvider) {
		case 'scribe':
			authScribe();
			break;
		case 'orcid':
			authWithORCID();
			break;
		case 'globus':
			authWithGlobus();
			break;
		default:
		}
		setIsLoading(false);
	};

	const renderPage = () => {
		switch (currentPage) {
		case 'home': return <Home />;
		case 'about': return <About />;
		case 'contact-us': return <ContactUs />;
		case 'login': return (
			<div
				className="p-d-flex p-jc-center p-ai-center p-flex-column"
				style={{ height: '85vh' }}
			>
				<div className="p-d-flex p-jc-center p-ai-center p-flex-column">
					<div className="p-text-center">
						<img
							src={LogoImage}
							alt="FAIRscribe logo"
							width="100px"
							style={{ margin: '25px 0' }}
						/>
					</div>
					<div
						className="p-d-flex p-flex-column p-p-6 p-shadow-5 rounded"
						style={{ width: '500px', maxWidth: '100%' }}
					>
						<h3 className="p-d-block p-text-center p-mb-5">
							{t('LOGIN_WITH')}
						</h3>
						<form onSubmit={loginHandler}>
							<div className="p-grid p-fluid p-formgrid p-justify-center p-mb-6">
								<div className="p-col-12 p-md-8">
									<Dropdown
										value={authProvider}
										options={authProviders}
										onChange={(e) => setAuthProvider(e.value)}
									/>
								</div>
							</div>
							<div className="p-grid p-fluid p-formgrid p-justify-center">
								{authProvider === 'scribe' && (
									<div className="p-col-12 p-md-8">
										<InputText
											id="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email"
										/>
										<Password
											className="p-mt-3"
											id="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Enter your password"
											feedback={false}
										/>
									</div>
								)}
							</div>
							<div className="p-grid p-formgrid p-justify-center p-mt-2">
								<div className="p-col-12 p-md-8 p-fluid p-text-center">
									<Button
										label={t('LOGIN_BUTTON_TEXT')}
										className="p-d-inline p-mt-4"
										loading={isLoading}
										type="submit"
										onClick={loginHandler}
									/>
								</div>
								<p className="p-col-12 p-md-12 p-text-center p-mt-6">
									<NavLink to="/register">{t('SIGN_UP_LINK_TEXT')}</NavLink>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
		default: return <Home />;
		}
	};

	return (
		<div className="login-pages">
			<Toast ref={toast} position="top-right" />
			<MenuBar setCurrentPage={setCurrentPage} />
			{renderPage()}
			<Footer />
		</div>
	);
};

export default Login;