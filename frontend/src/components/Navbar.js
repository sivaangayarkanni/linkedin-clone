import React, { useState, useEffect } from 'react';
import { getUser, removeToken, removeUser } from '../utils/auth';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';
import ThemeToggle from './ThemeToggle';
import NotificationPanel from './NotificationPanel';
import Settings from './Settings';
import { notificationsAPI } from '../utils/api';

const Navbar = ({ onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = getUser();

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationsAPI.getUnreadCount();
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="logo">LinkedIn Clone</div>
          <SearchBar />
          <div className="nav-user">
            <ThemeToggle />
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔 {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowProfile(true)}
            >
              {user?.name}
            </button>
            <button 
              className="settings-btn"
              onClick={() => setShowSettings(true)}
            >
              ⚙️
            </button>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <NotificationPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      {showProfile && (
        <UserProfile 
          userId={user?.id} 
          onClose={() => setShowProfile(false)} 
        />
      )}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </nav>
  );
};

export default Navbar;