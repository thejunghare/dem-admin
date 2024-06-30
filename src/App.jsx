import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './pages/Header';
import JsonToExcel from './pages/JsonToExcel';
import DownloadCollection from './pages/DownloadCollection';
import DocumentCount from './pages/DocumentCount';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/json-to-excel" element={<JsonToExcel />} />
        <Route path="/download-documents" element={<DownloadCollection />} />
        <Route path="/count-emp-survey" element={<DocumentCount />} />
      </Routes>
    </Router>
  );
};

export default App;

