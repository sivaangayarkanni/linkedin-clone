import React, { useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await usersAPI.getConnectionRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleRequest = async (id, action) => {
    try {
      await usersAPI.handleConnectionRequest(id, action);
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };

  if (requests.length === 0) {
    return (
      <div className="connection-requests">
        <h3>Connection Requests</h3>
        <p>No pending requests</p>
      </div>
    );
  }

  return (
    <div className="connection-requests">
      <h3>Connection Requests ({requests.length})</h3>
      {requests.map(request => (
        <div key={request._id} className="request-item">
          <div className="request-info">
            <strong>{request.sender.name}</strong>
            {request.sender.company && <span> at {request.sender.company}</span>}
            {request.message && <p className="request-message">"{request.message}"</p>}
          </div>
          <div className="request-actions">
            <button 
              className="btn btn-primary"
              onClick={() => handleRequest(request._id, 'accepted')}
            >
              Accept
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleRequest(request._id, 'rejected')}
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionRequests;