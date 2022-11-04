import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Register.css'

const Register = () => {

    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        setError(null);
        if (password.length < 6) {
            setError('Password must contain at least 6 characters');
        }
        if (password !== confirm) {
            setError("Password did not matched");
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
    }

    return (
        <div onSubmit={handleSubmit} className='form-container'>
            <h1 className='form-title'>Log In</h1>
            <form>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required id="" />
                </div>
                <div className='input-group'>
                    <label htmlFor="confirm">Confirm password</label>
                    <input type="password" name="confirm" required id="" />
                </div>
                {
                    error && <p className='error-msg'>{error}</p>
                }
                <button className='loginBtn' type="submit">Register</button>
            </form>
            <p className='msg-for-newbe'>Already have an account? <NavLink className={'link'} to={'/LogIn'}>Log In.</NavLink> </p>
        </div>
    );
};

export default Register;