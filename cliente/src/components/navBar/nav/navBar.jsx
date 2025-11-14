import './navbar.css';
import Logo from "../logo/logo.jsx";
import Logout from "../logout/logout.jsx";
import Carrito from '../img-carrito/carroImagen.jsx';
import { Toaster } from 'sonner';
import React, { useState } from 'react';
import { useUserContext } from '../../../context/userContext.jsx';
import useCloseSession from '../../../hook/messageCloseSession.jsx';
import { FaBars, FaTimes } from "react-icons/fa";

const BarraNav = () => {
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { payload } = useUserContext();
    const confirmLogout = useCloseSession();

    const isAdmin = payload?.role === 'admin';
    const isUser = payload?.role === 'user';

    const toggleAdminMenu = () => {
        setShowAdminMenu(!showAdminMenu);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="hd-conteiner">
            <div>
                <Logo />
            </div>

            <div className="as">
                <a href="/">HOME</a>
                <a href="/products">PRODUCTOS</a>
                <a href="/contact">CONTACTO</a>

                { isAdmin && (
                    <div className="admin-dropdown" >
                        <button onClick={toggleAdminMenu} className="admin-btn">
                            ADMIN <i className={`fas fa-chevron-down ${showAdminMenu ? 'rotate' : ''}`}></i>
                        </button>
                        {showAdminMenu && (
                            <div className="admin-menu">
                                <a href="/admin" onClick={toggleAdminMenu}>HOME</a>
                                <a href="/admin/users" onClick={toggleAdminMenu}>USUARIOS</a>
                                <a href="/admin/products" onClick={toggleAdminMenu}>PRODUCTOS</a>
                                <a href="/admin/orders" id='order' onClick={toggleAdminMenu}>ORDENES</a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Botón Burger solo en tablet/móvil */}
            <button className="burger-btn" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Menú deslizante (icons + sec-icons) */}
            <div className={`icons-group ${menuOpen ? "show" : ""}`}>
                <div className="icons">
                    {isUser ? (
                        <>
                            <a href="/users/profile" className="profile" aria-label="Perfil del usuario">
                                <i className="fa-solid fa-address-card"></i>
                                <p>{payload?.first_name}</p>
                            </a>
                            <Logout className='close' onClick={confirmLogout}/>
                        </>
                    ) : (
                        // Mostrar login sólo si NO es admin
                        !isAdmin && (
                            <a href="/users/login" id="login" aria-label="Login">
                                <i className="fas fa-sign-in-alt"></i>
                            </a>
                        )
                    )}
                </div>
                <div className="sec-icons">
                    <a href='/users/register' id='register'><i className="fas fa-user-plus"></i></a>
                    <Carrito />
                </div>
            </div>
            <Toaster />
        </header>
    );
};

export default BarraNav;
