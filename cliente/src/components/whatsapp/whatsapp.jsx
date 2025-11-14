import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; 
import './whatsapp.css'; 

const WhatsAppIcon = () => {
    return (
        <div className="whatsapp-icon">
            <a href="https://wa.me/3424023366" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className='wAPP'/>
            </a>
        </div>
    );
};

export default WhatsAppIcon;
