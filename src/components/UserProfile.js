import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getProfile, updateAvatar } from '../services/user';

const UserProfile = ({ userId, dialogOpen, setDialogOpen }) => {
  // TODO: Default false.
  const { t } = useTranslation();
  const userAvatar = useRef(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [userAvatarUrl, setUserAvatarUrl] = useState(null);

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const { avatar_url: avatarUrl } = await updateAvatar(userId, formData);
      setUserAvatarUrl(avatarUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await getProfile(userId);
        if (data) {
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setEmail(data.email);
          setUserAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, []);

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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="lastname">{t('LASTNAME')}</label>
              <InputText
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="email">{t('EMAIL')}</label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-grid p-formgrid">
            <div className="p-field p-col-12 p-md-6">
              <Button
                id="repoManagerAccess"
                name="repoManagerAccess"
                label={t('REPO_MANAGER_REQUEST')}
                icon="pi pi-id-card"
                className="p-button-secondary p-mr-2 p-mt-2"
                onClick={() => setDialogOpen(!dialogOpen)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-col-12 p-md-4">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5 className="p-text-center">{t('PROFILE_PICTURE_TITLE')}</h5>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col-12 p-text-center">
              { userAvatarUrl ? (
                <img
                  src={userAvatarUrl}
                  height="130px"
                  className="rounded-full"
                  alt="Avatar"
                />
              ) : (
                <img src="/assets/img/user-default.png" style={{ height: '130px' }} alt="Default Avatar" />
              )}
            </div>
            <div className="p-field p-col-12">
              <input
                className="hidden"
                type="file"
                multiple={false}
                ref={userAvatar}
                onClick={async (e) => {
                  await uploadAvatar(e.target.files[0]);
                }}
                onChange={async (e) => {
                  await uploadAvatar(e.target.files[0]);
                }}
              />
              <Button
                label={t('CHANGE_PICTURE')}
                icon="pi pi-image"
                className="p-button-secondary p-mr-2 p-mb-2"
                onClick={(e) => {
                  userAvatar.current.click();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
