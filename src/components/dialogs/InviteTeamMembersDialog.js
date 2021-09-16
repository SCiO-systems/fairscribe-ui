import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inviteEmails } from '../../services/teams';
import { searchUsers } from '../../services/users';
import { ToastContext } from '../../store';
import { handleError } from '../../utilities/errors';
import { useDebounce } from '../../utilities/hooks';

const InviteTeamMembersDialog = ({ team, dialogOpen, setDialogOpen }) => {
  const { t } = useTranslation();
  const { setError, setSuccess } = useContext(ToastContext);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [inviteEmailRecipient, setInviteEmailRecipient] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (search && search.length) {
      searchMembers();
    }
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSearch = (event) => {
    if (event.query.length < 4) return;
    setSearch(event.query);
  };

  const sendInvites = async (e) => {
    e.preventDefault();
    const emailAddresses =
      selectedMembers && selectedMembers.map((m) => m.email);
    if (inviteEmailRecipient && inviteEmailRecipient.length > 0) {
      emailAddresses.push(inviteEmailRecipient);
    }
    try {
      await inviteEmails(team.id, emailAddresses);
      setSuccess('Invites', 'The email invitations were sent!');
      setSelectedMembers([]);
      setMembers([]);
      setInviteEmailRecipient('');
      setDialogOpen(false);
    } catch (error) {
      setError(handleError(error));
    }
  };

  const searchMembers = async () => {
    try {
      const { data: foundMembers } = await searchUsers(search);
      setMembers(foundMembers || []);
    } catch (error) {
      setError(handleError(error));
    }
  };

  const itemTemplate = ({ email, firstname, lastname }) =>
    `${firstname} ${lastname} (${email})`;

  const selectedItemTemplate = ({ email }) => email || '';

  return (
    <Dialog
      header={t('INVITE_MEMBERS_TO_TEAM', { teamName: team ? team.name : '' })}
      visible={dialogOpen}
      style={{ width: '500px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <form onSubmit={sendInvites}>
          <div className="p-formgrid p-grid">
            <div className="p-col-12">
              <div className="p-field">
                <label htmlFor="members">{t('SEARCH_MEMBERS_BY_NAME')}</label>
                <AutoComplete
                  value={selectedMembers}
                  suggestions={members}
                  completeMethod={onSearch}
                  itemTemplate={itemTemplate}
                  selectedItemTemplate={selectedItemTemplate}
                  multiple
                  onChange={(e) => setSelectedMembers(e.value)}
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
                  type="submit"
                  className="p-mr-2 p-mb-2"
                  onClick={sendInvites}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default InviteTeamMembersDialog;
