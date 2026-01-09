import { toast } from 'sonner';


export const success = (message) => {
    toast.success(message,{
        position: "top-center",
        duration: 2000,
        style: {
            background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
            color: "#ffffff",
            fontSize: "18px",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center"
            // backgroundColor: '#2c3e50',
            // color: '#ecf0f1', 
            // fontSize: '20px', 
            // padding: '12px 20px', 
            // border: '2px solid #27ae60', 
            // borderRadius: '5px', 
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    })
}
export const successRegistro = (message) => {
    toast.success(message, {
        position: "top-center",
        duration: 2000,
        style: {
            background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
            color: "#ffffff",
            fontSize: "18px",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center"
            // backgroundColor: '#2c3e50',
            // color: '#ecf0f1', 
            // fontSize: '20px', 
            // padding: '12px 20px', 
            // border: '2px solid #27ae60', 
            // borderRadius: '5px', 
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }
    })
}
export const errorRegistro = (message) => {
    toast.error(message, {
        position: "top-center",
        duration: 2000,
        style: {
            background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
            color: "#ffffff",
            fontSize: "16px",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center"
            // backgroundColor: '#f8d7da', 
            // color: '#721c24', 
            // fontSize: '16px', 
            // padding: '15px',
            // border: '2px solid #dc3545',
            // borderRadius: '8px', 
            // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
        }
    })
}
export const contacto = (message) => {
    toast.success(message , {
        position: "top-center",
        duration: 2000,
        style: {
            background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
            color: "#ffffff",
            fontSize: "18px",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center"
            // backgroundColor: '#2c3e50',
            // color: '#ecf0f1', 
            // fontSize: '20px', 
            // padding: '12px 20px', 
            // border: '2px solid #27ae60', 
            // borderRadius: '5px', 
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }
    })
}


export const errorMessag = (message) => {
    toast.error(message, {
        position: "top-center",
        duration: 2000,
        style: {
            background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
            color: "#ffffff",
            fontSize: "16px",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center"
            // backgroundColor: '#f8d7da', 
            // color: '#721c24', 
            // fontSize: '16px', 
            // padding: '15px',
            // border: '2px solid #dc3545',
            // borderRadius: '8px', 
            // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
    },
})}

export const info = (message) => {
    toast.info(message, {
        position: "top-center",
        duration: 2000,
        style: {
            background: "linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)",
            color: "#ffffff",
            fontSize: "18px",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            textAlign: "center"
            // backgroundColor: '#1a1a1a',
            // color: '#00bfff',
            // fontSize: '20px', 
            // padding: '20px',
            // border: '2px solid #00bfff', 
            // borderRadius: '8px',
            // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        },
    });
}


