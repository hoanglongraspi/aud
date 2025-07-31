import React from 'react';
import { MdCalendarToday, MdGroup } from 'react-icons/md';
import './ActivityOverview.css';

const ActivityOverview: React.FC = () => {
  return (
    <div className="activity-overview">
      <h2 className="section-title">Activity Overview</h2>
      <div className="metrics-grid">
        <div className="metric-card appointments">
          <div className="metric-icon"><MdCalendarToday /></div>
          <div className="metric-content">
            <div className="metric-value">100</div>
            <div className="metric-label">Appointments</div>
          </div>
        </div>
        <div className="metric-card patients">
          <div className="metric-icon"><MdGroup /></div>
          <div className="metric-content">
            <div className="metric-value">820</div>
            <div className="metric-label">New Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;