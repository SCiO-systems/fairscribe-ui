import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import React, { useState } from 'react';

const SimpleNumberField = ({
  mode,
  title,
  number,
  setNumber,
  numberMode = '',
  numberDecimalDigits = 0,
  helpText,
  className,
}) => {
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
          <InputNumber
            mode={numberMode}
            minFractionDigits={numberDecimalDigits}
            maxFractionDigits={numberDecimalDigits}
            disabled={mode === 'review' || mode === 'view'}
            id={`${title}-number`}
            value={number || 1.0}
            onChange={(e) => setNumber(e.value)}
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

export default SimpleNumberField;
