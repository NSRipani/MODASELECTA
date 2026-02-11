import React, { useState } from 'react';
import './configuracionPanel.css';
import PanelUser from '../panelUser/panelUser.jsx';
import PanelProduct from '../panelProduct/panelProduct.jsx';
import OrderPanel from '../panelOrders/panelOrders.jsx';

const ConfiguracionPanel = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Configuración General' },
    { id: 'usuarios', label: 'Gestión de Usuarios' },
    { id: 'productos', label: 'Gestión de Productos' },
    { id: 'ordenes', label: 'Gestión de Órdenes' },
    { id: 'seguridad', label: 'Seguridad' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="config-section">
            <h3>Configuración General</h3>
            <form className="config-form">
              <div className="form-group-config">
                <label htmlFor="siteName">Nombre del Sitio</label>
                <input type="text" id="siteName" defaultValue="Mi Tienda Online" />
              </div>
              <div className="form-group-config">
                <label htmlFor="siteDescription">Descripción del Sitio</label>
                <textarea id="siteDescription" rows="3" defaultValue="Descripción de la tienda"></textarea>
              </div>
              <div className="form-group-config">
                <label htmlFor="contactEmail">Correo de Contacto</label>
                <input type="email" id="contactEmail" defaultValue="contacto@mitienda.com" />
              </div>
              <button type="submit" className="btn-primary">Guardar Cambios</button>
            </form>
          </div>
        );
      case 'usuarios':
        return <PanelUser />;
      case 'productos':
        return <PanelProduct />;
      case 'ordenes':
        return <OrderPanel />;
      case 'seguridad':
        return (
          <div className="config-section">
            <h3>Configuración de Seguridad</h3>
            <form className="config-form">
              <div className="form-group-config">
                <label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</label>
                <input type="number" id="sessionTimeout" defaultValue="30" />
              </div>
              <div className="form-group-config">
                <label htmlFor="passwordPolicy">Política de Contraseñas</label>
                <select id="passwordPolicy">
                  <option value="weak">Débil</option>
                  <option value="medium">Media</option>
                  <option value="strong">Fuerte</option>
                </select>
              </div>
              <div className="form-group-config">
                <label>
                  <input type="checkbox" defaultChecked /> Habilitar Autenticación de Dos Factores
                </label>
              </div>
              <button type="submit" className="btn-primary">Guardar Cambios</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="configuracion-panel">
      <div className="panel-header">
        <h2>Panel de Configuración - Administrador</h2>
      </div>
      <div className="panel-content">
        <div className="tabs">
          {tabs.map(tab => (
            <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >{tab.label}</button>
          ))}
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPanel;