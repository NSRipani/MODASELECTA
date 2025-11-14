import React from 'react';
import './CartSidebar.css'; 
import { useCarroContext } from './../../../../context/cartContext.jsx';
import { GrAdd, GrFormSubtract } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {

    const { cart, itemsCart, removeFromCart, increaseQty, decreaseQty, clearCart, isOpen, setIsOpen } = useCarroContext()
    console.log('cart(itemsCart): ', itemsCart)
    console.log('cart: ', cart)

    const envioGratis = cart?.total >= 1000;
    const navigate = useNavigate();
    const redirect = () => {
        setIsOpen(false)
        navigate('/cart/shopping')
    }

    return (
        <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h2>🛒 Tu Carrito</h2>
                <button onClick={() => setIsOpen(false)} className="close-btn">✖</button>
            </div>
            <div className="cart-body">
            {itemsCart && itemsCart.length > 0 ? (
                itemsCart?.map((items) => (
                    <div key={items?.productId} className="cart-item">
                        <img src={items?.photo} alt={items?.name} className="item-photo" />
                        <div className="item-details">
                            <h4>{items?.name}</h4>
                            <div className="qty-control">
                                <div className="quantity">
                                    <p><strong>Cantidad</strong></p>
                                    <button className='menos' onClick={() => decreaseQty(items.productId)}><GrFormSubtract /></button>
                                    <span className='cant'>{items.quantity}</span>
                                    <button className='mas' onClick={() => increaseQty(items.productId)}><GrAdd /></button>
                                </div>
                                <p><strong>Precio:</strong> ${items.price}</p>
                                <p><strong>Subtotal:</strong> ${items.subtotal.toFixed(2)}</p>
                            </div>
                        </div>
                        <button className="remove" onClick={() => removeFromCart(items?.productId)}>🗑️</button>
                    </div>
                ))
            ) : (
                <p className="empty-cart">No hay productos en el carrito.</p>
            )}
            </div>
            <div className="cart-footer">
                <div className="total">
                    <p><strong>Total: </strong></p>
                    <span className="total-amount"><strong>${cart?.total}</strong></span> 
                {envioGratis && <p className="envio-gratis">🚚 ¡Tenés envío gratis!</p>}
                </div>
                <div className="btns">
                    <button className="checkout-btn" onClick={redirect}>Finalizar compra ({itemsCart?.length})</button>
                    <button className="clear-btn" onClick={() => clearCart()}>Vaciar carrito</button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
