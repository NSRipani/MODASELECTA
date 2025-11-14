import React, { useState } from 'react';
import './contacto.css'
import { Toaster } from 'sonner';
import { errorMessag, info } from '../../message/message.jsx';
import { FaFacebook, FaSquareXTwitter, FaInstagram  } from "react-icons/fa6";
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
    < div className='ct-conteiner'>
      <div className="contact-container">
        <h1 >Contacto</h1>
        <form onSubmit={handleContact} className='formulario'> 
          <div className='nombre'>
            <input type="text" id="name" name="name"  value={contactData.name} placeholder="Nombre" onChange={handleChange} required aria-required="true"/>
          </div>
          <div className='emails'>
            <input type="email" id="email" name="email" placeholder="Email" value={contactData.email} onChange={handleChange} required aria-required="true"/>
          </div>
          <div className='mensaje'>
            <label htmlFor="message" id="label" >Mensaje:</label>
            <textarea id="message" name="message" value={contactData.message} onChange={handleChange} required/> 
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div className='info'>
        <p>Podés contactarte con nosotros a través de los siguientes canales:</p>
        <div className='info-contacto'>
          <ul>
            <li><a href="#facebook" className='facebook'><FaFacebook /></a></li>
            <li><a href="#instagram" className='instagram'><FaInstagram  /></a></li>
            <li><a href="#twitter" className='twitter'><FaSquareXTwitter style={{color: 'black'}}/></a></li>
          </ul>
        </div>
        <div className="suscripcion">
          <h2>Suscríbete a nuestro boletín</h2>
          <p>Recibe las últimas novedades y ofertas directamente en tu bandeja de entrada.</p>
          <form onSubmit={(e) => handleSubmitSubscription(e, email, setEmail)}>
            <input type="email" value={email} onChange={handleChangeSusciption} 
              placeholder="Introduce tu correo electrónico" required aria-label="Correo electrónico"
            />
            <button type="submit" disabled={loadingSubscription}>
              {loadingSubscription ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
      <Toaster/>
    </div>    
  );
};

export default Contacto;
