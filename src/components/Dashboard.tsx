import React, { useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import ActivityOverview from './ActivityOverview.tsx';
import AppointmentsTable from './AppointmentsTable.tsx';
import Calendar from './Calendar.tsx';
import Schedule from './Schedule.tsx';
import Patients from './Patients.tsx';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeView) {
      case 'schedule':
        return <Schedule />;
      case 'patients':
        return <Patients />;
      case 'dashboard':
      default:
        return (
          <>
            <Header />
            <div className="dashboard-content">
              <div className="dashboard-left">
                <ActivityOverview />
                <AppointmentsTable />
              </div>
              <div className="dashboard-right">
                <Calendar />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="dashboard-main">
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Dashboard;