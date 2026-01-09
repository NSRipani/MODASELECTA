import React, { useState } from 'react';
import './contacto.css'
import { Toaster } from 'sonner';
import { errorMessag, info } from '../../message/message.jsx';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useContactContext } from '../../../context/contactContext.jsx';
import { useSubscriptionContext } from '../../../context/subscripContext.jsx';

const Contacto = () => {

  const { contactData, setContactData, handleContact } = useContactContext()
  const { handleSubmitSubscription, email, setEmail, loadingSubscription } = useSubscriptionContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value, });
  };
  const handleChangeSusciption = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Sección de formulario */}
        <div className="contact-form-section">
          <div className="contact-header">
            <h1>Contáctanos</h1>
            <p>¿Tienes preguntas sobre nuestros productos o necesitas ayuda? Estamos aquí para ayudarte.</p>
          </div>

          <form onSubmit={handleContact} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactData.name}
                  placeholder="Tu nombre completo"
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Cuéntanos cómo podemos ayudarte..."
                required
                rows="5"
              />
            </div>
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
          </form>
        </div>

        {/* Sección de información */}
        <div className="contact-info-section">
          <div className="info-card">
            <h2>Información de Contacto</h2>
            <div className="contact-details">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <h3>Dirección</h3>
                  <p>Calle Principal 123<br />Ciudad, País 12345</p>
                </div>
              </div>
              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <div>
                  <h3>Teléfono</h3>
                  <p>+1 (234) 567-8900</p>
                </div>
              </div>
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <div>
                  <h3>Email</h3>
                  <p>info@fashionstore.com</p>
                </div>
              </div>
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <div>
                  <h3>Horarios</h3>
                  <p>Lun - Vie: 9:00 - 18:00<br />Sáb: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="social-card">
            <h2>Síguenos</h2>
            <p>Conéctate con nosotros en redes sociales para las últimas tendencias y ofertas.</p>
            <div className="social-links">
              <a href="#facebook" className="social-link facebook">
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a href="#instagram" className="social-link instagram">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="#twitter" className="social-link twitter">
                <FaSquareXTwitter />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className="newsletter-card">
            <h2>Newsletter</h2>
            <p>Suscríbete para recibir ofertas exclusivas y las últimas novedades en moda.</p>
            <form onSubmit={(e) => handleSubmitSubscription(e, email, setEmail)} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={handleChangeSusciption}
                placeholder="Tu correo electrónico"
                required
                aria-label="Correo electrónico"
              />
              <button type="submit" disabled={loadingSubscription}>
                {loadingSubscription ? 'Suscribiendo...' : 'Suscribirse'}
              </button>
            </form>
          </div>
        </div>

        {/* Mapa - ocupa toda la anchura */}
        <div className="map-section">
          <h2>Encuéntranos</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.4194154846816!3d37.77492977975865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sCalle%20Principal%20123%2C%20Ciudad%2C%20Pa%C3%ADs!5e0!3m2!1ses!2sus!4v1703123456789!5m2!1ses!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de FashionStore"
            ></iframe>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Contacto;
