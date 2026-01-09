import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarroContext } from "../../../../context/cartContext.jsx";
import { useAuthContext } from "../../../../context/authContext.jsx";
import "./shop.css";
import LoadingSpinner from "../../../common/LoadingSpinner.jsx";

const Shop = () => {
    const navigate = useNavigate();
    const { cart, orderNew, cartUSER, increaseQty, decreaseQty, removeFromCart } = useCarroContext();
    const { payload } = useAuthContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (payload?.id) {
            cartUSER(payload.id);
        }
    }, [payload]);

    const handleIncrease = async (productId) => {
        setLoading(true);
        await increaseQty(productId);
        setLoading(false);
    };

    const handleDecrease = async (productId) => {
        setLoading(true);
        await decreaseQty(productId);
        setLoading(false);
    };

    const handleRemove = async (productId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            setLoading(true);
            await removeFromCart(productId);
            setLoading(false);
        }
    };

    const newShop = () => {
        if (!cart || cart?.products?.items?.length === 0) {
            alert("Tu carrito está vacío. Agrega productos antes de confirmar.");
            return;
        }
        orderNew();
        navigate("/checkout");
    };

    if (!payload) {
        return (
            <div className="shop">
                <div className="shop-header">
                    <h1>Acceso requerido</h1>
                    <p>Debes iniciar sesión para ver tu carrito.</p>
                    <button className="btn-primary" onClick={() => navigate("/login")}>Iniciar sesión</button>
                </div>
            </div>
        );
    }

    return (
        <div className="shop">
            <header className="shop-header">
                <h1>Resumen de tu compra</h1>
                <p>Revisa los productos antes de confirmar tu pedido.</p>
            </header>

            <div className="shop-container">
                {/* Vista en tabla (desktop) */}
                <div className="table-wrapper desktop-only">
                    <table className="shop-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart && cart?.products?.items?.length > 0 ? (
                            cart?.products?.items?.map((item) => (
                            <tr key={item.productId}>
                                <td>
                                    <div className="product-info">
                                        <img src={item.photo} alt={item.title} className="product-image"/>
                                        <span className="product-name">{item.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleDecrease(item.productId)} disabled={loading}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.productId)} disabled={loading}>+</button>
                                    </div>
                                </td>
                                <td>$ {item.price.toFixed(2)}</td>
                                <td>$ {item.subtotal.toFixed(2)}</td>
                                <td>
                                    <button className="btn-remove" onClick={() => handleRemove(item.productId)} disabled={loading}>Eliminar</button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-cart">Tu carrito está vacío 🛍️</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {/* Vista en tablet/mobile */}
                <div className="cart-cards mobile-tablet-only">
                {cart && cart?.products?.items?.length > 0 ? (
                    cart?.products?.items?.map((item) => (
                    <div className="cart-card" key={item.productId}>
                        <img src={item.photo} alt={item.name} className="cart-card-img"/>
                        <div className="cart-card-info">
                            <h4>{item.title}</h4>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrease(item.productId)} disabled={loading}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrease(item.productId)} disabled={loading}>+</button>
                            </div>
                            <p><strong>Precio:</strong> $ {item.price.toFixed(2)}</p>
                            <p><strong>Subtotal:</strong> $ {item.subtotal.toFixed(2)}</p>
                            <button className="btn-remove" onClick={() => handleRemove(item.productId)} disabled={loading}>Eliminar</button>
                        </div>
                    </div>
                    ))
                ) : (
                    <p className="empty-cart">Tu carrito está vacío 🛍️</p>
                )}
                </div>
                {/* --- Total --- */}
                <div className="shop-summary">
                    <p>
                        <strong>Total:</strong>{" "}
                        <span className="total-amount">$ {cart?.total?.toFixed(2) || "0.00"}</span>
                    </p>
                </div>
            </div>
            {/* --- Botones principales --- */}
            <div className="shop-actions">
                <button className="btn-secondary" onClick={() => navigate("/products")}>Seguir comprando</button>
                <button className="btn-primary" onClick={newShop} disabled={loading || !cart?.products?.items?.length}>
                    {loading ? "Procesando..." : "Confirmar compra"}
                </button>
            </div>

            {/* --- Footer --- */}
            <footer className="shop-footer">
                <button className="btn btn-outline" onClick={() => navigate("/")}>← Volver al inicio</button>
            </footer>
        </div>
    );
};

export default Shop;

