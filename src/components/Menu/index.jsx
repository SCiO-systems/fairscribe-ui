import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Route, Routes } from 'react-router-dom';
import { AppTopBar, AppMenu } from './components';
import AuthService from '../../services/authService';
import { UserContext } from '../../store';
import Footer from '../Footer';
import RepositoriesService from '../../services/repositoriesService';
import { handleError } from '../../utilities/errors';

const initialState = {
	repositoryTypes: null,
};

export const ApiDataContext = createContext(initialState);

const Menu = (props) => {
	const { children, routers } = props;

	const {
		resetData,
		firstname,
		lastname,
		access_token: accessToken,
	} = useContext(UserContext);

	const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
	const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
	const [searchActive, setSearchActive] = useState(false);
	const [configActive, setConfigActive] = useState(false);
	const [inputStyle] = useState('outlined');
	const [menuTheme] = useState('layout-sidebar-darkgray');
	const [overlayMenuActive, setOverlayMenuActive] = useState(false);
	const [ripple] = useState(false);
	const [menuActive, setMenuActive] = useState(false);
	const [menuMode] = useState('static');
	const [colorScheme] = useState('light');
	const [repositoryTypes, setRepositoryTypes] = useState(null);

	let menuClick = false;
	let searchClick = false;
	let configClick = false;

	const getRepositoryTypes = () => {
		RepositoriesService.getRepositoryTypes2()
			.then((res) => {
				setRepositoryTypes(res.repository_types);
			});
	};

	const apiContextValue = useMemo(() => {
		return {
			repositoryTypes,
		};
	}, [repositoryTypes]);

	useEffect(() => {
		if (staticMenuMobileActive) {
			if (document.body.classList) {
				document.body.classList.add('blocked-scroll');
			} else {
				document.body.className += ' blocked-scroll';
			}
		} else {
			unblockBodyScroll();
		}
	}, [staticMenuMobileActive]);

	useEffect(() => {
		getRepositoryTypes();

		changeStyleSheetUrl('layout-css', `layout-${colorScheme}.css`, 1);
		changeStyleSheetUrl('theme-css', `theme-${colorScheme}.css`, 1);
	}, []);

	const unblockBodyScroll = () => {
		if (document.body.classList) {
			document.body.classList.remove('blocked-scroll');
		} else {
			document.body.className = document.body.className.replace(
				new RegExp(`(^|\\b)${'blocked-scroll'.split(' ').join('|')}(\\b|$)`, 'gi'),
				' '
			);
		}
	};

	const isIE = () => /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);

	const replaceLink = (linkElement, href) => {
		if (isIE()) {
			linkElement.setAttribute('href', href);
		} else {
			const id = linkElement.getAttribute('id');
			const cloneLinkElement = linkElement.cloneNode(true);

			cloneLinkElement.setAttribute('href', href);
			cloneLinkElement.setAttribute('id', `${id}-clone`);

			linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

			cloneLinkElement.addEventListener('load', () => {
				linkElement.remove();
				cloneLinkElement.setAttribute('id', id);
			});
		}
	};

	const changeStyleSheetUrl = (id, value, from) => {
		const element = document.getElementById(id);
		const urlTokens = element.getAttribute('href').split('/');

		if (from === 1) {
			// which function invoked this function
			urlTokens[urlTokens.length - 1] = value;
		} else if (from === 2) {
			// which function invoked this function
			if (value !== null) {
				urlTokens[urlTokens.length - 2] = value;
			}
		} else if (from === 3) {
			// which function invoked this function
			urlTokens[urlTokens.length - 2] = value;
		}

		const newURL = urlTokens.join('/');

		replaceLink(element, newURL);
	};

	const isOverlay = () => menuMode === 'overlay';

	const isDesktop = () => window.innerWidth > 991;
	const onRootMenuitemClick = () => {
		setMenuActive((prevMenuActive) => !prevMenuActive);
	};

	const onMenuClick = () => {
		menuClick = true;
	};

	const onMenuitemClick = (event) => {
		if (!event.item.items) {
			hideOverlayMenu();

			if (isSlim()) {
				setMenuActive(false);
			}
		}
	};
	const onMenuButtonClick = (event) => {
		menuClick = true;

		if (isOverlay()) {
			setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
		}

		if (isDesktop()) {
			setStaticMenuDesktopInactive(
				(prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive
			);
		} else {
			setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
		}

		event.preventDefault();
	};

	const onSearchHide = () => {
		setSearchActive(false);
		searchClick = false;
	};

	const hideOverlayMenu = () => {
		setOverlayMenuActive(false);
		setStaticMenuMobileActive(false);
		unblockBodyScroll();
	};

	const isSlim = () => menuMode === 'slim';

	const onDocumentClick = () => {
		if (!searchClick && searchActive) {
			onSearchHide();
		}

		if (!menuClick) {
			if (isSlim()) {
				setMenuActive(false);
			}

			if (overlayMenuActive || staticMenuMobileActive) {
				hideOverlayMenu();
			}

			unblockBodyScroll();
		}

		if (configActive && !configClick) {
			setConfigActive(false);
		}

		searchClick = false;
		configClick = false;
		menuClick = false;
	};

	const containerClassName = classNames(
		'layout-wrapper',
		{
			'layout-overlay': menuMode === 'overlay',
			'layout-static': menuMode === 'static',
			'layout-slim': menuMode === 'slim',
			'layout-sidebar-dim': colorScheme === 'dim',
			'layout-sidebar-dark': colorScheme === 'dark',
			'layout-overlay-active': overlayMenuActive,
			'layout-mobile-active': staticMenuMobileActive,
			'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
			'p-input-filled': inputStyle === 'filled',
			'p-ripple-disabled': !ripple,
		},
		colorScheme === 'light' ? menuTheme : ''
	);

	return (
		<div
			className={containerClassName}
			data-theme={colorScheme}
			onClick={onDocumentClick}
			role="button"
			tabIndex="0"
		>
			<div className="layout-content-wrapper">
				<AppTopBar
					displayName={`${firstname} ${lastname}`}
					signOut={() => AuthService.logout().then(() => resetData())}
					routers={routers}
					onMenuButtonClick={onMenuButtonClick}
				/>
				<ApiDataContext.Provider value={apiContextValue}>
					<div className="layout-content">
						<Routes>
							{routers.map((router) => {
								if (router.exact) {
									return (
										<Route key={router.path} path={router.path} exact element={router.component} />
									);
								}

								return <Route key={router.path} path={router.path} element={router.component} />;
							})}
						</Routes>
					</div>
				</ApiDataContext.Provider>
				<Footer />
			</div>

			<AppMenu
				menuMode={menuMode}
				active={menuActive}
				mobileMenuActive={staticMenuMobileActive}
				onMenuClick={onMenuClick}
				onMenuitemClick={onMenuitemClick}
				onRootMenuitemClick={onRootMenuitemClick}
			/>
			<div className="layout-mask modal-in" />
		</div>
	);
};

export default Menu;
