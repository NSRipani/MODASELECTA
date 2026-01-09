// import React from 'react';
// import './ErrorBoundary.css';

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false, error: null, errorInfo: null };
//     }

//     static getDerivedStateFromError(error) {
//         // Actualiza el estado para mostrar la UI de error
//         return { hasError: true };
//     }

//     componentDidCatch(error, errorInfo) {
//         // Puedes loguear el error a un servicio de reporte de errores
//         console.error('ErrorBoundary capturó un error:', error, errorInfo);
//         this.setState({
//             error: error,
//             errorInfo: errorInfo
//         });
//     }

//     handleRetry = () => {
//         this.setState({ hasError: false, error: null, errorInfo: null });
//     };

//     render() {
//         if (this.state.hasError) {
//             // UI de error personalizada
//             return (
//                 <div className="error-boundary">
//                     <div className="error-content">
//                         <h2>¡Oops! Algo salió mal</h2>
//                         <p>Ha ocurrido un error inesperado. Por favor, intenta recargar la página.</p>
//                         <div className="error-actions">
//                             <button onClick={this.handleRetry} className="retry-btn">
//                                 Intentar de nuevo
//                             </button>
//                             <button onClick={() => window.location.reload()} className="reload-btn">
//                                 Recargar página
//                             </button>
//                         </div>
//                         {process.env.NODE_ENV === 'development' && (
//                             <details className="error-details">
//                                 <summary>Detalles técnicos (solo en desarrollo)</summary>
//                                 <pre>{this.state.error && this.state.error.toString()}</pre>
//                                 <pre>{this.state.errorInfo.componentStack}</pre>
//                             </details>
//                         )}
//                     </div>
//                 </div>
//             );
//         }

//         return this.props.children;
//     }
// }

// export default ErrorBoundary;