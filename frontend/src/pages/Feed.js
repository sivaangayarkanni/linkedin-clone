import React, { useState, useEffect } from 'react';
import { postsAPI, trendingAPI } from '../utils/api';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import TrendingSidebar from '../components/TrendingSidebar';
import TopPosts from '../components/TopPosts';
import ConnectionRequests from '../components/ConnectionRequests';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  const handleHashtagClick = async (hashtag) => {
    try {
      const response = await trendingAPI.getPostsByHashtag(hashtag);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching hashtag posts:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'top':
        return <TopPosts onPostUpdated={handlePostUpdated} onPostDeleted={handlePostDeleted} />;
      case 'connections':
        return <ConnectionRequests />;
      default:
        return (
          <>
            <PostForm onPostCreated={handlePostCreated} />
            {posts.length === 0 ? (
              <div className="post">
                <p>No posts yet. Be the first to share something!</p>
              </div>
            ) : (
              posts.map(post => (
                <Post
                  key={post._id}
                  post={post}
                  onPostUpdated={handlePostUpdated}
                  onPostDeleted={handlePostDeleted}
                />
              ))
            )}
          </>
        );
    }
  };

  return (
    <div className="container">
      <div className="feed-layout">
        <div className="feed-main">
          <div className="feed-tabs">
            <button 
              className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
              onClick={() => setActiveTab('feed')}
            >
              🏠 Feed
            </button>
            <button 
              className={`tab ${activeTab === 'top' ? 'active' : ''}`}
              onClick={() => setActiveTab('top')}
            >
              🔥 Top Posts
            </button>
            <button 
              className={`tab ${activeTab === 'connections' ? 'active' : ''}`}
              onClick={() => setActiveTab('connections')}
            >
              🤝 Connections
            </button>
          </div>
          {renderContent()}
        </div>
        <TrendingSidebar onHashtagClick={handleHashtagClick} />
      </div>
    </div>
  );
};

export default Feed;