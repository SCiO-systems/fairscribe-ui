import React from 'react';

const PIIStatusTemplate = ({ status }) => (
  <div className="p-mx-1">
    {!status && (
      <span className="p-d-flex p-ai-center" style={{ textTransform: 'capitalize' }}>
        <i style={{ fontSize: '1.25rem' }} className="pi pi-spin pi-spinner p-mr-2" />
        Pending
      </span>
    )}
    {status === 'pending' && (
      <span className="p-d-flex p-ai-center" style={{ textTransform: 'capitalize' }}>
        <i style={{ fontSize: '1.25rem' }} className="pi pi-spin pi-spinner p-mr-2" />
        {status}
      </span>
    )}
    {status === 'fail' && (
      <span className="p-d-flex p-ai-center" style={{ textTransform: 'capitalize' }}>
        <i className="pi pi-times text-red bg-red rounded-full p-p-1 p-mr-2" />
        {status}
      </span>
    )}
    {status === 'pass' && (
      <span className="p-d-flex p-ai-center" style={{ textTransform: 'capitalize' }}>
        <i className="pi pi-check text-green bg-green rounded-full p-p-1 p-mr-2" />
        {status}
      </span>
    )}
  </div>
);

export default PIIStatusTemplate;
