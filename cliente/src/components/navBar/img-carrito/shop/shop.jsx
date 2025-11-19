import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarroContext } from "../../../../context/cartContext.jsx";
import "./shop.css";

const Shop = () => {
    const navigate = useNavigate();
    const { cart, orderNew, cartUSER } = useCarroContext();
    console.log("CART EN SHOP: ", cart);
    useEffect(() => {
        cartUSER(cart?.user);
    }, []);

    const newShop = () => {
        orderNew();
        navigate("/checkout");
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
                                <td>{item.quantity}</td>
                                <td>$ {item.price.toFixed(2)}</td>
                                <td>$ {item.subtotal.toFixed(2)}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-cart">Tu carrito está vacío 🛍️</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {/* Vista en tablet */}
                <div className="cart-cards mobile-tablet-only">
                {cart && cart?.products?.items?.length > 0 ? (
                    cart?.products?.items?.map((item) => (
                    <div className="cart-card" key={item.productId}>
                        <img src={item.photo} alt={item.name} className="cart-card-img"/>
                        <div className="cart-card-info">
                            <h4>{item.title}</h4>
                            <p><strong>Cantidad:</strong> {item.quantity}</p>
                            <p><strong>Precio:</strong> $ {item.price.toFixed(2)}</p>
                            <p><strong>Subtotal:</strong> $ {item.subtotal.toFixed(2)}</p>
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
                        <span className="total-amount">$ {cart?.total?.toFixed(2)}</span>
                    </p>
                </div>
            </div>
            {/* --- Botones principales --- */}
            <div className="shop-actions">
                <button className="btn-secondary" onClick={() => navigate("/products")}>Seguir comprando</button>
                <button className="btn-primary" onClick={newShop}>Confirmar compra</button>
            </div>
            

            {/* --- Footer --- */}
            <footer className="shop-footer">
                <button className="btn btn-outline" onClick={() => navigate("/")}>← Volver al inicio</button>
            </footer>
        </div>
    );
};

export default Shop;
