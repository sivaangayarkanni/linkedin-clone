import React, { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../utils/api';
import { getUser } from '../utils/auth';

const UserProfile = ({ userId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    company: ''
  });
  const currentUser = getUser();
  const isOwnProfile = userId === currentUser?.id;

  const fetchProfile = useCallback(async () => {
    try {
      const response = await usersAPI.getProfile(userId);
      setProfile(response.data);
      setFormData({
        name: response.data.user.name,
        bio: response.data.user.bio || '',
        location: response.data.user.location || '',
        company: response.data.user.company || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await usersAPI.updateProfile(formData);
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleConnect = async () => {
    try {
      await usersAPI.connect(userId);
      fetchProfile();
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  if (loading) return <div className="modal-overlay"><div className="modal">Loading...</div></div>;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal profile-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="profile-header">
          <h2>{profile.user.name}</h2>
          {!isOwnProfile && (
            <button className="connect-btn" onClick={handleConnect}>
              Connect
            </button>
          )}
          {isOwnProfile && (
            <button 
              className="edit-btn" 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              placeholder="Company"
            />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Location"
            />
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Bio"
              rows="3"
            />
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <div className="profile-info">
            {profile.user.company && <p><strong>Company:</strong> {profile.user.company}</p>}
            {profile.user.location && <p><strong>Location:</strong> {profile.user.location}</p>}
            {profile.user.bio && <p><strong>Bio:</strong> {profile.user.bio}</p>}
            <p><strong>Connections:</strong> {profile.user.connections?.length || 0}</p>
            <p><strong>Posts:</strong> {profile.posts?.length || 0}</p>
          </div>
        )}

        <div className="profile-posts">
          <h3>Recent Posts</h3>
          {profile.posts?.slice(0, 3).map(post => (
            <div key={post._id} className="profile-post">
              <p>{post.content}</p>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;