import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './LogIn.css'

const LogIn = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'


    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError(null);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })

    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="" />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name="password" id="" />
                </div>
                {
                    error && <p className='error-msg'>{error}</p>
                }
                <button className='loginBtn' type="submit">Log In</button>
            </form>
            <p className='msg-for-newbe'>New to Ema John? <NavLink className={'link'} to={'/Register'}>Create new account.</NavLink> </p>
        </div>
    );
};

export default LogIn;