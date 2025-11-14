import { useNavigate } from "react-router-dom";
import { useCarroContext } from "../../../../context/cartContext.jsx";
import "./checkout.css";
import { success } from "../../../message/message.jsx";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart } = useCarroContext();

    const handlePlaceOrder = async () => {
        // Aquí iría la lógica para procesar el pago y crear la orden en un futuro
        console.log("Orden creada", cart);
        success("¡Pedido realizado con éxito!");
        navigate("/"); // Ir a pantalla de confirmación
    };

    return (
        <section className="checkout">
        <h1>Finalizar compra</h1>
        <p>Completa los siguientes pasos para confirmar tu pedido:</p>

        <form className="checkout-form">
            {/* Paso 1: Envío */}
            <fieldset>
                <legend>Datos de envío</legend>
                <input type="text" placeholder="Nombre completo"  /> 
                <input type="text" placeholder="Dirección"  />
                <input type="text" placeholder="Ciudad"  />
                <input type="text" placeholder="Código postal"  />
                <select >
                    <option value="">Método de envío</option>
                    <option value="standard">Estándar (3-5 días)</option>
                    <option value="express">Express (24-48hs)</option>
                </select>
            </fieldset>

            {/* Paso 2: Pago */}
            <fieldset>
            <legend>Método de pago</legend>
            <input type="text" placeholder="Número de tarjeta"  />
            <input type="text" placeholder="Nombre en la tarjeta"  />
            <div className="inline-inputs">
                <input type="text" placeholder="MM/AA"  />
                <input type="text" placeholder="CVV"  />
            </div>
            </fieldset>

            {/* Resumen */}
            <div className="checkout-summary">
            <h3>Resumen de compra</h3>
            <p>Total: <strong>$ {cart?.total?.toFixed(2) || "0.00"}</strong></p>
            </div>

            <button className="btn btn-primary" onClick={handlePlaceOrder}>
            Realizar pedido
            </button>
        </form>
        </section>
    );
};

export default Checkout;
