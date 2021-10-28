import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MultipleTextEntriesTable = ({
  mode,
  data,
  header,
  onDeleteItem,
  onAddItem,
  helpText,
  className,
}) => {
  const { t } = useTranslation();
  const [entry, setEntry] = useState('');
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(entry);
    setEntry('');
  };

  const onDelete = (e) => {
    onDeleteItem(e);
  };

  const headerTemplate = (body) => (
    <div className="p-d-flex p-ai-center">
      <span>{body}</span>
      {helpText && helpText.length > 0 && (
        <Button
          onClick={() => setHelpDialogOpen(!helpDialogOpen)}
          icon="pi pi-question-circle"
          style={{ padding: '0 1.125rem' }}
          className="p-ml-2 p-button-rounded p-button-lg p-button-text p-button-secondary"
        />
      )}
    </div>
  );

  const footerTemplate = mode === 'edit' && (
    <form className="p-formgrid p-grid p-fluid" onSubmit={onSubmit}>
      <div className="p-col-10">
        <div className="p-field">
          <InputTextarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={2}
            autoResize
            cols={50}
          />
        </div>
      </div>
      <div className="p-col-2 p-text-right">
        <Button disabled={entry.length === 0} type="submit" label={t('ADD')} />
      </div>
    </form>
  );

  return (
    <>
      <DataTable
        emptyMessage=""
        value={data}
        footer={footerTemplate}
        className={classNames([className])}
        dataKey="value"
      >
        <Column header={headerTemplate(header)} field="value" />
        {mode === 'edit' && (
          <Column
            body={(e) => (
              <div className="p-text-right">
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => onDelete(e)}
                />
              </div>
            )}
          />
        )}
      </DataTable>
      {helpText && helpText.length > 0 && (
        <Dialog
          header={header}
          onHide={() => setHelpDialogOpen(false)}
          visible={helpDialogOpen}
          style={{ width: '500px', maxWidth: '90%' }}
        >
          <p style={{ lineHeight: '1.75' }}>{helpText}</p>
        </Dialog>
      )}
    </>
  );
};

export default MultipleTextEntriesTable;
