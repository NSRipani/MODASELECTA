import React, { createContext, useContext, useEffect, useMemo, useState} from 'react'
import axios from 'axios';
import { errorMessag, info, success } from '../components/message/message.jsx';

const SubscriptionContext = createContext();
export const useSubscriptionContext = () => useContext(SubscriptionContext);

export const SubscriptionProvider = (props) => {

    const [ email, setEmail ] = useState('');
    const [ emailFooter, setEmailFooter ] = useState('');
    const [ loadingSubscription, setLoadingSubscription] = useState(false);
    const [ footerSubscription, setfooterSubscription ] = useState(false);
    
    const ruteSubsc = 'http://localhost:8000/api/subscription'
    // Enviar suscripción
    const handleSubmitSubscription = async (e, email, setEmail) => {
        e.preventDefault();

        // Validar email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessag('Por favor, ingresa un email válido.');
            return;
        }

        setLoadingSubscription(true);
        try {
            const response = await axios.post(`${ruteSubsc}`, { email });
            console.log('Subscription response:', response.data);
            success(`¡Te has suscrito con el correo: ${email}!`);
            setEmail('')
        } catch (error) {
            console.error('Error en suscripción:', error);
            errorMessag('Hubo un error al suscribirte. Intenta de nuevo.');
        } finally {
            setLoadingSubscription(false);
        }
    };

    const handleSubmitSubscriptionFooter = async (e, email, setEmailFooter) => {
        e.preventDefault();

        // Validar email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessag('Por favor, ingresa un email válido.');
        return;
        }

        setfooterSubscription(true);
        try {
            const response = await axios.post(`${ruteSubsc}`, { email });
            console.log('Subscription response:', response.data);
            success(`¡Te has suscrito con el correo: ${emailFooter}!`);
            setEmailFooter('');
        } catch (error) {
            console.error('Error en suscripción:', error);
            errorMessag('Hubo un error al suscribirte. Intenta de nuevo.');
        } finally {
            setfooterSubscription(false);
        }
    };

    return(
        <SubscriptionContext.Provider value={
                {
                    email, setEmail, loadingSubscription, footerSubscription,

                    handleSubmitSubscription, handleSubmitSubscriptionFooter,
                    
                    emailFooter, setEmailFooter
                }
            }>
            {props.children}
        </SubscriptionContext.Provider>
    )
}