import classNames from 'classnames';
import React, { useEffect, useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import AppTopBar from './AppTopbar';
import AccountSettings from './pages/AccountSettings';
import Dashboard from './pages/Dashboard';
import { UserContext } from './store/index';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [menuMode] = useState('static');
  const [colorScheme] = useState('light');
  const [menuTheme] = useState('layout-sidebar-darkgray');
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] =
    useState(false);
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [configActive, setConfigActive] = useState(false);
  const [inputStyle] = useState('outlined');
  const [ripple] = useState(false);
  const user = useContext(UserContext);

  let menuClick = false;
  let searchClick = false;
  let configClick = false;

  const routers = [
    {
      path: '/',
      component: Dashboard,
      exact: true,
      meta: { breadcrumb: [{ parent: 'My Dashboard', label: 'My Dashboard' }] },
    },
    {
      path: '/account-settings',
      component: AccountSettings,
      exact: true,
      meta: {
        breadcrumb: [{ parent: 'My Dashboard', label: 'Account Settings' }],
      },
    },
  ];

  const onRootMenuitemClick = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  const isIE = () =>
    /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);

  const onSearchHide = () => {
    setSearchActive(false);
    searchClick = false;
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          `(^|\\b)${'blocked-scroll'.split(' ').join('|')}(\\b|$)`,
          'gi',
        ),
        ' ',
      );
    }
  };

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false);
    setStaticMenuMobileActive(false);
    unblockBodyScroll();
  };

  const isSlim = () => menuMode === 'slim';

  const isOverlay = () => menuMode === 'overlay';

  const isDesktop = () => window.innerWidth > 991;

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  };

  useEffect(() => {
    if (staticMenuMobileActive) {
      blockBodyScroll();
    } else {
      unblockBodyScroll();
    }
  }, [staticMenuMobileActive]);

  const replaceLink = (linkElement, href) => {
    if (isIE()) {
      linkElement.setAttribute('href', href);
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', `${id}-clone`);

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling,
      );

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

  useEffect(() => {
    changeStyleSheetUrl('layout-css', `layout-${colorScheme}.css`, 1);
    changeStyleSheetUrl('theme-css', `theme-${colorScheme}.css`, 1);
  });

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

  const onMenuClick = () => {
    menuClick = true;
  };

  const onMenuButtonClick = (event) => {
    menuClick = true;

    if (isOverlay()) {
      setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
    }

    if (isDesktop()) {
      setStaticMenuDesktopInactive(
        (prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive,
      );
    } else {
      setStaticMenuMobileActive(
        (prevStaticMenuMobileActive) => !prevStaticMenuMobileActive,
      );
    }

    event.preventDefault();
  };

  const onMenuitemClick = (event) => {
    if (!event.item.items) {
      hideOverlayMenu();

      if (isSlim()) {
        setMenuActive(false);
      }
    }
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
      'layout-static-inactive':
        staticMenuDesktopInactive && menuMode === 'static',
      'p-input-filled': inputStyle === 'filled',
      'p-ripple-disabled': !ripple,
    },
    colorScheme === 'light' ? menuTheme : '',
  );

  const signOut = () => {
    user.setData({
      userId: '',
      name: '',
      token: '',
      language: 'en',
    });
  };

  if (!user.token) {
    return <Redirect to="/login" />;
  }

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
          displayName={user.name}
          signOut={signOut}
          routers={routers}
          onMenuButtonClick={onMenuButtonClick}
        />

        <div className="layout-content">
          {routers.map((router) => {
            if (router.exact) {
              return (
                <Route
                  key={router.path}
                  path={router.path}
                  exact
                  component={router.component}
                />
              );
            }

            return (
              <Route
                key={router.path}
                path={router.path}
                component={router.component}
              />
            );
          })}
        </div>

        <AppFooter />
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

export default App;
