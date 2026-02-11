/**
 * Hook simplificado para notificaciones globales
 * Reemplaza las funciones individuales de message.jsx
 * 
 * Uso:
 * const { success, error, info, warning } = useNotification();
 * success("Producto agregado al carrito");
 * error("Hubo un error al guardar");
 */

import { useNotification } from '../context/notificationContext.jsx';

export const useNotifications = () => {
    return useNotification();
};