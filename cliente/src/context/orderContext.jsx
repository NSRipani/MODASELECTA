import React, { createContext, useContext, useEffect, useMemo, useState} from 'react'
// import { useUserContext } from './userContext.jsx';
import axios from 'axios';
import { errorMessag, info, success } from '../components/message/message.jsx';
import { useCarroContext } from './cartContext.jsx';
import { useUserContext } from './userContext.jsx';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = (props) => {
    // TODAS LAS ORDENES
    const [ orders, setOrders ] = useState([])
    
    // ESTADOS
    const [ orderStatus, setOrderStatus ] = useState('')
    
    // FILTROS Y BUSQUEDAS
    const [ ordersUserID, setOrdersUserID ] = useState([])
    const [ ordersID, setOrdersID ] = useState([])
    const [ date, setDate ] = useState("");

    const { idUser } = useCarroContext()

    const rute = "http://localhost:8000/api/order";
    const iduserOrder = ordersID

    const getOrders = async () => {
        try {
            const res = await axios.get(`${rute}`, {withCredentials: true})
            if (res.status === 200) 
            setOrders(res.data.order)             
        } catch (error) {
            errorMessag('Nose puede mostrar las ordenes')
        }
    }
    

    const getOrdersId = async (ordersID) => {
        try {
            const res = await axios.get(`${rute}/${ordersID}`, { withCredentials: true })
            console.log(res.data)
            const iDOrder = res.data.order
            setOrders(iDOrder ? [iDOrder] : [])

            setOrdersID(res.data.order.filter(order => order.cart.user === idUser) )
            success('Orden encotrada')
        } catch (error) {
            errorMessag('Nose puede mostrar las ordenes de este ID')
        }
    }
    
    // AJUSTAR FUNCION
    const getOrdersIdUSER = async () => {
        try {
            const res = await axios.get(`${rute}/user/${iduserOrder}`,{ withCredentials: true })
            console.log(res.data)
            if (res.status === 200){
                const iDUserOrder = res.data
                setOrders(iDUserOrder ? [iDUserOrder] : [])
                console.log('ID USER: ', iDUserOrder) 
                console.log('ORDEN PARA ID USER-----: ', iDUserOrder) 
            }
        } catch (error) {
            console.error(error)
            errorMessag('Nose puede mostrar las ordenes de este Usuario')
        }
    }
    
    // Poner en funcionamiento a futuro
    // Cambiar estado
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const statusOrder = await axios.put(`${rute}/${orderId}`, { status: newStatus }, { withCredentials: true });
            if (statusOrder.status === 200) success('Estado de la orden actulizada con éxito');
            setOrderStatus(statusOrder.data.order.status);
            getOrders(); // refrescar
        } catch (error) {
            console.error("Error al actualizar orden:", error);
        }
    };

    // Eliminar orden
    const deleteOrder = async (id) => {
        try {
            const deleteOrder = await axios.delete(`${rute}/${id}`, { withCredentials: true });
            if (deleteOrder.status === 200) {
                success('Orden eliminada con éxito');
                setOrders((prevList) => prevList.filter((o) => o.id !== id))
                console.log('ordenes, ', orders)
                getOrders(); // refrescar
            }
            
        } catch (error) {
            console.error("Error al eliminar orden:", error);
            errorMessag('No se pudo eliminar la orden');
        }
    };

    // Poner en funcionamiento a futuro
    // Obtener órdenes por fecha 
    const getOrdersByDate = async (date) => {
        try {
            const res = await axios.get(`${rute}/date?date=${date}`, { withCredentials: true });
            if (res.status === 200) {
                setOrders(res.data.orders || []); 
                success("Órdenes obtenidas por fecha con éxito");
            }
            console.log('ORDENES POR FECHA: ', res.data.orders)
        } catch (error) {
            console.error("Error al obtener órdenes por fecha:", error);
            errorMessag("No se pudieron obtener las órdenes por fecha");
            setOrders([]);
        }
    };
    
    const clearOrders = () => {
        if (orders.length === 0) {
            info('No hay órdenes para limpiar.');
        } else {
            setOrders([]);
            success('Órdenes limpiadas con éxito.');
        }
    };
    
    const resetSearchFilter = async () => {
        setOrdersID('')
        setOrdersUserID('')
        setDate('')
        await getOrders()
        if (orders) success('Órdenes obtenidas con éxito');
    };
    
    return (
        <OrderContext.Provider value={ { 
                orders, setOrders, getOrders, 
                
                clearOrders, deleteOrder, getOrdersId,
                
                getOrdersByDate, updateOrderStatus,

                getOrdersIdUSER,
                
                ordersUserID, setOrdersUserID, ordersID, setOrdersID, orderStatus, setOrderStatus, date, setDate,
                resetSearchFilter
                
            }}>
            {props.children}
        </OrderContext.Provider>
    )
}