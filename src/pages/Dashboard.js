import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InformationPanel from '../components/InformationPanel';

const myTeams = [{ name: 'EiA', tasks: '4', reviews: '13', uploads: '21' }];

const sharedTeams = [
  { name: 'CSI Team', tasks: '4', reviews: '13' },
  { name: 'Org Data Team', tasks: '9', reviews: '6' },
];

const Dashboard = () => {
  const { t } = useTranslation();

  const nameTemplate = (rowData) => <h5>{rowData.name}</h5>;

  const tasksTemplate = (rowData) => (
    <span>
      <strong>{rowData.tasks}</strong>
      <br />
      Active Tasks
    </span>
  );

  const reviewsTemplate = (rowData) => (
    <span>
      <strong>{rowData.reviews}</strong>
      <br />
      Pending Reviews
    </span>
  );

  const uploadsTemplate = (rowData) => (
    <span>
      <strong>{rowData.uploads}</strong>
      <br />
      Pending Uploads
    </span>
  );

  return (
    <div className="layout-dashboard">
      <div className="p-grid">
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name="My Active Tasks"
          value="21"
          icon="pi pi-pencil"
          extraClass="widget-overview-box-3"
        />
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name="Pending Reviews"
          value="123"
          icon="pi pi-list"
          extraClass="widget-overview-box-2"
        />
        <InformationPanel
          sizeClasses="p-col-12 p-md-6 p-xl-4"
          name="Pending Uploads"
          value="42"
          icon="pi pi-upload"
          extraClass="widget-overview-box-1"
        />
        <div className="p-col-12">
          <div className="card">
            <div className="p-d-flex p-jc-between">
              <h4>My Teams</h4>
              <span>
                <Button label="Create Team" icon="pi pi-plus-circle" />
              </span>
            </div>
            <DataTable value={myTeams} className="p-mt-2">
              <Column field="name" header="Name" body={nameTemplate} />
              <Column
                field="tasks"
                header="Active Tasks"
                body={tasksTemplate}
              />
              <Column
                field="reviews"
                header="Pending Reviews"
                body={reviewsTemplate}
              />
              <Column
                field="uploads"
                header="Pending Uploads"
                body={uploadsTemplate}
              />
              <Column
                body={(rowData) => (
                  <div className="p-text-right">
                    <Button
                      icon="pi pi-user-plus"
                      className="p-button-outlined p-button-icon-only p-button-rounded p-mr-2"
                    />
                    <Button
                      icon="pi pi-cog"
                      className="p-button-outlined p-button-icon-only p-button-rounded p-button-secondary p-mr-2"
                    />
                    <Button
                      label="View Details"
                      icon="pi pi-eye"
                      className="p-button-secondary"
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
          <div className="card p-mt-4">
            <h4>Shared Teams</h4>
            <DataTable value={sharedTeams} className="p-mt-2">
              <Column field="name" header="Name" body={nameTemplate} />
              <Column
                field="tasks"
                header="Active Tasks"
                body={tasksTemplate}
              />
              <Column
                field="reviews"
                header="Pending Reviews"
                body={reviewsTemplate}
              />
              <Column header="" />
              <Column
                body={(rowData) => (
                  <div className="p-text-right">
                    <Button
                      label="View Details"
                      icon="pi pi-eye"
                      className="p-button-secondary"
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
