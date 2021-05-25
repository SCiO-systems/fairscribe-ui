import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TeamDialog = ({ dialogOpen, setDialogOpen, team }) => {
  const { t } = useTranslation();
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  useEffect(() => {
    if (team && team.name && team.description) {
      setTeamName(team.name);
      setTeamDescription(team.description);
    } else {
      setTeamName('');
      setTeamDescription('');
    }
  }, [team]);

  return (
    <Dialog
      header={t('CREATE_A_NEW_TEAM')}
      visible={dialogOpen}
      style={{ width: '400px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-col-12">
            <div>
              <label htmlFor="teamName">{t('YOUR_TEAM_NAME')}</label>
              <InputText
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="p-mt-4">
              <label htmlFor="teamDescription">{t('YOUR_TEAM_DESC')}</label>
              <InputTextarea
                id="teamDescription"
                rows={5}
                cols={30}
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="p-col-12 p-text-center p-mt-4">
            <div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
              <Button
                label={team ? t('EDIT_TEAM') : t('CREATE_TEAM')}
                icon={team ? 'pi pi-save' : 'pi pi-plus'}
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

export default TeamDialog;
