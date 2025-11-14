import { useEffect, useState } from "react";
import './panelOrders.css';
import { useOrderContext } from "../../../context/orderContext.jsx";
import { Toaster } from "sonner";
import { RiListView } from "react-icons/ri";
import { MdCleaningServices } from "react-icons/md";

const OrderPanel = () => {

    const { getOrders, clearOrders, orders, deleteOrder, updateOrderStatus, getOrdersIdUSER, getOrdersId,
        ordersID, setOrdersID, date, setDate, ordersUserID, setOrdersUserID, resetSearchFilter, getOrdersByDate
    } = useOrderContext()
    console.log('ORDENES EN PANEL ORDERS: ', orders)
    console.log('ORDENES ID EN PANEL ORDERS: ', ordersID)
    console.log('ORDENES USER ID EN PANEL ORDERS: ', ordersUserID)
    
    const handleSearchClick = async () => {
        if (ordersID) return await getOrdersId(ordersID);
        
        if (ordersUserID) return await getOrdersIdUSER(ordersUserID);
    }; 

    const viewOrders = async () => {
        await getOrders();
    };

    const icon = {color: 'white', fontSize: '1.5rem', marginRight: '5px'}

    // Estados posibles
    const orderStatus = [ "pendiente", "pagada", "procesando", "enviada", "entregada", "cancelada", "devuelta" ];


    return (
        <div className="order-container">
            <h1>Gestión de órdenes</h1>
            <div className="order-content-tasks">
                <div className="order-filters">
                    {/* 🔎 Selector de criterio */}
                    <div className="select-search">
                        <div>
                            <p >Busqueda por parametros</p>
                            <div className="etiqueta">
                                <div>
                                    <p >ID Orden</p>
                                    <input type="text" placeholder="Buscar por ID de orden..." value={ordersID} onChange={(e) => {
                                        const val = e.target.value; setOrdersID(val);
                                        // limpiar y habilitar el otro campo cuando escribes aquí
                                        if (val) setOrdersUserID(''); }}
                                        disabled={Boolean(ordersUserID)}/>
                                </div>
                                <div>
                                    <p >ID User</p>
                                    <input type="text" placeholder="Buscar por ID del usuario..." value={ordersUserID} onChange={(e) => {
                                        const val = e.target.value; setOrdersID(val);
                                        // limpiar y habilitar el otro campo cuando escribes aquí
                                        if (val) setOrdersID(''); }}
                                        disabled={Boolean(ordersID)}/>
                                </div>
                                <div>
                                    <p>Date</p>
                                    <input type="date" className="custom-date" value={date} onChange={(e) => setDate(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="btn-search">
                            <button onClick={handleSearchClick} >Buscar</button>
                            <button onClick={resetSearchFilter}>Reset</button>
                        </div>
                    </div>
                    <div className="select-search2">
                        <button className='btn-list' onClick={viewOrders}><RiListView style={icon}/>Lista de Ordenes</button>
                        <button className='btn-reset' onClick={clearOrders}><MdCleaningServices style={icon}/>Limpiar tabla</button>
                    </div>

                </div>
            </div>

            <div className="order-table">
                <div className="order-header">
                    <h3>Lista de Órdenes</h3>
                </div>
                <div className="order-body">
                    <table className="table-orders">
                        <thead>
                            <tr>
                                <th>ID Orden</th>
                                <th>ID Usuario</th>
                                <th>Fecha</th>
                                <th>Productos</th>
                                <th style={{textAlign:'end'}}>Subtotal</th>
                                <th style={{textAlign:'end'}}>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        { (!orders || orders?.length === 0) && 
                            <tr>
                                <td className='sin-ordenes' colSpan="9">No hay órdenes para mostrar</td>
                            </tr>}
                        {(orders || orders?.length === 0) ? (
                            orders.map((order) => (
                                <tr key={order?.id}>
                                    <td>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <span>{order?.id}</span>
                                            <button type="button" className="btn-small" onClick={() => setOrdersID(order.id)}>Usar ID</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <span>{order.cart?.user || "Usuario no encontrado"}</span>
                                            {/*  */}
                                            <button type="button" className="btn-small" onClick={() => setOrdersUserID(order.cart?.user)}>Usar ID</button>
                                        </div>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleString('es-AR')}</td>
                                    <td>
                                        <ul className="prod-list">
                                            {order.cart?.products?.items?.length > 0 ? (
                                                order.cart?.products?.items?.map((item) => (
                                                    <li key={item._id}>
                                                        <p id='tit'>{item?.name}</p>
                                                        <p>x{item.quantity}</p>
                                                        <p>${item?.price}</p>
                                                    </li>
                                                )
                                            )): (
                                                <li>Sin productos</li>
                                            )}
                                        </ul>
                                    </td>
                                    <td style={{textAlign:'end'}}>$ {order.cart?.products?.items?.reduce((acc, item) => acc + item.subtotal, 0)}</td>
                                    <td style={{textAlign:'end'}}>$ {order.cart?.total}</td>
                                    <td>
                                        <select className='selector' value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                                            {orderStatus.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn-delete" onClick={() => deleteOrder(order.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ):(!orders || orders?.length === 0) && 
                            <tr>
                                <td className='sin-ordenes' colSpan="9">No hay órdenes para mostrar</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    )
};

export default OrderPanel;
