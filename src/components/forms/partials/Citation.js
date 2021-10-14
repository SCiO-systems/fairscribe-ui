import React from 'react';
import { useTranslation } from 'react-i18next';
import SimpleTextArea from '../../fields/SimpleTextArea';

const Citation = ({ mode, citation, setCitation }) => {
  const { t } = useTranslation();

  return (
    <SimpleTextArea
      mode={mode}
      title={t('CITATION')}
      text={citation}
      helpText="How to cite this resource."
      setText={setCitation}
      className="p-mb-4"
    />
  );
};

export default Citation;
