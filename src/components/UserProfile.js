import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserProfile = ({ dialogOpen, setDialogOpen }) => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();
  const userImage = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // TODO: For register button to be enabled form also needs to be valid.
  }, [password, email]);

  return (
    <div className="p-grid">
      <div className="p-col-12 p-md-8">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5>{t('USER_PROFILE_TITLE')}</h5>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="firstname">{t('FIRSTNAME')}</label>
              <InputText
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="lastname">{t('LASTNAME')}</label>
              <InputText
                id="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="email">{t('EMAIL')}</label>
              <InputText
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="password">{t('PASSWORD')}</label>
              <InputText
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start p-mt-2">
            <div className="p-field p-col-12 p-md-6">
              <Button
                label={t('REPO_MANAGER_REQUEST')}
                icon="pi pi-id-card"
                className="p-button-secondary p-mr-2 p-mb-2"
                onClick={() => setDialogOpen(!dialogOpen)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-col-12 p-md-4">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5>{t('PROFILE_PICTURE_TITLE')}</h5>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12 p-text-center">
              <img
                src="https://picsum.photos/140/140"
                height="138px"
                className="rounded-full"
                alt="Avatar"
              />
            </div>
            <div className="p-field p-col-12">
              <Button
                label="Select image"
                icon="pi pi-image"
                className="p-button-secondary p-mr-2 p-mb-2"
                onClick={() => {
                  userImage.current.click();
                }}
              />
            </div>
            <form>
              <input
                type="file"
                id="file"
                ref={userImage}
                style={{ display: 'none' }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
