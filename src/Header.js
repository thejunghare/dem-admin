import React from 'react'
import './index.css';

const Header = () => {
    return (
        <nav className='nav-container'>
            <ul>
                <li><a href="./home">Dashboard</a></li>
                <li><a href="./home">Download Data</a></li>
                <li><a href="./json-to-excel">JSON to excel</a></li>
            </ul>
        </nav>
    )
}

export default Header