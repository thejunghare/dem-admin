import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/json-to-excel">JSON to Excel</Link>
        </li>
        <li>
          <Link to="/download-documents">Download Survey</Link>
        </li>
        <li>
          <Link to="/count-emp-survey">Count employee Survey</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
