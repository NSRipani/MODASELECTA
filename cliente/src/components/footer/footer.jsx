import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import './footer.css';
import { Toaster } from "sonner";
import { useSubscriptionContext } from "../../context/subscripContext.jsx";

const Footer = () => {

    const { emailFooter, handleSubmitSubscriptionFooter, setEmailFooter, footerSubscription } = useSubscriptionContext();

    const handleChangeSusciptionFOOTER = (e) => {
        setEmailFooter(e.target.value);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo y descripción */}
                <div className="footer-section footer-brand">
                    <h3 className="brand-name">FashionStore</h3>
                    <p className="brand-description">
                        Tu destino para la moda más actual. Descubre tendencias, calidad y estilo en cada prenda.
                    </p>
                    <div className="social-links-footer">
                        <a href="#facebook" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="#instagram" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#twitter" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="#tiktok" aria-label="TikTok">
                            <FontAwesomeIcon icon={faTiktok} />
                        </a>
                    </div>
                </div>

                {/* Categorías */}
                <div className="footer-section">
                    <h4>Categorías</h4>
                    <ul>
                        <li><a href="#ropa-mujer">Ropa Mujer</a></li>
                        <li><a href="#ropa-hombre">Ropa Hombre</a></li>
                        <li><a href="#accesorios">Accesorios</a></li>
                        <li><a href="#zapatos">Zapatos</a></li>
                        <li><a href="#ofertas">Ofertas</a></li>
                    </ul>
                </div>

                {/* Información */}
                <div className="footer-section">
                    <h4>Información</h4>
                    <ul>
                        <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                        <li><a href="#envios">Envíos</a></li>
                        <li><a href="#devoluciones">Devoluciones</a></li>
                        <li><a href="#faq">Preguntas Frecuentes</a></li>
                    </ul>
                </div>

                {/* Contacto */}
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FiMail className="contact-icon" />
                            <span>info@fashionstore.com</span>
                        </div>
                        <div className="contact-item">
                            <FiPhone className="contact-icon" />
                            <span>+1 (234) 567-8900</span>
                        </div>
                        <div className="contact-item">
                            <FiMapPin className="contact-icon" />
                            <span>Ciudad, País</span>
                        </div>
                    </div>
                </div>

                {/* Newsletter y pagos */}
                <div className="footer-section footer-newsletter">
                    <h4>Newsletter</h4>
                    <p>Suscríbete para recibir ofertas exclusivas y las últimas tendencias.</p>
                    <form className="newsletter-form" onSubmit={(e) => handleSubmitSubscriptionFooter(e, emailFooter, setEmailFooter)}>
                        <div className="newsletter-input-group">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                required
                                value={emailFooter}
                                onChange={handleChangeSusciptionFOOTER}
                                aria-label="Correo electrónico"
                            />
                            <button type="submit" disabled={footerSubscription}>
                                {footerSubscription ? 'Enviando...' : 'Suscribirse'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Métodos de Pago */}
                <div className="footer-section payment-section">
                    <h4>Métodos de Pago</h4>
                    <div className="payment-methods">
                        <FaCcVisa size={32} color="#1a1f71" />
                        <FaCcMastercard size={32} color="#eb001b" />
                        <FaCcAmex size={32} color="#006fcf" />
                        <SiMercadopago size={32} color="#01a6ff" />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© 2024 FashionStore. Todos los derechos reservados.</p>
                    <div className="footer-links">
                        <a href="#privacidad">Política de Privacidad</a>
                        <a href="#terminos">Términos y Condiciones</a>
                    </div>
                </div>
            </div>
            <Toaster />
        </footer>
    );
};

export default Footer;

