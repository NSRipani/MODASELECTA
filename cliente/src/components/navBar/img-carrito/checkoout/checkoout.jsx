import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarroContext } from "../../../../context/cartContext.jsx";
import { useAuthContext } from "../../../../context/authContext.jsx";
import { useOrderContext } from "../../../../context/orderContext.jsx";
import "./checkout.css";
import { success, errorMessag } from "../../../message/message.jsx";
import axios from "axios";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCarroContext();
    const { payload } = useAuthContext();
    const { getOrders } = useOrderContext();

    const [shippingData, setShippingData] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        shippingMethod: ''
    });

    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (payload) {
            setShippingData(prev => ({
                ...prev,
                name: payload.name || ''
            }));
        }
    }, [payload]);

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!shippingData.name) newErrors.name = 'Nombre es requerido';
        if (!shippingData.address) newErrors.address = 'Dirección es requerida';
        if (!shippingData.city) newErrors.city = 'Ciudad es requerida';
        if (!shippingData.postalCode) newErrors.postalCode = 'Código postal es requerido';
        if (!shippingData.shippingMethod) newErrors.shippingMethod = 'Método de envío es requerido';
        if (!paymentData.cardNumber) newErrors.cardNumber = 'Número de tarjeta es requerido';
        if (!paymentData.cardName) newErrors.cardName = 'Nombre en tarjeta es requerido';
        if (!paymentData.expiry) newErrors.expiry = 'Fecha de expiración es requerida';
        if (!paymentData.cvv) newErrors.cvv = 'CVV es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const orderData = {
                user: payload?.id,
                cart: cart,
                shipping: shippingData,
                payment: paymentData,
                total: cart?.total || 0
            };

            const response = await axios.post('http://localhost:8000/api/order', orderData, { withCredentials: true });
            if (response.status === 201) {
                success("¡Pedido realizado con éxito!");
                clearCart();
                getOrders(); // Refrescar órdenes
                navigate("/orders"); // Ir a página de órdenes
            }
        } catch (error) {
            console.error("Error al crear orden:", error);
            errorMessag("Error al procesar el pedido. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items?.length === 0) {
        return (
            <section className="checkout">
                <h1>Carrito vacío</h1>
                <p>No hay productos en el carrito para finalizar la compra.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Volver a la tienda
                </button>
            </section>
        );
    }

    return (
        <section className="checkout">
            <h1>Finalizar compra</h1>
            <p>Completa los siguientes pasos para confirmar tu pedido:</p>

            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
                {/* Paso 1: Envío */}
                <fieldset>
                    <legend>Datos de envío</legend>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo"
                        value={shippingData.name}
                        onChange={handleShippingChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                    <input
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Código postal"
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                    <select
                        name="shippingMethod"
                        value={shippingData.shippingMethod}
                        onChange={handleShippingChange}
                        className={errors.shippingMethod ? 'error' : ''}
                    >
                        <option value="">Método de envío</option>
                        <option value="standard">Estándar (3-5 días)</option>
                        <option value="express">Express (24-48hs)</option>
                    </select>
                    {errors.shippingMethod && <span className="error-text">{errors.shippingMethod}</span>}
                </fieldset>

                {/* Paso 2: Pago */}
                <fieldset>
                    <legend>Método de pago</legend>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Número de tarjeta"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    <input
                        type="text"
                        name="cardName"
                        placeholder="Nombre en la tarjeta"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        className={errors.cardName ? 'error' : ''}
                    />
                    {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                    <div className="inline-inputs">
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/AA"
                            value={paymentData.expiry}
                            onChange={handlePaymentChange}
                            className={errors.expiry ? 'error' : ''}
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={paymentData.cvv}
                            onChange={handlePaymentChange}
                            className={errors.cvv ? 'error' : ''}
                        />
                    </div>
                    {(errors.expiry || errors.cvv) && <span className="error-text">Completa los campos de fecha y CVV</span>}
                </fieldset>

                {/* Resumen */}
                <div className="checkout-summary">
                    <h3>Resumen de compra</h3>
                    <p>Total: <strong>$ {cart?.total?.toFixed(2) || "0.00"}</strong></p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Realizar pedido'}
                </button>
            </form>
        </section>
    );
};

export default Checkout;
