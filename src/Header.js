import React from 'react'
import './index.css';

const Header = ({ onComponentChange }) => {
  const handleDashboardClick = (event) => {
    event.preventDefault();
    onComponentChange('DocumentCount');
  };

  const handleDownloadClick = (event) => {
    event.preventDefault();
    onComponentChange('DownloadCollection');
  };

  const handleConvertClick = (event) => {
    event.preventDefault();
    onComponentChange('JsonToExcel');
  };

  return (
    <nav className='nav-container'>
      <ul>
        <li><a href="#" onClick={handleDashboardClick}>Dashboard</a></li>
        <li><a href="#" onClick={handleDownloadClick}>Download</a></li>
        <li><a href="#" onClick={handleConvertClick}>Convert</a></li>
      </ul>
    </nav>
  )
}

export default Header;
