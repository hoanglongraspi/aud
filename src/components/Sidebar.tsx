import React from 'react';
import { MdDashboard, MdSchedule, MdGroup, MdSettings } from 'react-icons/md';
import './Sidebar.css';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'schedule', label: 'Schedule', icon: MdSchedule },
    { id: 'patients', label: 'Patients', icon: MdGroup },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/audiosight-logo.jpg" alt="AudioSight" className="sidebar-logo" />
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
          >
            <span className="sidebar-icon"><item.icon /></span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item" onClick={() => console.log('Settings clicked')}>
          <span className="sidebar-icon"><MdSettings /></span>
          <span className="sidebar-label">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;