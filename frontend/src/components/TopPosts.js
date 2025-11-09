import React, { useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';
import Post from './Post';

const TopPosts = ({ onPostUpdated, onPostDeleted }) => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopPosts();
  }, []);

  const fetchTopPosts = async () => {
    try {
      const response = await usersAPI.getTopPosts();
      setTopPosts(response.data);
    } catch (error) {
      console.error('Error fetching top posts:', error);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading top posts...</div>;

  return (
    <div className="top-posts">
      <h2>🔥 Top Posts</h2>
      {topPosts.length === 0 ? (
        <div className="post">
          <p>No top posts yet!</p>
        </div>
      ) : (
        topPosts.map(post => (
          <Post
            key={post._id}
            post={post}
            onPostUpdated={onPostUpdated}
            onPostDeleted={onPostDeleted}
          />
        ))
      )}
    </div>
  );
};

export default TopPosts;