import { useState } from "react";
import { useUserContext } from "../../../context/userContext.jsx";
import { useOrderContext } from "../../../context/orderContext.jsx";
import useCloseSession from "../../../hook/messageCloseSession.jsx";
import { errorMessag, success } from "../../message/message.jsx";
import "./profile.css";
import { useCarroContext } from "../../../context/cartContext.jsx";

const UserProfile = () => {
  const { payload, resetPassword , updateUser  } = useUserContext();
  const { orders, getOrdersId, ordersID } = useOrderContext();

  const [ view, setView ] = useState("main");
  const [ profileData, setProfileData ] = useState(payload);

  // Estados específicos para cambiar contraseña
  const [ password, setCurrentPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  console.log('ORDENES EN PROFILE: ', orders)
  console.log('ORDENES USUARIO EN PROFILE: ', ordersID)
  
  // Estados para editar perfil
  const [formData, setFormData] = useState({
    first_name: payload?.first_name || "",
    last_name: payload?.last_name || "",
    email: payload?.email || "",
    password: payload?.password || "",
    age: payload?.age || ""
  });

  const confirmLogout = useCloseSession();

  // Manejar inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar cambios en perfil: ARREGLAR LÓGICA
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {

      await updateUser( formData );

      success("¡Perfil actualizado con éxito!");
      setProfileData({ ...profileData, ...formData });
      setView("profile");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      errorMessag("Error al actualizar los datos. Verifica la información.");
    }
  };

  // Cambiar contraseña: ARREGLAR LÓGICA
  const handlePassword = async (e) => {
    e.preventDefault();
    // if (newPassword !== confirmPassword) {
    //   return errorMessag("Las contraseñas no coinciden");
    // }
    try{
      await resetPassword( password, newPassword);
      success("¡Contraseña actualizada con éxito!");

      // limpiar inputs
      setCurrentPassword("");
      setNewPassword("");
      // setConfirmPassword("");

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
    <div className="contenedor-principal">
      {/* HEADER */}
      <div className="titl-Perfil">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Perfil"/>
        <h1> Bienvenido, {payload?.first_name} {payload?.last_name} </h1>
      </div>

      {/* BOTONES */}
      <div className="contenedor-second">
        <div className="funciones">
          <button onClick={() => setView("profile")}>Ver Perfil</button>
          <button onClick={() => setView("edit")}>Editar Perfil</button>
          <button onClick={handleViewOrders}>Mis Pedidos</button>
          <button onClick={confirmLogout}>Cerrar Sesión</button>
        </div>

        {/* CONTENIDO */}
        <div className="datos">
          {view === "main" && <p style={{fontSize: '3rem'}}>Estas en tu perfil</p>}

          {/* PERFIL */}
          {view === "profile" && payload && (
            <div className="profile-details">
              <h2>Detalles del Perfil</h2>
              <div className="name">
                <p id='n' ><strong>Nombre:</strong></p> 
                <p id='nom'>{payload.first_name} {payload.last_name}</p>
              </div>
              <div className="email">
                <p id='n'><strong>Email:</strong></p> 
                <p id='nom'>{payload.email}</p>
              </div>
              <div className="age">
                <p id='n'><strong>Edad:</strong></p> 
                <p id='nom'>{payload.age} Años</p>
              </div>
              <div className="rol">
                <p id='n'><strong>Rol:</strong></p> 
                <p id='nom'>{payload.role}</p>
              </div>
              <div className="idCart">
                <p id='n'><strong>ID Carrito:</strong></p> 
                <p id='nom'>{payload.cart}</p>
              </div>
            </div>
          )}

          {/* EDITAR PERFIL */}
          {view === "edit" && (
            <div className="modal-overlay">
              <div className="edit-profile">
                <button className="modal-close" onClick={() => setView("profile")}>✕</button>
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSaveProfile}>
                  <label>Nombre: (*)</label>
                  <input type="text" name="first_name" value={formData.first_name.trim()} onChange={handleInputChange} />

                  <label>Apellido: (*)</label>
                  <input type="text" name="last_name" value={formData.last_name.trim()} onChange={handleInputChange} />

                  <label>Email: (*)</label>
                  <input type="email" name="email" placeholder="ejemplo@gmail.com" value={formData.email.trim()} onChange={handleInputChange} />

                  <label>Edad: (*)</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                  
                  <div className='change-password'>
                    <p>(*) Datos obligatorios </p>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView("password"); }}
                    >Cambiar contraseña </a>
                  </div>
                  <button type="submit">Guardar Cambios</button>
                </form>
              </div>
            </div>
          )}
          {view === "password" && (
          <div className="modal-overlay">
            <div className="edit-profile">
              <button className="modal-back" onClick={() => setView("edit")}>←</button>
              <button className="modal-close" onClick={() => setView("profile")}>✕</button>
              <h2>Cambiar Contraseña</h2>
              <form onSubmit={ handlePassword } >
                <label>Contraseña actual: (*)</label>
                <input type="password" name="currentPassword" value={password} onChange={(e) => setCurrentPassword(e.target.value)} required/>

                <label>Nueva contraseña: (*)</label>
                <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                <p>(*) Datos obligatorios</p>

                <button type="submit">Guardar Contraseña</button>
              </form>
            </div>
          </div>
        )}

          {/* PEDIDOS */}
          {view === "orders" && (
            <div className="orders-table">
              <h2>Mis Pedidos</h2>
              {ordersID?.length === 0 ? (
                <p>No tienes órdenes realizadas.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>ID del Pedido</th>
                      <th>ID del Carrito</th>
                      <th>ID del Usuario</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersID && ordersID?.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.cart?._id}</td>
                        <td>{order.cart?.user}</td>
                        <td>{new Date(order.cart?.updatedAt).toLocaleDateString('es-AR')}</td>
                        <td>${order.cart?.total}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
