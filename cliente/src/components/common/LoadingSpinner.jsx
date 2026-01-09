import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#18bc9c', message = 'Cargando...' }) => {
    const spinnerStyle = {
        width: size === 'small' ? '20px' : size === 'large' ? '50px' : '30px',
        height: size === 'small' ? '20px' : size === 'large' ? '50px' : '30px',
        borderColor: color,
        borderTopColor: 'transparent',
    };

    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner" style={spinnerStyle}></div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;