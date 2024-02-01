import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import './styles.css';

const ContactUs = () => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [organizationName, setOrganizationName] = useState('');
	const [country, setCountry] = useState('');
	const [contactReason, setContactReason] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	return (
		<div className="contact-us">
			<div className="left">
				<h1>Contact</h1>
				<p>Get in touch to get more information or training on how to get the most out of this tool.</p>
			</div>
			<div className="right">
				<div className="input">
					<p>Email<span>*</span></p>
					<p className="note">Please enter your organization or company email address.</p>
					<InputText value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="input">
					<p>First Name<span>*</span></p>
					<InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				</div>
				<div className="input">
					<p>Last Name<span>*</span></p>
					<InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />
				</div>
				<div className="input">
					<p>Organization name<span>*</span></p>
					<InputText value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
				</div>
				<div className="input">
					<p>Country<span>*</span></p>
					<InputText value={country} onChange={(e) => setCountry(e.target.value)} />
				</div>
				<div className="input">
					<p>Contact reason<span>*</span></p>
					<Dropdown value={contactReason} onChange={(e) => setContactReason(e.value)} />
				</div>
				<div className="input">
					<p>Subject<span>*</span></p>
					<InputText value={subject} onChange={(e) => setSubject(e.target.value)} />
				</div>
				<div className="input">
					<p>Message<span>*</span></p>
					<InputTextarea value={message} onChange={(e) => setMessage(e.target.value)} />
				</div>
				<Button label="Submit" />
			</div>
		</div>
	);
};

export default ContactUs;
