import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import JsonToExcelCallingData from './pages/JsonToExcelCallingData';
import DownloadCollection from './pages/DownloadCollection';
import { account } from './lib/appwrite';

const App = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const checkAuth = async () => {
                  try {
                        await account.get();
                        setIsAuthenticated(true);
                  } catch (error) {
                        console.error('Failed to authenticate:', error);
                        setIsAuthenticated(false);
                  } finally {
                        setLoading(false);
                  }
            };

            checkAuth();
      }, []);

      const handleLogin = async (email, password) => {
            try {
                  await account.createEmailPasswordSession(email, password);
                  setIsAuthenticated(true);
            } catch (error) {
                  console.error('Login failed:', error);
                  setIsAuthenticated(false);
            }
      };

      const handleLogout = async () => {
            try {
                  await account.deleteSession('current');
                  setIsAuthenticated(false);
            } catch (error) {
                  console.error('Logout failed:', error);
            }
      };

      if (loading) {
            return <div>Loading...</div>;
      }

      return (
            <Router>
                  {isAuthenticated && <Header onLogout={handleLogout} />} {/* Pass onLogout handler to Header */}
                  <Routes>
                        {/* Public Route: Login */}
                        <Route
                              path="/login"
                              element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
                        />

                        {/* Private Routes */}
                        <Route
                              path="/"
                              element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
                        />
                        <Route
                              path="/home"
                              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                        />



                        <Route
                              path="/calling-json-to-excel"
                              element={isAuthenticated ? <JsonToExcelCallingData /> : <Navigate to="/login" />}
                        />
                        <Route
                              path="/download-documents"
                              element={isAuthenticated ? <DownloadCollection /> : <Navigate to="/login" />}
                        />

                  </Routes>
            </Router>
      );
};

export default App;