import React from 'react';
import { Button } from 'primereact/button';
import LogoImage from '../../../../assets/img/FAIRscribe-logo.png';
import './styles.css';

const MenuBar = (props) => {
	const { setCurrentPage } = props;
	return (
		<div className="menu-bar">
			<Button text onClick={() => setCurrentPage('home')}>
				<img
					src={LogoImage}
					alt="FAIRscribe logo"
					width="100px"
				/>
			</Button>
			<div className="pages">
				<Button text label="About" onClick={() => setCurrentPage('about')} />
				<Button text label="Contact" onClick={() => setCurrentPage('contact-us')} />
				<Button text label="Sign in" onClick={() => setCurrentPage('login')} />
			</div>
		</div>
	);
};

export default MenuBar;
