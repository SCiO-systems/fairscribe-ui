import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const sampleMembers = [
  { label: 'John Doe', value: 123 },
  { label: 'Jane Doe', value: 425 },
  { label: 'Peter Jackson', value: 982 },
];

const InviteTeamMembersDialog = ({ dialogOpen, setDialogOpen }) => {
  const { t } = useTranslation();
  const [teamMembers, setTeamMembers] = useState([]);
  const [inviteEmailRecipient, setInviteEmailRecipient] = useState('');

  return (
    <Dialog
      header={t('INVITE_MEMBERS_TO_TEAM', { teamName: 'JDTeam' })}
      visible={dialogOpen}
      style={{ width: '400px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-col-12">
            <div className="p-field">
              <label htmlFor="members">{t('CHOOSE_MEMBERS')}</label>
              <MultiSelect
                id="members"
                value={teamMembers}
                options={sampleMembers}
                onChange={(e) => setTeamMembers(e.value)}
              />
            </div>
            <div className="p-mt-2 p-field">
              <label htmlFor="invite_by_email">{t('INVITE_BY_EMAIL')}</label>
              <InputText
                id="invite_by_email"
                value={inviteEmailRecipient}
                onChange={(e) => setInviteEmailRecipient(e.target.value)}
              />
            </div>
          </div>
          <div className="p-col-12 p-text-center p-mt-3">
            <div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
              <Button
                label={t('SEND_INVITES')}
                icon="pi pi-send"
                className="p-mr-2 p-mb-2"
                onClick={() => setDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InviteTeamMembersDialog;
