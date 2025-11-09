import React, { useState } from 'react';
import { commentsAPI } from '../utils/api';

const CommentSection = ({ post, onPostUpdated }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await commentsAPI.createComment({
        content: newComment,
        postId: post._id
      });
      setNewComment('');
      // Refresh post data
      onPostUpdated();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="comment-section">
      <button 
        className="toggle-comments"
        onClick={() => setShowComments(!showComments)}
      >
        💬 {post.comments?.length || 0} Comments
      </button>

      {showComments && (
        <div className="comments-container">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !newComment.trim()}>
              Post
            </button>
          </form>

          <div className="comments-list">
            {post.comments?.map(comment => (
              <div key={comment._id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.author.name}</span>
                  <span className="comment-time">{formatDate(comment.createdAt)}</span>
                </div>
                <div className="comment-content">{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;