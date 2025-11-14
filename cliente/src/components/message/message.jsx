import { toast } from 'sonner';


export const success = (message) => {
    toast.success(message,{
        position: "top-right",
        duration: 1500,
        style: {
            backgroundColor: '#2c3e50',
            color: '#ecf0f1', 
            fontSize: '20px', 
            padding: '12px 20px', 
            border: '2px solid #27ae60', 
            borderRadius: '5px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    })
}
export const successRegistro = (message) => {
    toast.success(message, {
        position: "top-right",
        duration: 1500,
        style: {
            backgroundColor: '#2c3e50',
            color: '#ecf0f1', 
            fontSize: '20px', 
            padding: '12px 20px', 
            border: '2px solid #27ae60', 
            borderRadius: '5px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }
    })
}
export const errorRegistro = (message) => {
    toast.error(message, {
        position: "top-right",
        duration: 1500,
        style: {
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            fontSize: '16px', 
            padding: '15px',
            border: '2px solid #dc3545',
            borderRadius: '8px', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
        }
    })
}
export const contacto = (message) => {
    toast.success(message , {
        position: "top-right",
        duration: 1500,
        style: {
            backgroundColor: '#2c3e50',
            color: '#ecf0f1', 
            fontSize: '20px', 
            padding: '12px 20px', 
            border: '2px solid #27ae60', 
            borderRadius: '5px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }
    })
}


export const errorMessag = (message) => {
    toast.error(message, {
        position: "top-right",
        duration: 1500,
        style: {
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            fontSize: '16px', 
            padding: '15px',
            border: '2px solid #dc3545',
            borderRadius: '8px', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
    },
})}

export const info = (message) => {
    toast.info(message, {
        position: "top-right",
        duration: 1500,
        style: {
            backgroundColor: '#1a1a1a',
            color: '#00bfff',
            fontSize: '20px', 
            padding: '20px',
            border: '2px solid #00bfff', 
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        },
    });
}


