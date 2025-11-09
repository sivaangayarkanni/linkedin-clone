import React, { useState } from 'react';
import { postsAPI } from '../utils/api';
import { getUser } from '../utils/auth';
import CommentSection from './CommentSection';
import UserProfile from './UserProfile';
import Reactions from './Reactions';

const Post = ({ post, onPostUpdated, onPostDeleted }) => {
  const [showProfile, setShowProfile] = useState(false);
  const currentUser = getUser();
  const isOwner = post.author._id === currentUser?.id;



  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(post._id);
        onPostDeleted(post._id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="post">
      <div className="post-header">
        <span 
          className="post-author clickable" 
          onClick={() => setShowProfile(true)}
        >
          {post.author.name}
        </span>
        {post.author.company && <span className="post-company">at {post.author.company}</span>}
        <span className="post-time">{formatDate(post.createdAt)}</span>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <Reactions post={post} onPostUpdated={onPostUpdated} />
        {isOwner && (
          <button className="delete-btn" onClick={handleDelete}>
            🗑️ Delete
          </button>
        )}
      </div>
      <CommentSection post={post} onPostUpdated={() => onPostUpdated(post)} />
      {showProfile && (
        <UserProfile 
          userId={post.author._id} 
          onClose={() => setShowProfile(false)} 
        />
      )}
    </div>
  );
};

export default Post;