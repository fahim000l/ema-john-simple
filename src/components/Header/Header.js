import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    return (
        <div className='nav-bar'>
            <div>
                <img src={logo} alt="" />
            </div>
            <div className='nav-list'>
                <Link to={'./Shop'}>Shop</Link>
                <Link to={'./OrderReview'}>Order Review</Link>
                <Link to={'./ManageInventory'}>Manage Inventory</Link>
                <Link to={'./Abouts'}>Abouts</Link>
            </div>
        </div>
    );
};

export default Header;