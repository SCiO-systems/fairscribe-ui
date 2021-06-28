import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProjectDetails = ({ details }) => {
  const { t } = useTranslation();
  const [name, setName] = useState((details && details.projectName) || '');
  const [contactNo, setContractNo] = useState(
    (details && details.projectContractNo) || '',
  );

  return (
    <div className="p-fluid p-mt-4">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="name">{t('PROJECT_NAME')}</label>
          <InputTextarea
            id="name"
            type="text"
            value={name}
            rows={5}
            onChange={(e) => setName(e.target.value)}
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
            value={contactNo}
            onChange={(e) => setContractNo(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
