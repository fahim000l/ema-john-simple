import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    // const [visit, setVisit] = useState('Shop');
    const { user, logOut } = useContext(AuthContext)
    return (
        <div className='nav-bar'>
            <div>
                <img src={logo} alt="" />
            </div>
            <div className={`nav-list `}>
                <NavLink className={`${(isActive) => isActive ? 'activeStyle' : undefined}`} to={'./Shop'}>Shop</NavLink>
                <NavLink to={'./OrderReview'}>Order Review</NavLink>
                <NavLink to={'./ManageInventory'}>Manage Inventory</NavLink>
                <NavLink to={'./Abouts'}>Abouts</NavLink>
                {user?.email ?
                    <button onClick={logOut} className='logout-btn'>Log Out</button>
                    :
                    <>
                        <NavLink to={'./LogIn'}>Log In</NavLink>
                        <NavLink to={'./Register'}>Register</NavLink>
                    </>
                }
            </div>
        </div >
    );
};

export default Header;