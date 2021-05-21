import React from 'react';
import { useTranslation } from 'react-i18next';
import InformationPanel from '../components/InformationPanel';

const Dashboard = () => {
  const { t } = useTranslation();
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
      </div>
    </div>
  );
};

export default Dashboard;
