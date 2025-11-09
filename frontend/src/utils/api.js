import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const postsAPI = {
  getAllPosts: () => api.get('/posts'),
  createPost: (postData) => api.post('/posts', postData),
  reactToPost: (postId, reactionData) => api.post(`/posts/${postId}/react`, reactionData),
  deletePost: (postId) => api.delete(`/posts/${postId}`),
};

export const commentsAPI = {
  getComments: (postId) => api.get(`/comments/post/${postId}`),
  createComment: (commentData) => api.post('/comments', commentData),
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),
};

export const usersAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  connect: (userId, message) => api.post(`/users/connect/${userId}`, { message }),
  searchUsers: (query) => api.get(`/users/search/${query}`),
  getConnectionRequests: () => api.get('/users/connection-requests'),
  handleConnectionRequest: (id, action) => api.put(`/users/connection-request/${id}/${action}`),
  updateSettings: (settings) => api.put('/users/settings', settings),
  getTopPosts: () => api.get('/users/top-posts'),
};

export const trendingAPI = {
  getTrending: () => api.get('/trending'),
  getPostsByHashtag: (hashtag) => api.get(`/trending/${hashtag}`),
};

export const notificationsAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
};

export default api;