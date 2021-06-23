import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createTeam, updateTeam } from '../../services/teams';
import { ToastContext, UserContext } from '../../store';

const TeamDialog = ({ dialogOpen, setDialogOpen, team }) => {
  const { t } = useTranslation();
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const { id: userId } = useContext(UserContext);
  const { setSuccess, setError } = useContext(ToastContext);

  useEffect(() => {
    if (team && team.id && team.name && team.description) {
      setTeamName(team.name);
      setTeamDescription(team.description);
    } else {
      setTeamName('');
      setTeamDescription('');
    }
  }, [team]);

  const handleSubmit = async () => {
    try {
      if (team && team.id) {
        // we're updating
        await updateTeam(userId, team.id, {
          name: teamName,
          description: teamDescription,
        });
        setSuccess('Done!', 'Your team has been created.');
      } else {
        // we're making a new team
        await createTeam(userId, {
          name: teamName,
          description: teamDescription,
        });
        setSuccess('Done!', 'Your changes were saved.');
      }
    } catch (e) {
      if (e.response) {
        setError(
          'Oops!',
          e.response.data.errors[Object.keys(e.response.data.errors)[0]][0],
        );
      } else {
        setError('Oops!', 'Something went wrong');
      }
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog
      header={team ? t('EDIT_TEAM') : t('CREATE_A_NEW_TEAM')}
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
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TeamDialog;
