import React, { useState } from 'react';
import './navAdmin.css';
import { Link } from 'react-router-dom';
import useCloseSession from './../../../hook/messageCloseSession.jsx';
import PanelUser from '../panelUser/panelUser.jsx';
import PanelProduct from '../panelProduct/panelProduct.jsx';
import Error404 from '../../error404/error404.jsx';
import MensageHome from '../panelHome/messageHome.jsx';
import OrderPanel from '../panelOrders/panelOrders.jsx';

const NavAdmin = () => {
    
    const [view, setView] = useState("home")
    const confirmLogout = useCloseSession();
    
    const handleLinkClick = (newView) => {
        setView(newView); // Actualiza el estado al hacer clic en un enlace
    };
    
    const renderComponent = () => {
        if (view === "usuarios") {
            return <PanelUser />;
        } else if (view === "productos") {
            return <PanelProduct />;
        } else if (view === "ordenes") {
            return <OrderPanel />;
        } else if (view === "configuracion") {
            return <Error404 />;
        } else {
            return <MensageHome />;
        }
    }

    return (    
        <div className="todo">
            <div className="navBar-conteiner">
                <h1>GESTION ADMINISTRATIVA</h1>
            </div>
            <div className="navBar">
                <ul className="btns">
                    <li className="boton-nav">
                        <Link id="btn-gestion" to={"/admin"} onClick={ () => handleLinkClick("home")}>Home</Link>
                    </li>
                    <li className="boton-nav">
                        <Link id="btn-gestion" to={"/admin/users"} onClick={ () => handleLinkClick("usuarios")}>Usuarios</Link>
                    </li>
                    <li className="boton-nav">
                        <Link id="btn-gestion" to={"/admin/products"} onClick={ () => handleLinkClick("productos")} >Productos</Link>
                    </li>
                    <li className="boton-nav">
                        <Link id="btn-gestion" to={"/admin/orders"} onClick={ () => handleLinkClick("ordenes")}>Ordenes</Link>
                    </li>
                    <li className="boton-nav">
                        <Link id="btn-gestion" to={"/admin/config"} onClick={() => handleLinkClick("configuracion")}>Configuración</Link>
                    </li>
                    <li className="boton-nav">
                        <Link id="btn-gestion" onClick={confirmLogout}>Cerrar Sesión</Link>
                    </li> 
                </ul>
            </div>
            <div>
                {renderComponent()}       
            </div>
        </div>
    );
};

export default NavAdmin;