import React from 'react';
import './logout.css';
import useCloseSession from './../../../hook/messageCloseSession.jsx';

const Logout = () => {

    const mesage = useCloseSession()
    
    return (
        <div className='close-session'>
            <i className="fas fa-sign-out-alt" onClick={mesage}></i>
        </div>
    );
};

export default Logout;
