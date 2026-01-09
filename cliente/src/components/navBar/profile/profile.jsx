import { useState } from "react";
import { useAuthContext } from '../../../context/authContext.jsx';
import { useUserContextOptimized } from "../../../context/userContextOptimized.jsx";
import { useOrderContext } from "../../../context/orderContext.jsx";
import useCloseSession from "../../../hook/messageCloseSession.jsx";
import { errorMessag, success, info } from "../../message/message.jsx";
import "./profile.css";
import { useEffect } from "react";

const UserProfile = () => {
  
  const { payload } = useAuthContext();
  const { resetPassword , updateUserProfile  } = useUserContextOptimized();
  const { orders, getOrders, getOrdersId, ordersID } = useOrderContext();

  const [ view, setView ] = useState("profile");
  const [ profileData, setProfileData ] = useState(payload);

  // Estados específicos para cambiar contraseña
  const [ password, setCurrentPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  
  // Estados para editar perfil
  const [formData, setFormData] = useState({
    first_name: payload?.first_name || "",
    last_name: payload?.last_name || "",
    email: payload?.email || "",
    age: payload?.age || ""
  });

  useEffect(() => {
    getOrders();
    // Inicializar formData cuando el payload esté disponible
    if (payload) {
      setFormData({
        first_name: payload?.first_name || "",
        last_name: payload?.last_name || "",
        email: payload?.email || "",
        age: payload?.age || ""
      });
    }
  }, [payload]);

  const confirmLogout = useCloseSession();

  // Manejar inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar cambios en perfil - envía solo campos modificados
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const id = payload?.id;
      if (!id) {
        return errorMessag('Usuario no identificado.');
      }

      await updateUserProfile(id, formData);

      success("¡Perfil actualizado con éxito!");
      setProfileData({ ...profileData, ...formData });
      setView("profile");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      errorMessag("Error al actualizar los datos. Verifica la información.");
    }
  };

  // Cambiar contraseña
  const handlePassword = async (e) => {
    e.preventDefault();
    try{
      await resetPassword( password, newPassword);
      success("¡Contraseña actualizada con éxito!");

      // limpiar inputs
      setCurrentPassword("");
      setNewPassword("");

      setView("profile");
    } catch (error){
      console.error(error);
      errorMessag("Error al cambiar la contraseña.");
    }
  }

  // Pedidos
  const handleViewOrders = async () => {
    try {
      await getOrdersId(ordersID);
      setView("orders");
    } catch {
      console.log("No hay órdenes");
    }
  };

  return (
    <div className="profile-container">
      {/* Sidebar de navegación */}
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Perfil" />
          <h3>{payload?.first_name} {payload?.last_name}</h3>
          <p>{payload?.email}</p>
        </div>
        <nav className="profile-nav">
          <button className={view === "profile" ? "active" : ""} onClick={() => setView("profile")}>Perfil</button>
          <button className={view === "edit" ? "active" : ""} onClick={() => setView("edit")}>Editar Perfil</button>
          <button className={view === "password" ? "active" : ""} onClick={() => setView("password")}>Cambiar Contraseña</button>
          <button className={view === "orders" ? "active" : ""} onClick={handleViewOrders}>Mis Pedidos</button>
          <button onClick={confirmLogout}>Cerrar Sesión</button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="profile-content">
        {/* Vista de Perfil */}
        {view === "profile" && payload && (
          <div className="profile-section">
            <h2>Información del Perfil</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Nombre Completo:</label>
                <span>{payload?.first_name} {payload?.last_name}</span>
              </div>
              <div className="info-item">
                <label>Correo Electrónico:</label>
                <span>{payload?.email}</span>
              </div>
              <div className="info-item">
                <label>Edad:</label>
                <span>{payload?.age} años</span>
              </div>
              <div className="info-item">
                <label>Rol:</label>
                <span>{payload?.role}</span>
              </div>
              <div className="info-item">
                <label>ID de Carrito:</label>
                <span>{payload?.cart}</span>
              </div>
            </div>
          </div>
        )}

        {/* Vista de Editar Perfil */}
        {view === "edit" && (
          <div className="profile-section">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="first_name">Nombre</label>
                <input id="first_name" type="text" name="first_name" value={formData?.first_name ?? ""} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Apellido</label>
                <input id="last_name" type="text" name="last_name" value={formData?.last_name ?? ""} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input id="email" type="email" name="email" placeholder="ejemplo@gmail.com" value={formData?.email ?? ""} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="age">Edad</label>
                <input id="age" type="number" name="age" value={formData?.age ?? ""} onChange={handleInputChange} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Guardar Cambios</button>
                <button type="button" className="btn-secondary" onClick={() => setView("profile")}>Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {/* Vista de Cambiar Contraseña */}
        {view === "password" && (
          <div className="profile-section">
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handlePassword} className="profile-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña Actual</label>
                <input id="currentPassword" type="password" name="currentPassword" value={password} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <input id="newPassword" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Actualizar Contraseña</button>
                <button type="button" className="btn-secondary" onClick={() => setView("profile")}>Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {/* Vista de Pedidos */}
        {view === "orders" && (
          <div className="profile-section">
            <h2>Mis Pedidos</h2>
            {ordersID?.length === 0 ? (
              <p>No tienes órdenes realizadas.</p>
            ) : (
              <div className="orders-list">
                {ordersID?.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Pedido #{order.id}</span>
                      <span className="order-status">{order.status}</span>
                    </div>
                    <div className="order-details">
                      <p><strong>ID Carrito:</strong> {order.cart?._id}</p>
                      <p><strong>ID Usuario:</strong> {order.cart?.user}</p>
                      <p><strong>Fecha:</strong> {new Date(order.cart?.updatedAt).toLocaleDateString('es-AR')}</p>
                      <p><strong>Total:</strong> ${order.cart?.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
