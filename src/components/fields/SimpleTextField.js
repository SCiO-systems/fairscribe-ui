import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

const SimpleTextField = ({ mode, title, text, setText, helpText, className }) => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  return (
    <div className={classNames('p-fluid', className)}>
      <div className="p-formgrid p-grid">
        <div className="p-col-12 p-md-12">
          <label className="p-mb-2 p-d-flex p-ai-center" htmlFor={`${title}-field`}>
            <span>{title}</span>
            {helpText && helpText.length > 0 && (
              <Button
                onClick={() => setHelpDialogOpen(!helpDialogOpen)}
                icon="pi pi-question-circle"
                style={{ padding: 0, marginBottom: 0, height: '25px', width: '25px' }}
                className="p-ml-2 p-button-rounded p-button-lg p-button-text p-button-secondary"
              />
            )}
          </label>
          <InputText
            disabled={mode === 'review'}
            id={`${title}-field`}
            type="text"
            value={text || ''}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
      </div>
      {helpText && helpText.length > 0 && (
        <Dialog
          header={title}
          onHide={() => setHelpDialogOpen(false)}
          visible={helpDialogOpen}
          style={{ width: '500px', maxWidth: '90%' }}
        >
          <p style={{ lineHeight: '1.75' }}>{helpText}</p>
        </Dialog>
      )}
    </div>
  );
};

export default SimpleTextField;
