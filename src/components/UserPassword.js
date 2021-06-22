import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import 'primereact/resources/primereact.min.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserPassword = ({ userId }) => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  }, []);

  return (
    <div className="p-grid p-mt-1">
      <div className="p-col-12 p-md-12">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5>{t('CHANGE_PASSWORD')}</h5>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="oldPassword">{t('OLD_PASSWORD')}</label>
              <Password
                id="oldPassword"
                feedback={false}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="newPassword">{t('NEW_PASSWORD')}</label>
              <Password
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="newPasswordRepeat">{t('REPEAT_NEW_PASSWORD')}</label>
              <Password
                id="newPasswordRepeat"
                value={newPasswordRepeat}
                feedback={false}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <Button
                label={t('CHANGE_PASSWORD')}
                disabled
                className="p-button-primary p-mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPassword;
