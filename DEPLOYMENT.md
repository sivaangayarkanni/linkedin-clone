# Deployment Guide

## Backend Deployment (Render/Railway)

1. **Create MongoDB Atlas Database:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free cluster
   - Get connection string
   - Whitelist all IPs (0.0.0.0/0)

2. **Deploy Backend to Render:**
   - Go to [Render](https://render.com)
   - Connect GitHub repo
   - Create new Web Service
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret from .env
     - `PORT`: 10000 (Render default)

3. **Alternative - Railway:**
   - Go to [Railway](https://railway.app)
   - Connect GitHub repo
   - Deploy backend folder
   - Add same environment variables

## Frontend Deployment (Netlify)

### Method 1: GitHub Integration
1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect GitHub repo
4. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL + `/api`

### Method 2: Manual Deploy
1. Build frontend locally:
   ```bash
   cd frontend
   npm run build
   ```
2. Drag `build` folder to Netlify deploy area

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
JWT_SECRET=your-jwt-secret-here
PORT=10000
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Quick Deploy Commands

```bash
# Build frontend
cd frontend && npm run build

# Test backend locally
cd backend && npm start

# Deploy backend (after pushing to GitHub)
# - Connect repo to Render/Railway
# - Set environment variables
# - Deploy

# Deploy frontend
# - Push to GitHub
# - Connect to Netlify
# - Set build settings
# - Deploy
```

## Troubleshooting

- **CORS Issues**: Ensure backend allows frontend domain
- **API Not Found**: Check REACT_APP_API_URL is correct
- **Database Connection**: Verify MongoDB Atlas connection string
- **Build Failures**: Check Node.js version compatibility

## Live URLs
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-backend.onrender.com`