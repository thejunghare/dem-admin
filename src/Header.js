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
        <li><button onClick={handleDashboardClick}>Dashboard</button></li>
        <li><button onClick={handleDownloadClick}>Download</button></li>
        <li><button onClick={handleConvertClick}>Convert</button></li>
      </ul>
    </nav>
  )
}

export default Header;
