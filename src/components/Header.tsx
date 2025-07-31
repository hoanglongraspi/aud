import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://via.placeholder.com/32x32/007bff/ffffff?text=U" alt="User" />
          </div>
          <div className="user-info">
            <span className="user-name">User Name</span>
            <div className="user-dropdown">▼</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;