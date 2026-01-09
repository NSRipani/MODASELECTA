const estilo = { 
    alignItems: 'center', 
    display: "flex", 
    justifyContent: "center", 
    gap: "15px", 
    width: '100%', 
    marginTop: '10px' 
};

const botonNO = { 
    cursor: 'pointer', 
    fontSize: '18px', 
    backgroundColor: "#e0e0e0", 
    color: "#333", 
    padding: "8px 16px", 
    border: "none", 
    borderRadius: "8px", 
    transition: "background-color 0.3s ease", 
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
};

const botonSI = { 
    cursor: 'pointer', 
    fontSize: '18px', 
    backgroundColor: "#28a745", 
    color: "#fff", 
    padding: "8px 16px", 
    border: "none", 
    borderRadius: "8px", 
    transition: "background-color 0.3s ease", 
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
};

const fondo = { 
    flexDirection: 'column', 
    width: "450px", 
    height: "auto", 
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
    color: "#ffffff", 
    fontSize: "18px", 
    padding: "20px", 
    border: "none", 
    borderRadius: "12px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)", 
    textAlign: 'center' 
};

export { estilo, botonNO, botonSI, fondo }