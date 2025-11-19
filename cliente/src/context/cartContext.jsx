import React, { createContext, useContext, useEffect, useMemo, useState} from 'react'
import axios from 'axios';
import { errorMessag, info, success } from '../components/message/message.jsx';
import { useUserContext } from './userContext.jsx';

const CarroContext = createContext();
export const useCarroContext = () => useContext(CarroContext);

export const CarroProvider = (props) => {

    const [ qty, setQty ] = useState([]);
    const [ itemsCart, setItemsCart ] = useState([]) // Estado para el NRO de productos del carrito
    const [ cart, setCart ] = useState([]); // Estado para el carrito
    const [ isOpen, setIsOpen ] = useState(false)
    
    const { payload } = useUserContext()

    useEffect(() => {
        readAllCarts()
    },[])
    
    const rute = "http://localhost:8000/api/carts"

    const idUser = payload?.id
    const id = payload?.cart
    
    // Leer todos los carritos
    const readAllCarts = async () => {
        try{
            const res = await axios.get(`${rute}`, { withCredentials: true });
            if (res.status === 200) setCart(res.data.cart);
            
        } catch (error){
            console.error(`Error fetching all carts: ${error}`);
        }
    }


    // Obtener los productos del carrito de un usuario al cargar el componente
    const cartUSER = async () => {
        try {
            const res = await axios.get(`${rute}/user/${idUser}`, { withCredentials: true});
            if (res.status === 200) {
                setItemsCart(res.data.cart.products.items);
                setCart(res.data.cart); // Actualiza el estado del carrito
                
            }
        } catch (error) {
            console.error(`Error fetching cart data: ${error}`);
        }
    }

    

    const readCartById = async (id) => {
        try {
            const res = await axios.get(`${rute}/${id}`, { withCredentials: true });
            if (res.status === 200) {
                console.log('Cart by ID:', res.data.cart);
                setCart(res.data.cart);
            }
        } catch (error) {
            console.error(`Error fetching cart by ID: ${error}`);
            errorMessag('Error al obtener el carrito por ID');
        }
    }
    

    // ➕ Agregar producto
    const addToCart = async ( product, quantity = 1) => {
        try {
            const res = await axios.post(`${rute}/${id}`, { productId: product.id , quantity}, { withCredentials: true });
            if (res.status === 200) {
                console.log('Add to Cart Response:', res.data.payload);
                setQty(res.data.payload.products.items.map(item => ({ ...item.prod, quantity: item.quantity }))); // CANTIDAD DE PRODUCTOS
                setItemsCart(res.data.payload.products.items); // Actualiza los productos en el carrito
                setCart(res.data.payload); // Actualiza el estado del carrito
                success('Producto agregado')
                
            }
        } catch (err) {
            console.error(err);
            // Verificamos si el backend envía un mensaje específico
            const errorMsg = err?.response?.data?.message;

            if (errorMsg && errorMsg.toLowerCase().includes('sin stock')) {
                info('Producto sin stock disponible');
            } else {
                errorMessag('No se pudo agregar el producto');
            }
        }
    };
    
    // Aumentar cantidad de un producto
    const increaseQty = async ( productId ) => {
        try {
            const addQty = await axios.patch(`${rute}/${id}/product/${productId}`, { quantity : 1 } , { withCredentials: true });
            if (addQty.status === 200) {
                setItemsCart(addQty.data.payload.products.items);
                setCart(addQty.data.payload); // Actualiza el estado del carrito
                success('Cantidad aumentada')
            }
            console.log("increase: ", qty)
        } catch (error) {
            console.error(`No se pudo aumentar la cantidad del producto: ${error}`);
            errorMessag("No se pudo aumentar la cantidad del producto");
        }
    }
    // Disminuir cantidad (y eliminar si llega a 0)
    const decreaseQty = async (productId) => {
        try {
            const decQty = await axios.patch(`${rute}/${id}/product/${productId}/decrease`, null, { withCredentials: true });
            if (decQty.status === 200) {
                setItemsCart(decQty.data.payload.products.items);
                setCart(decQty.data.payload); // Actualiza el estado del carrito
                success('Cantidad disminuida')
            }
            console.log("decrease: ", decQty.data.payload.products.items)
        } catch (error) {
            console.error(`No se pudo disminuir la cantidad del producto: ${error}`);
            errorMessag("No se pudo disminuir la cantidad del producto");
        }
    }
    
    // Eliminar producto del carrito
    const removeFromCart = async (productId) => {
        try {
            const removeProduct = await axios.delete(`${rute}/${id}/items/${productId}`, { withCredentials: true });
            console.log(`removeProduct: ${removeProduct.data}`)

            if (removeProduct.status === 200) {
                console.log('removeProduct: ', itemsCart)
                console.log(`removeProduct: ${removeProduct.data}`)
                setItemsCart(removeProduct.data.products.items.filter((prod) => prod.id !== productId));
                setCart(removeProduct.data);
                success('Producto eliminado')
            }
        } catch (error) {
            console.log(`removeProduct: ${error}`)
            errorMessag("No se pudo eliminar el producto");
        }
    }

    // Limpiar el carrito
    const clearCart = async () => {
        try {
            const clear = await axios.delete(`${rute}/${id}/clear`, { withCredentials: true });
            if (clear.status === 200) {
                setItemsCart([]);
                setCart(clear.data.payload);
                console.log('Cart cleared:', clear.data.payload);
                success('Carrito vaciado')
            }
        } catch (error) {
            console.error(`No se pudo vaciar el carrito: ${error}`);
            errorMessag("No se pudo vaciar el carrito");
        }
    }
    const deleteCartById = async (id) => {
        try {
            const response = await axios.delete(`${rute}/${id}`, { withCredentials: true });
            if (response.status === 200) {
                console.log('Cart deleted:', response.data.response);
                success('Carrito eliminado')
            }
        } catch (error) {
            console.error(`No se pudo eliminar el carrito: ${error}`);
            errorMessag("No se pudo eliminar el carrito");
        }   
    }

    const orderNew = async () => {
        try {
            const response = await axios.post(`${rute}/finalize/${id}`, {}, { withCredentials: true });
            if (response.status === 200) {
                console.log('Order: ', response.data.order);
                const newOrder = response.data; // la orden creada
                console.log('Order: ', newOrder);
                
            }
        } catch (error) {
            console.error(`No se pudo mostrar Ordenes: ${error}`);
            errorMessag("No se pudo guardar la Orden");
        }   
    }

    return(
        <CarroContext.Provider value={
                {
                    cart, addToCart, increaseQty, decreaseQty, cartUSER, readCartById,
                    clearCart, deleteCartById, orderNew, removeFromCart,
                    isOpen, setIsOpen, itemsCart, idUser
                }
            }>
            {props.children}
        </CarroContext.Provider>
    )
}

