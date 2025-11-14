import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import './footer.css';
import { Toaster } from "sonner";
import { useSubscriptionContext } from "../../context/subscripContext.jsx";

const Footer = () => {

    const { emailFooter, handleSubmitSubscriptionFooter, setEmailFooter, footerSubscription } = useSubscriptionContext();
    
    const handleChangeSusciptionFOOTER = (e) => {
        setEmailFooter(e.target.value);
    };

    return (
        <footer className="fuuter">
            <div className="footer-content">
                
                {/* Sobre la tienda */}
                <div className="footer-section">
                    <h4>Nosotros</h4>
                    <ul className="legal-links">
                        <li><a href="#sobrenosotros">Sobre Nosotros</a></li>
                        <li><a href="#privacidad">Política de Privacidad</a></li>
                        <li><a href="#terminos">Términos y Condiciones</a></li>
                        <li><a href="#devoluciones">Política de Devoluciones</a></li>
                    </ul>
                </div>

                {/* Enlaces rápidos */}
                <div className="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><a id="inicio" href="#home">Inicio</a></li>
                        <li><a href="#productos">Productos</a></li>
                        <li><a id="sobre-nosotros" href="#sobre-nosotros">Sobre Nosotros</a></li>
                        <li><a id="contacto" href="#contacto">Contacto</a></li>
                    </ul>
                </div>

                {/* Contacto y redes */}
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p>contacto@ecommerce.com</p>
                    <p>+1 (234) 567-890</p>
                    <h4>Síguenos</h4>
                    <ul className="socials">
                        <li><a href="#facebook"><FontAwesomeIcon icon={faFacebook} aria-label="Facebook"/></a></li>
                        <li><a href="#instagram"><FontAwesomeIcon icon={faInstagram} aria-label="Instagram"/></a></li>
                        <li><a href="#twitter"><FontAwesomeIcon icon={faTwitter} aria-label="Twitter"/></a></li>
                    </ul>
                </div>

                {/* Newsletter y pagos */}
                <div className="footer-section">
                    <h4>Suscríbete</h4>
                    <form className="newsletter-form" onSubmit={(e) => handleSubmitSubscriptionFooter(e, emailFooter, setEmailFooter)} >
                        <input type="email" placeholder="Tu correo electrónico" required 
                            value={emailFooter} onChange={handleChangeSusciptionFOOTER} aria-label="Correo electrónico"/>
                            {/* disabled={footerSubscription} */}
                        <button type="submit" disabled={footerSubscription}>
                            {footerSubscription ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>

                    <h4>Métodos de Pago</h4>
                    <div className="payment-icons">
                        <FaCcVisa size={32} color="#1a1f71"/>
                        <FaCcMastercard size={32} color="#eb001b" />
                        <SiMercadopago size={32} color="#01a6ffff" />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Ecommerce. Todos los derechos reservados.</p>
            </div>
            <Toaster/>
        </footer>
    );
};

export default Footer;

