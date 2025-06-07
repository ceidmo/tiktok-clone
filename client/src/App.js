
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';

import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/global';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import VideoDetailPage from './pages/VideoDetailPage';
import NotFoundPage from './pages/NotFoundPage';

import Navbar from './components/Common/Navbar'; // Adjust path if needed
import ProtectedRoute from './components/Auth/ProtectedRoute'; // Adjust path if needed
import { AuthProvider } from './context/AuthContext';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const VideoContext = createContext();

// Styled container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  const [theme, setTheme] = useState('light');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    const fetchVideos = async () => {
      try {
        const res = await axios.get('/videos');
        setVideos(res.data);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AuthProvider>
        <VideoContext.Provider value={{ videos, setVideos }}>
          <Router>
            <AppContainer>
              <Navbar toggleTheme={toggleTheme} theme={theme} />
              <Routes>
                {/* Public Routes */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/video/:id" element={<VideoDetailPage />} />

                {/* Protected Routes */}
                 <Route 
                   path="/analytics" 
                    element={
                      <AnalyticsDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage loading={loading} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:username"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AppContainer>
          </Router>
        </VideoContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
