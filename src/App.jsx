"use client";

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import JsonToExcelCallingData from './pages/JsonToExcelCallingData';
import DownloadCollection from './pages/DownloadCollection';
import { account } from './lib/appwrite';
import { Spinner } from "flowbite-react";

const App = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const checkAuth = async () => {
                  try {
                        await account.get();
                        setIsAuthenticated(true);
                  } catch (error) {
                        setIsAuthenticated(false);
                  } finally {
                        setLoading(false);
                  }
            };

            checkAuth();
      }, []);

      const handleLogin = () => {
            setIsAuthenticated(true);
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
            return (
                  <div className="relative m-6 w-screen h-screen outline-dashed outline-1 outline-black">
                        <div className="absolute w-[50px] h-[50px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <Spinner aria-label="Loading..." />
                        </div>
                  </div>

            );
      }

      return (
            <Router>
                  {isAuthenticated && <Header onLogout={handleLogout} />}
                  <Routes>
                        <Route
                              path="/login"
                              element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
                        />
                        <Route
                              path="/home"
                              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                              path="/"
                              element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
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
