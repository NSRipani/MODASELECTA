import React, { useEffect } from 'react';
import './CartSidebar.css';
import { useCarroContext } from './../../../../context/cartContext.jsx';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaTruck, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
    const { cart, itemsCart, removeFromCart, increaseQty, decreaseQty, clearCart, isOpen, setIsOpen } = useCarroContext();
    const envioGratis = cart?.total >= 1000;
    const navigate = useNavigate();

    const redirect = () => {
        setIsOpen(false);
        navigate('/cart/shopping');
    };


    return (
        <div className="cart-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-modal-header">
                    <div className="header-content">
                        <FaShoppingCart className="cart-icon" />
                        <h2>Tu Carrito</h2>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="cart-modal-body">
                    {itemsCart && itemsCart.length > 0 ? (
                        <div className="cart-items-grid">
                            {itemsCart.map((item) => (
                                <div key={item.productId} className="cart-item-card">
                                    <div className="item-image">
                                        <img src={item.photo} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4 className="item-name">{item.name}</h4>
                                        <p className="item-price">${item.price}</p>
                                        <div className="quantity-controls">
                                            <button
                                                className="qty-btn"
                                                onClick={() => decreaseQty(item.productId)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => increaseQty(item.productId)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <p className="item-subtotal">Subtotal: ${item.subtotal.toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.productId)}
                                        aria-label="Remover producto"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-cart">
                            <FaShoppingCart className="empty-icon" />
                            <h3>Tu carrito está vacío</h3>
                            <p>¡Agrega algunos productos para comenzar!</p>
                        </div>
                    )}
                </div>

                {itemsCart && itemsCart.length > 0 && (
                    <div className="cart-modal-footer">
                        <div className="shipping-info">
                            {envioGratis ? (
                                <div className="free-shipping">
                                    <FaTruck className="shipping-icon" />
                                    <span>¡Envío gratis!</span>
                                </div>
                            ) : (
                                <div className="shipping-threshold">
                                    <span>Agrega ${(1000 - cart.total).toFixed(2)} más para envío gratis</span>
                                </div>
                            )}
                        </div>
                        <div className="total-section">
                            <div className="total-row">
                                <span>Total:</span>
                                <span className="total-amount">${cart.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="cart-actions">
                            <button className="checkout-btn" onClick={redirect}>
                                Finalizar Compra ({itemsCart.length} {itemsCart.length === 1 ? 'producto' : 'productos'})
                            </button>
                            <button className="clear-btn" onClick={() => clearCart()}>
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
