import React from 'react';
import classNames from 'classnames';
import { ProgressSpinner } from 'primereact/progressspinner';

const InformationPanel = ({ sizeClasses, name, value, icon, extraClass }) => (
  <div className={sizeClasses}>
    <div
      className={classNames(
        'card',
        'no-gutter',
        'widget-overview-box',
        extraClass,
      )}
    >
      <div className="p-d-flex p-jc-between">
        <div>
          <span className="overview-icon">
            <i className={icon} />
          </span>
          <span className="overview-title">{name}</span>
        </div>
        {value !== null && <div className="overview-number">{value}</div>}
        {value === null && (
          <div className="overview-number">
            <ProgressSpinner style={{ width: '20px', height: '20px' }} />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default InformationPanel;
