import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProjectDetails = ({
  projectId,
  setProjectId,
  projectName,
  setProjectName,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-fluid p-mt-4">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="name">{t('PROJECT_NAME')} (in English)</label>
          <InputTextarea
            id="name"
            type="text"
            value={projectName}
            rows={5}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="contract">{t('PROJECT_CONTRACT_NO')}</label>
          <InputText
            id="contract"
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
