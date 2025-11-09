import React, { useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';
import { getUser } from '../utils/auth';

const Settings = ({ onClose }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowConnectionRequests: true
  });

  useEffect(() => {
    const user = getUser();
    if (user?.settings) {
      setSettings(user.settings);
    }
  }, []);

  const handleSave = async () => {
    try {
      await usersAPI.updateSettings({ settings });
      onClose();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal settings-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Settings</h2>
        
        <div className="settings-section">
          <h3>Privacy</h3>
          
          <div className="setting-item">
            <label>Profile Visibility</label>
            <select 
              value={settings.profileVisibility}
              onChange={(e) => handleChange('profileVisibility', e.target.value)}
            >
              <option value="public">Public</option>
              <option value="connections">Connections Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.showOnlineStatus}
                onChange={(e) => handleChange('showOnlineStatus', e.target.checked)}
              />
              Show online status
            </label>
          </div>

          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.allowConnectionRequests}
                onChange={(e) => handleChange('allowConnectionRequests', e.target.checked)}
              />
              Allow connection requests
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              />
              Email notifications
            </label>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;