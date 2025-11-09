import React, { useState, useEffect } from 'react';
import { isAuthenticated } from './utils/auth';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Feed from './pages/Feed';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider>
      <div className="App">
        {authenticated ? (
          <>
            <Navbar onLogout={handleLogout} />
            <Feed />
          </>
        ) : (
          <Auth onLogin={handleLogin} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;