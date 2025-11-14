import React, { createContext, useContext, useEffect, useMemo, useState} from 'react'
// import { useUserContext } from './userContext.jsx';
import axios from 'axios';
import { errorMessag, info, success } from '../components/message/message.jsx';


const ContactContext = createContext();

export const useContactContext = () => useContext(ContactContext);

export const ContactProvider = (props) => {
    const [ contactData, setContactData ] = useState({ name: '', email: '', message: ''});
    const [ loadingContact, setLoadingContact ] = useState(false);
    
    const rute = 'http://localhost:8000/api/contact/create'
    
    const handleContact = async (e) => {
        e.preventDefault();
        // Validación básica
        if (!contactData.name.trim() || !contactData.email.trim() || !contactData.message.trim()) {
            errorMessag('Por favor, completa todos los campos.');
            return;
        }
        setLoadingContact(true);
        try {
            const message = await axios.post(`${rute}`, contactData, { 
                headers: {'Content-Type': 'application/json','Accept': 'application/json' } 
            });
        if (message.status === 201){
            setContactData({ name: '', email: '', message: '' }); // Limpiar el formulario
            success('¡Mensaje enviado con éxito!'); // Mostrar el mensaje de éxito 
        }
            // setContactData(message.data.saved)
            console.log('mensaje', message.data.saved)
        } catch (error) {
            console.error('Error al obtener el mensaje del usuario:', error);
            errorMessag('Error en el mensaje del usuario. Corrobore los datos')
        }finally {
            setLoadingContact(false); 
        }
        
    };
    

    return(
        <ContactContext.Provider value={
                {
                    contactData, setContactData, handleContact, loadingContact, setLoadingContact
                }
            }>
            {props.children}
        </ContactContext.Provider>
    )
}