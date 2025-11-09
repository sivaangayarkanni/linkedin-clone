import React, { useState } from 'react';
import { usersAPI } from '../utils/api';
import UserProfile from './UserProfile';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.length > 2) {
      try {
        const response = await usersAPI.searchUsers(searchQuery);
        setResults(response.data);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user._id);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search people..."
        className="search-input"
      />
      
      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map(user => (
            <div 
              key={user._id} 
              className="search-result"
              onClick={() => handleUserClick(user)}
            >
              <div className="result-name">{user.name}</div>
              {user.company && <div className="result-company">{user.company}</div>}
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <UserProfile 
          userId={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};

export default SearchBar;