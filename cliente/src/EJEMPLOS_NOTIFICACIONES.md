/**
 * EJEMPLO: Cómo usar el contexto de notificaciones globales
 * 
 * ANTES (usando message.jsx):
 * ────────────────────────────
 * import { success, errorMessag } from '../../message/message.jsx';
 * 
 * success("Pedido realizado!");
 * errorMessag("Error al procesar el pedido");
 * 
 * 
 * AHORA (usando notificationContext):
 * ────────────────────────────────────
 * import { useNotification } from '../context/notificationContext';
 * 
 * const { success, error } = useNotification();
 * 
 * success("Pedido realizado!");
 * error("Error al procesar el pedido");
 * 
 * 
 * VENTAJAS:
 * ─────────
 * ✓ Contexto global: Una única fuente de verdad para notificaciones
 * ✓ Consistencia: Mismo estilo en toda la app
 * ✓ Centralizado: Estilos y opciones en un solo lugar
 * ✓ Flexible: Puedes personalizar por contexto
 * ✓ Tipos adicionales: warning, info, loading, promise
 * 
 * 
 * EJEMPLOS DE USO AVANZADO:
 * ──────────────────────────
 */

import { useNotification } from '../context/notificationContext';

// 1. Notificación simple
const { success } = useNotification();
success("¡Operación completada!");

// 2. Con opciones personalizadas
const { error } = useNotification();
error("Error crítico", { duration: 5000 }); // 5 segundos

// 3. Notificación de carga
const { loading, dismiss } = useNotification();
const toastId = loading("Procesando pedido...");
setTimeout(() => dismiss(toastId), 3000);

// 4. Con promesa (perfecto para async operations)
const { promise } = useNotification();
promise(
    fetchData(),
    {
        loading: "Cargando datos...",
        success: "Datos cargados exitosamente",
        error: "Error al cargar datos"
    }
);

// 5. Notificación de éxito con duración corta
const { warning } = useNotification();
warning("Carrito va a expirar en 5 minutos", { duration: 10000 });

// 6. Info con estilo personalizado
const { info } = useNotification();
info("Nuevo cupón disponible", {
    style: { fontSize: '18px', padding: '20px' }
});