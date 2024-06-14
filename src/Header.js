import React from 'react'
import './index.css';

const Header = () => {
    return (
        <nav className='nav-container'>
            <ul>
                <li><a href="./home">Dashboard</a></li>
                <li><a href="./home">Download</a></li>
                <li><a href="./json-to-excel">Convert</a></li>
            </ul>
        </nav>
    )
}

export default Header