import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';

import AppTopBar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppSearch from './AppSearch';
import AppRightMenu from './AppRightMenu';

import { Dashboard } from './components/Dashboard';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { ButtonDemo } from './components/ButtonDemo';
import { TableDemo } from './components/TableDemo';
import { ListDemo } from './components/ListDemo';
import { TreeDemo } from './components/TreeDemo';
import { PanelDemo } from './components/PanelDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { MediaDemo } from './components/MediaDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { FileDemo } from './components/FileDemo';
import { ChartDemo } from './components/ChartDemo';
import { MiscDemo } from './components/MiscDemo';
import { Documentation } from './components/Documentation';
import { IconsDemo } from './utilities/IconsDemo';
import { Widgets } from './utilities/Widgets';
import { GridDemo } from './utilities/GridDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { DisplayDemo } from './utilities/DisplayDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { CrudDemo } from './pages/CrudDemo';
import { CalendarDemo } from './pages/CalendarDemo';
import { Invoice } from './pages/Invoice';
import { Help } from './pages/Help';
import { EmptyPage } from './pages/EmptyPage';

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import { InvalidStateDemo } from './components/InvalidStateDemo';
import { TimelineDemo } from './pages/TimelineDemo';

const App = () => {

    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [colorScheme, setColorScheme] = useState('light');
    const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [logoColor, setLogoColor] = useState('white');
    const [componentTheme, setComponentTheme] = useState('blue');
    const [logoUrl, setLogoUrl] = useState('assets/layout/images/logo-dark.svg')


    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    const menu = [
        {
            label: "Favorites", icon: "pi pi-fw pi-home",
            items: [
                { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }
            ]
        },
        { separator: true },
        {
            label: "UI Kit", icon: "pi pi-fw pi-id-card",
            items: [
                { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/formlayout" },
                { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
                { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                { label: "Invalid State", icon: 'pi pi-fw pi-exclamation-circle', to: '/invalidstate' },
                { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button", className: 'rotated-icon' },
                { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
                { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
                { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
                { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
                { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
                { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
                { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
                { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
                { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" }
            ]
        },
        { separator: true },
        {
            label: "Utilities", icon: "pi pi-fw pi-desktop",
            items: [
                { label: "Display", icon: "pi pi-fw pi-desktop", to: "/display" },
                { label: "Elevation", icon: "pi pi-fw pi-external-link", to: "/elevation" },
                { label: "Flexbox", icon: "pi pi-fw pi-directions", to: "/flexbox" },
                { label: "Icons", icon: "pi pi-fw pi-search", to: "/icons" },
                { label: "Text", icon: "pi pi-fw pi-pencil", to: "/text" },
                { label: "Widgets", icon: "pi pi-fw pi-star-o", to: "/widgets" },
                { label: "Grid System", icon: "pi pi-fw pi-th-large", to: "/grid" },
                { label: "Spacing", icon: "pi pi-fw pi-arrow-right", to: "/spacing" },
                { label: "Typography", icon: "pi pi-fw pi-align-center", to: "/typography" }
            ]
        },
        { separator: true },
        {
            label: "Pages", icon: "pi pi-fw pi-pencil",
            items: [
                { label: "Crud", icon: "pi pi-fw pi-pencil", to: "/crud" },
                { label: "Calendar", icon: "pi pi-fw pi-calendar-plus", to: "/calendar" },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                { label: "Landing", icon: "pi pi-fw pi-user-plus", url: "assets/pages/landing.html", target: "_blank" },
                { label: "Login", icon: "pi pi-fw pi-sign-in", to: "/login" },
                { label: "Invoice", icon: "pi pi-fw pi-dollar", to: "/invoice" },
                { label: "Help", icon: "pi pi-fw pi-question-circle", to: "/help" },
                { label: "Error", icon: "pi pi-fw pi-times-circle", to: "/error" },
                { label: "Not Found", icon: "pi pi-fw pi-exclamation-circle", to: "/notfound" },
                { label: "Access Denied", icon: "pi pi-fw pi-lock", to: "/access" },
                { label: "Empty", icon: "pi pi-fw pi-circle-off", to: "/empty" }
            ]
        },
        { separator: true },
        {
            label: "Hierarchy", icon: "pi pi-fw pi-align-left",
            items: [
                {
                    label: "Submenu 1", icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "Submenu 1.1", icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-align-left" }
                            ]
                        },
                        {
                            label: "Submenu 1.2", icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 1.2.1", icon: "pi pi-fw pi-align-left" }
                            ]
                        }
                    ]
                },
                {
                    label: "Submenu 2", icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "Submenu 2.1", icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "Submenu 2.2", icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                            ]
                        }
                    ]
                }
            ]
        },
        { separator: true },
        {
            label: "Start", icon: "pi pi-fw pi-download",
            items: [
                { label: "Buy Now", icon: "pi pi-fw pi-shopping-cart", command: () => window.open("https://www.primefaces.org/store", "_blank") },
                { label: "Documentation", icon: "pi pi-fw pi-info-circle", to: "/documentation" },
            ]
        }
    ];

    const routers = [
        { path: '/', component: Dashboard, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'Dashboard' }] } },
        { path: '/formlayout', component: FormLayoutDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }] } },
        { path: '/input', component: InputDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Input' }] } },
        { path: '/floatlabel', component: FloatLabelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Float Label' }] } },
        { path: '/invalidstate', component: InvalidStateDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Invalid State' }] } },
        { path: '/button', component: ButtonDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Button' }] } },
        { path: '/table', component: TableDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Table' }] } },
        { path: '/list', component: ListDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'List' }] } },
        { path: '/tree', component: TreeDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }] } },
        { path: '/panel', component: PanelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }] } },
        { path: '/overlay', component: OverlayDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }] } },
        { path: '/media', component: MediaDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Media' }] } },
        { path: '/menu', component: MenuDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/messages', component: MessagesDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }] } },
        { path: '/file', component: FileDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'File' }] } },
        { path: '/chart', component: ChartDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }] } },
        { path: '/misc', component: MiscDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }] } },
        { path: '/icons', component: IconsDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Icons' }] } },
        { path: '/widgets', component: Widgets, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Widgets' }] } },
        { path: '/grid', component: GridDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Grid System' }] } },
        { path: '/spacing', component: SpacingDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Spacing' }] } },
        { path: '/elevation', component: ElevationDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Elevation' }] } },
        { path: '/typography', component: TypographyDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Typography' }] } },
        { path: '/display', component: DisplayDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Display' }] } },
        { path: '/flexbox', component: FlexBoxDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Flexbox' }] } },
        { path: '/text', component: TextDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Text' }] } },
        { path: '/crud', component: CrudDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Crud' }] } },
        { path: '/calendar', component: CalendarDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Calendar' }] } },
        { path: '/timeline', component: TimelineDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Timeline' }] } },
        { path: '/invoice', component: () => <Invoice logoUrl={logoUrl} />, meta: { breadcrumb: [{ parent: 'Pages', label: 'Invoice' }] } },
        { path: '/help', component: Help, meta: { breadcrumb: [{ parent: 'Pages', label: 'Help' }] } },
        { path: '/empty', component: EmptyPage, meta: { breadcrumb: [{ parent: 'Pages', label: 'Empty Page' }] } },
        { path: '/documentation', component: Documentation, meta: { breadcrumb: [{ parent: 'Pages', label: 'Documentation' }] } }
    ];

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    useEffect(() => {
        changeStyleSheetUrl('layout-css', 'layout-' + colorScheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + colorScheme + '.css', 1);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const changeMenuTheme = (name, logoColor, componentTheme) => {
        onMenuThemeChange(name);
        changeStyleSheetUrl('theme-css', componentTheme, 2);
        setComponentTheme(componentTheme)

        const appLogoLink = document.getElementById('app-logo');
        const appLogoUrl = `assets/layout/images/logo-${logoColor === 'dark' ? 'dark' : 'white'}.svg`;

        if (appLogoLink) {
            appLogoLink.src = appLogoUrl;
        }
        setLogoColor(logoColor);
    };

    const changeComponentTheme = (theme) => {
        setComponentTheme(theme)
        changeStyleSheetUrl('theme-css', theme, 3);
    };

    const changeColorScheme = (e) => {
        setColorScheme(e.value);

        const scheme = e.value;
        changeStyleSheetUrl('layout-css', 'layout-' + scheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + scheme + '.css', 1);
        changeLogo(scheme);
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

    const changeLogo = (scheme) => {
        const appLogoLink = document.getElementById("app-logo");
        const mobileLogoLink = document.getElementById("logo-mobile");
        const invoiceLogoLink = document.getElementById("invoice-logo");
        const footerLogoLink = document.getElementById("footer-logo");
        setLogoUrl(`assets/layout/images/logo-${scheme === 'light' ? 'dark' : 'white'}.svg`);

        if (appLogoLink) {
            appLogoLink.src = `assets/layout/images/logo-${scheme === 'light' ? logoColor : 'white'}.svg`;
        }

        if (mobileLogoLink) {
            mobileLogoLink.src = logoUrl;
        }

        if (invoiceLogoLink) {
            invoiceLogoLink.src = logoUrl;
        }

        if (footerLogoLink) {
            footerLogoLink.src = logoUrl;
        }
    };

    const replaceLink = (linkElement, href) => {
        if (isIE()) {
            linkElement.setAttribute("href", href);
        }
        else {
            const id = linkElement.getAttribute("id");
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute("href", href);
            cloneLinkElement.setAttribute("id", id + "-clone");

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", id);
            });
        }
    };


    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };


    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
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
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
        }
        else {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
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

    const onRootMenuitemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const onMenuThemeChange = (name) => {
        setMenuTheme('layout-sidebar-' + name);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        if(e.value === 'static') {
            setStaticMenuDesktopInactive(false)
        }
    };


    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive(prevTopbarUserMenuActive => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive(prevTopbarNotificationMenuActive => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive(prevSearchActive => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = true;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive(prevRightMenuActive => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const isSlim = () => {
        return menuMode === "slim";
    };

    const isOverlay = () => {
        return menuMode === "overlay";
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const containerClassName = classNames('layout-wrapper',
        {
            'layout-overlay': menuMode === "overlay",
            'layout-static': menuMode === "static",
            'layout-slim': menuMode === "slim",
            'layout-sidebar-dim': colorScheme === "dim",
            'layout-sidebar-dark': colorScheme === "dark",
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive && menuMode === "static",
            'p-input-filled': inputStyle === "filled",
            'p-ripple-disabled': !ripple,
        },
        colorScheme === 'light' ? menuTheme : '');

    return (
        <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
            <div className="layout-content-wrapper">
                <AppTopBar routers={routers} topbarNotificationMenuActive={topbarNotificationMenuActive} topbarUserMenuActive={topbarUserMenuActive} onMenuButtonClick={onMenuButtonClick} onSearchClick={toggleSearch}
                    onTopbarNotification={onTopbarNotificationMenuButtonClick} onTopbarUserMenu={onTopbarUserMenuButtonClick} onRightMenuClick={onRightMenuButtonClick} onRightMenuButtonClick={onRightMenuButtonClick}></AppTopBar>

                <div className="layout-content">
                    {
                        routers.map((router, index) => {
                            if (router.exact) {
                                return <Route key={`router${index}`} path={router.path} exact component={router.component} />
                            }

                            return <Route key={`router${index}`} path={router.path} component={router.component} />
                        })
                    }
                </div>

                <AppFooter />
            </div>

            <AppMenu model={menu} menuMode={menuMode} active={menuActive} mobileMenuActive={staticMenuMobileActive} onMenuClick={onMenuClick} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick}></AppMenu>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>

            <AppConfig configActive={configActive} menuMode={menuMode} onMenuModeChange={onMenuModeChange} colorScheme={colorScheme} changeColorScheme={changeColorScheme} menuTheme={menuTheme} changeMenuTheme={changeMenuTheme}
                componentTheme={componentTheme} changeComponentTheme={changeComponentTheme} onConfigClick={onConfigClick} onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple} onRippleChange={onRippleChange} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}></AppConfig>

            <AppSearch searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />

            <div className="layout-mask modal-in"></div>
        </div>
    );
}

export default App;
