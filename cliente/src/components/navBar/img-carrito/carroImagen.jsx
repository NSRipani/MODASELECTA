import './carroImagen.css'
import { useEffect, useMemo, useState } from 'react'
import CartSidebar from './modalCart/cartSidebar.jsx'
import { useCarroContext } from './../../../context/cartContext.jsx';
import { info } from '../../message/message.jsx';
import { useUserContext } from '../../../context/userContext.jsx';

const Carrito = () => { 

    const { cart, cartUSER,itemsCart, increaseQty, decreaseQty, removeFromCart, isOpen, setIsOpen, idUser } = useCarroContext()
    const { payload } = useUserContext();

    const isLoggedIn = !!payload; // Si hay payload, usuario logueado

    const item = itemsCart?.length

    useEffect(() => {
        if ( idUser && payload.role !== 'admin'){
            cartUSER(idUser);
        }
    }, [idUser]);
        
    const handleCartClick = () => {
        if (isLoggedIn && item > 0) { 
            setIsOpen(true);
        } else if (isLoggedIn || item === 0){ 
            info('El carrito está vacío')
        } else {
            info('Dede iniciar sesion para ver los productos')
        }
    }
    
    return (
        <div className='cart'>
            <div className="img-carro" role="button" aria-label="Abrir carrito">
                <div className="count">
                    <i id='cart-icon' className="fas fa-shopping-bag " onClick={handleCartClick}></i>
                    <p className='cart-count'>{item}</p>
                </div>
            </div>
            
            {isOpen && 
                (
                    <div className="cart-overlay" >
                        <CartSidebar 
                        isOpen={isOpen} 
                        onClose={() => setIsOpen(false)}
                        cart={cart} 
                        removeFromCart={removeFromCart} 
                        increaseQty={increaseQty} 
                        decreaseQty={decreaseQty}
                        />
                    </div>
                )
            }
        </div>
    )
}
export default Carrito
