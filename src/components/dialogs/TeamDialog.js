import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createTeam, getAllOwnedTeams, updateTeam } from '../../services/teams';
import { ToastContext, UserContext } from '../../store';
import { handleError } from '../../utilities/errors';

const TeamDialog = ({ dialogOpen, setDialogOpen, team }) => {
  const { t } = useTranslation();
  const [teamName, setTeamName] = useState(team?.name || '');
  const [teamDescription, setTeamDescription] = useState(
    team?.description || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const { id: userId, setUser } = useContext(UserContext);
  const { setSuccess, setError } = useContext(ToastContext);

  useEffect(() => {
    setTeamName(team?.name || '');
    setTeamDescription(team?.description || '');
  }, [team]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (team && team.id) {
        // we're updating
        await updateTeam(userId, team.id, {
          name: teamName,
          description: teamDescription,
        });
        setSuccess('Done!', 'Your changes were saved.');
      } else {
        // we're making a new team
        await createTeam(userId, {
          name: teamName,
          description: teamDescription,
        });
        setSuccess('Done!', 'Your team has been created.');
      }
      // update our user context
      const ownTeamsRes = await getAllOwnedTeams(userId);
      setUser({ ownTeams: ownTeamsRes.data });
      setDialogOpen(false);
    } catch (error) {
      setError(handleError(error));
    }
    setIsLoading(false);
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
          <form onSubmit={handleSubmit}>
            <div className="p-col-12">
              <div className="p-field">
                <label htmlFor="teamName">{t('YOUR_TEAM_NAME')}</label>
                <InputText
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="p-mt-4 p-field">
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
                  onClick={handleSubmit}
                  loading={isLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default TeamDialog;
