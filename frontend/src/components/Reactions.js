import React, { useState } from 'react';
import { postsAPI } from '../utils/api';
import { getUser } from '../utils/auth';

const Reactions = ({ post, onPostUpdated }) => {
  const [showReactions, setShowReactions] = useState(false);
  const currentUser = getUser();

  const reactions = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    angry: '😠'
  };

  const getUserReaction = () => {
    for (const [type, users] of Object.entries(post.reactions || {})) {
      if (users.includes(currentUser?.id)) return type;
    }
    return null;
  };

  const getTotalReactions = () => {
    return Object.values(post.reactions || {}).reduce((total, users) => total + users.length, 0);
  };

  const handleReaction = async (reactionType) => {
    try {
      const currentReaction = getUserReaction();
      const newReaction = currentReaction === reactionType ? null : reactionType;
      
      const response = await postsAPI.reactToPost(post._id, { reactionType: newReaction });
      onPostUpdated(response.data);
      setShowReactions(false);
    } catch (error) {
      console.error('Error reacting to post:', error);
    }
  };

  const currentReaction = getUserReaction();

  return (
    <div className="reactions-container">
      <div className="reaction-button-container">
        <button 
          className={`reaction-btn ${currentReaction ? 'reacted' : ''}`}
          onClick={() => setShowReactions(!showReactions)}
        >
          {currentReaction ? reactions[currentReaction] : '👍'} {getTotalReactions()}
        </button>
        
        {showReactions && (
          <div className="reactions-popup">
            {Object.entries(reactions).map(([type, emoji]) => (
              <button
                key={type}
                className={`reaction-option ${currentReaction === type ? 'active' : ''}`}
                onClick={() => handleReaction(type)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {getTotalReactions() > 0 && (
        <div className="reaction-summary">
          {Object.entries(post.reactions || {}).map(([type, users]) => 
            users.length > 0 && (
              <span key={type} className="reaction-count">
                {reactions[type]} {users.length}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Reactions;