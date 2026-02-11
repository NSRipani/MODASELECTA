import React, { useState } from 'react';
import './navAdmin.css';
import useCloseSession from './../../../hook/messageCloseSession.jsx';
// import PanelUser from '../panelUser/panelUser.jsx';
// import PanelProduct from '../panelProduct/panelProduct.jsx';
// import Error404 from '../../error404/error404.jsx';
import MensageHome from '../panelHome/messageHome.jsx';
// import OrderPanel from '../panelOrders/panelOrders.jsx';
import ConfiguracionPanel from '../panelConfig/ConfiguracionPanel.jsx';

const NavAdmin = () => {
    
    const [view, setView] = useState("home")
    const confirmLogout = useCloseSession();
    
    const handleLinkClick = (newView) => {
        setView(newView); // Actualiza el estado al hacer clic en un enlace
    };
    
    const renderComponent = () => {
        if (view === "configuracion") {
        //     return <PanelUser />;
        // } else if (view === "productos") {
        //     return <PanelProduct />;
        // } else if (view === "ordenes") {
        //     return <OrderPanel />;
        // } else if (view === "configuracion") {
            return <ConfiguracionPanel />;
        } else {
            return <MensageHome />;
        }
    }

    return (    
        <div className="todo">
            <aside className="navBar-conteiner">
                <h1>GESTION ADMINISTRATIVA</h1>
            
                <div className="navBar">
                    <ul className="btns">
                        <li className="boton-nav">
                            <button id="btn-gestion" onClick={ () => handleLinkClick("home")}>Home</button>
                        </li>
                        {/* <li className="boton-nav">
                            <button id="btn-gestion" onClick={ () => handleLinkClick("usuarios")}>Usuarios</button>
                        </li>
                        <li className="boton-nav">
                            <button id="btn-gestion" onClick={ () => handleLinkClick("productos")} >Productos</button>
                        </li>
                        <li className="boton-nav">
                            <button id="btn-gestion" onClick={ () => handleLinkClick("ordenes")}>Ordenes</button>
                        </li> */}
                        <li className="boton-nav">
                            <button id="btn-gestion" onClick={() => handleLinkClick("configuracion")}>Configuración</button>
                        </li>
                        <li className="boton-nav">
                            <button id="btn-gestion" onClick={confirmLogout}>Cerrar Sesión</button>
                        </li> 
                    </ul>
                </div>
            </aside>
            <div>
                {renderComponent()}       
            </div>
        </div>
    );
};

export default NavAdmin;