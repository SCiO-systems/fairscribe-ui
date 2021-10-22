import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { listProjects } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';

const ProjectsList = ({ mode, title, projectEntries, setProjectEntries, className }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);

  const [availableProjects, setAvailableProjects] = useState([]);
  const [project, setProject] = useState('');

  const addProject = async (projectFullName) => {
    const selectedProject = availableProjects.filter((p) => p.full_name === projectFullName)?.pop();
    setProjectEntries(
      projectEntries
        .filter((p) => p.full_name !== projectFullName)
        .concat({
          full_name: selectedProject?.full_name || '',
          short_name: selectedProject?.short_name || '',
          url: selectedProject?.url || '',
        })
    );
  };

  const loadProjects = async () => {
    try {
      const results = await listProjects();
      setAvailableProjects(results.map((p) => ({ ...p, label: p.full_name, value: p.full_name })));
    } catch (e) {
      setError(handleError(e));
    }
  };

  useEffect(() => {
    loadProjects();
  }, []); // eslint-disable-line

  // TODO: Add project entries.

  const projectsFooterTemplate = mode === 'edit' && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addProject(project);
        setProject('');
      }}
    >
      <div className="p-mt-2 p-formgrid p-grid p-fluid">
        <div className="p-col-10">
          <Dropdown
            filter
            filterBy="label"
            id="type"
            name="type"
            value={project || ''}
            options={availableProjects}
            placeholder="Choose CRP / Platform / Initiative."
            onChange={(e) => setProject(e.value)}
          />
        </div>
        <div className="p-col-2">
          <Button label={t('ADD')} type="submit" icon="pi pi-plus" />
        </div>
      </div>
    </form>
  );

  return (
    <div className={className || 'p-mb-4'}>
      <DataTable
        header={title}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={projectEntries}
        footer={projectsFooterTemplate}
        style={{ wordBreak: 'break-word' }}
      >
        <Column field="full_name" header={t('FULLNAME')} />
        <Column field="short_name" header={t('SHORTNAME')} />
        <Column field="url" header={t('URL')} />
        {mode === 'edit' && (
          <Column
            body={(rowData) => (
              <div className="p-text-right">
                <Button className="p-button-danger" icon="pi pi-trash" onClick={() => {}} />
              </div>
            )}
          />
        )}
      </DataTable>
    </div>
  );
};

export default ProjectsList;
