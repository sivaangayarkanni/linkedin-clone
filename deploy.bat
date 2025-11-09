@echo off
echo Building frontend...
cd frontend
call npm run build
cd ..

echo Frontend built successfully!
echo.
echo Next steps:
echo 1. Deploy backend to Render/Railway/Heroku
echo 2. Update REACT_APP_API_URL in .env.production
echo 3. Deploy to Netlify:
echo    - Connect your GitHub repo to Netlify
echo    - Set build command: npm run build
echo    - Set publish directory: frontend/build
echo    - Add environment variable: REACT_APP_API_URL
echo.
pause