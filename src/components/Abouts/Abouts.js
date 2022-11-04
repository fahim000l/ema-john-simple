import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/UserContext';

const Abouts = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1>Secrets About {user?.displayName} </h1>
        </div>
    );
};

export default Abouts;