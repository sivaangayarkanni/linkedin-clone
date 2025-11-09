import React, { useState, useEffect } from 'react';
import { trendingAPI } from '../utils/api';

const TrendingSidebar = ({ onHashtagClick }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const response = await trendingAPI.getTrending();
      setTrending(response.data);
    } catch (error) {
      console.error('Error fetching trending:', error);
    }
  };

  return (
    <div className="trending-sidebar">
      <h3>🔥 Trending</h3>
      <div className="trending-list">
        {trending.map(item => (
          <div 
            key={item._id} 
            className="trending-item"
            onClick={() => onHashtagClick(item.hashtag)}
          >
            <span className="hashtag">#{item.hashtag}</span>
            <span className="count">{item.count} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;