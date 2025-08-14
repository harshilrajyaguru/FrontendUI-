import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { PlusIcon } from '@radix-ui/react-icons';
import TaskForm from './TaskForm.jsx';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="jira-logo-container">
          <span className="jira-logo-text">Jira</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item">
            <span>For you</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>Recent</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>Starred</span>
          </a>
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Projects</h4>
            <a href="#" className="sidebar-nav-item sidebar-nav-item--active">
              <span>Online Payment System</span>
            </a>
            <a href="#" className="sidebar-nav-item">
              <span>View all projects</span>
            </a>
          </div>
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Teams</h4>
          </div>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="main-content-area">
        {/* Top Navigation Bar */}
        <header className="header">
          <div className="header-title-container">
            <h1 className="header-title">Online Payment System</h1>
          </div>
          <div className="header-actions">
            <button className="create-button" onClick={() => setIsModalOpen(true)}>
              <PlusIcon />
              <span>Create</span>
            </button>
            <button className="premium-button">Premium trial</button>
          </div>
        </header>

        {/* Sub-navigation and main content */}
        <main className="main-view-content">
          <nav className="sub-nav">
            <NavLink
              to="board"
              className={({ isActive }) => `sub-nav-item ${isActive ? 'sub-nav-item--active' : ''}`}
            >
              Board
            </NavLink>
            <NavLink
              to="list"
              className={({ isActive }) => `sub-nav-item ${isActive ? 'sub-nav-item--active' : ''}`}
            >
              List
            </NavLink>
            <a href="#" className="sub-nav-item">
              Code
            </a>
            <a href="#" className="sub-nav-item">
              Forms
            </a>
            <a href="#" className="sub-nav-item">
              Timeline
            </a>
            <a href="#" className="sub-nav-item">
              Pages
            </a>
          </nav>
          <Outlet />
        </main>
      </div>
      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Layout;