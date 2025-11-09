# 🚀 LinkedIn Clone - Professional Social Media Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/linkedin-clone.svg)](https://github.com/yourusername/linkedin-clone/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/linkedin-clone.svg)](https://github.com/yourusername/linkedin-clone/network)

A modern, full-featured social media application built with the MERN stack, featuring real-time notifications, dark mode, connection requests, and advanced social features.

## 🌟 Features

### Core Features
- ✅ **User Authentication** - JWT-based secure login/registration
- ✅ **Post Management** - Create, view, edit, delete posts
- ✅ **Multi-Reactions** - Like, Love, Laugh, Angry reactions
- ✅ **Comments System** - Add, view, delete comments
- ✅ **Real-time Notifications** - Live updates for interactions

### Advanced Features
- ✅ **Connection Requests** - Send/accept/reject connection requests
- ✅ **User Profiles** - Complete profile management with bio, company, location
- ✅ **Dark/Light Mode** - Theme switching with persistence
- ✅ **Search Functionality** - Find users by name or company
- ✅ **Trending Topics** - Hashtag tracking and filtering
- ✅ **Top Posts** - Algorithm-based popular content
- ✅ **Settings Panel** - Privacy controls and preferences
- ✅ **Responsive Design** - Mobile-first responsive UI

## Tech Stack

**Frontend:**
- React.js
- CSS3
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd linkedin-clone
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/linkedin-clone
JWT_SECRET=your-secret-key-here
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Run the Application

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (authenticated)
- `POST /api/posts/:id/like` - Like/unlike post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated, owner only)

## Project Structure

```
linkedin-clone/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PostForm.js
│   │   │   └── Post.js
│   │   ├── pages/
│   │   │   ├── Auth.js
│   │   │   └── Feed.js
│   │   ├── utils/
│   │   │   ├── auth.js
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## How to Use

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Use your credentials to log in
3. **Create Posts**: Share your thoughts by creating new posts
4. **View Feed**: See all posts from all users, sorted by newest first
5. **Like Posts**: Click the like button to like/unlike posts
6. **Delete Posts**: Delete your own posts using the delete button
7. **Logout**: Use the logout button to sign out

## Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to Netlify or Vercel
3. Update API base URL in `src/utils/api.js`

### Backend (Render/Railway)
1. Push your code to GitHub
2. Connect your repository to Render or Railway
3. Set environment variables
4. Deploy

## 📸 Screenshots

### Light Mode
![Light Mode](https://via.placeholder.com/800x400/ffffff/000000?text=Light+Mode+Screenshot)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dark+Mode+Screenshot)

### Mobile Responsive
![Mobile View](https://via.placeholder.com/400x600/f0f0f0/333333?text=Mobile+Responsive)

## 🎆 Live Demo

🔗 **[View Live Demo](https://your-linkedin-clone.netlify.app)**

**Test Credentials:**
- Email: demo@example.com
- Password: demo123

## 🚀 Quick Deploy

### Deploy to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/linkedin-clone)

### Deploy Backend to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yourusername/linkedin-clone)

## 📊 Future Enhancements

- 📷 Image/Video uploads
- 📹 Video calls integration
- 📊 Analytics dashboard
- 🔔 Push notifications
- 🌍 Internationalization
- 🤖 AI-powered content suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).