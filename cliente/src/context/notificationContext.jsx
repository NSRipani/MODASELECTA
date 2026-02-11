import React, { createContext, useContext } from 'react';
import { toast } from 'sonner';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification debe usarse dentro de NotificationProvider');
    }
    return context;
};

const TOAST_STYLES = {
    success: {
        background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
        color: "#ffffff",
        fontSize: "16px",
        padding: "15px 25px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        textAlign: "center"
    },
    error: {
        background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
        color: "#ffffff",
        fontSize: "16px",
        padding: "15px 25px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        textAlign: "center"
    },
    info: {
        background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        color: "#ffffff",
        fontSize: "16px",
        padding: "15px 25px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        textAlign: "center"
    },
    warning: {
        background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
        color: "#ffffff",
        fontSize: "16px",
        padding: "15px 25px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        textAlign: "center"
    }
};

const DEFAULT_TOAST_OPTIONS = {
    position: "top-center",
    duration: 2500,
};

export const NotificationProvider = ({ children }) => {
    const notify = {
        success: (message, options = {}) => {
            toast.success(message, {
                ...DEFAULT_TOAST_OPTIONS,
                ...options,
                style: { ...TOAST_STYLES.success, ...options.style }
            });
        },
        error: (message, options = {}) => {
            toast.error(message, {
                ...DEFAULT_TOAST_OPTIONS,
                ...options,
                style: { ...TOAST_STYLES.error, ...options.style }
            });
        },
        info: (message, options = {}) => {
            toast.info(message, {
                ...DEFAULT_TOAST_OPTIONS,
                ...options,
                style: { ...TOAST_STYLES.info, ...options.style }
            });
        },
        warning: (message, options = {}) => {
            toast.warning(message, {
                ...DEFAULT_TOAST_OPTIONS,
                ...options,
                style: { ...TOAST_STYLES.warning, ...options.style }
            });
        },
        loading: (message, options = {}) => {
            return toast.loading(message, {
                ...DEFAULT_TOAST_OPTIONS,
                ...options,
                style: { ...TOAST_STYLES.info, ...options.style }
            });
        },
        // Métodos útiles
        promise: (promise, messages, options = {}) => {
            return toast.promise(promise, {
                loading: messages.loading || 'Cargando...',
                success: messages.success || 'Éxito!',
                error: messages.error || 'Error!',
            });
        },
        dismiss: (toastId) => {
            toast.dismiss(toastId);
        }
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;