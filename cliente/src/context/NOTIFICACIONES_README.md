# Contexto Global de Notificaciones

## Descripción
Un sistema centralizado para manejar todas las notificaciones (toasts) en la aplicación usando `sonner` como base. Proporciona consistencia visual y facilita el mantenimiento de estilos.

## Archivos Creados

### 1. `notificationContext.jsx`
Contexto React que proporciona métodos para mostrar notificaciones:
- `success(message, options)` - Notificación de éxito (verde)
- `error(message, options)` - Notificación de error (rojo)
- `info(message, options)` - Notificación de información (azul)
- `warning(message, options)` - Notificación de advertencia (naranja)
- `loading(message, options)` - Notificación de carga (azul)
- `promise(promise, messages, options)` - Para operaciones asíncronas
- `dismiss(toastId)` - Cierra una notificación específica

### 2. `useNotifications.jsx`
Hook simplificado para acceder al contexto en componentes.

## Instalación y Uso

### 1. Envuelve tu App
En `App.jsx`, ya está envuelto con `<NotificationProvider>`.

### 2. En tus Componentes
```jsx
import { useNotification } from '../context/notificationContext';

const MiComponente = () => {
    const { success, error, info, warning } = useNotification();
    
    const handleClick = () => {
        success("¡Operación exitosa!");
    };
    
    return <button onClick={handleClick}>Click aquí</button>;
};
```

## Ejemplos Avanzados

### Operación con Promesa
```jsx
const { promise } = useNotification();

const handleSubmit = async () => {
    promise(
        fetchUserData(),
        {
            loading: "Cargando datos del usuario...",
            success: "Datos cargados correctamente",
            error: "No se pudieron cargar los datos"
        }
    );
};
```

### Notificación con Duración Personalizada
```jsx
const { warning } = useNotification();

warning("Este mensaje desaparecerá en 10 segundos", { 
    duration: 10000 
});
```

### Cargar y Luego Cerrar Manualmente
```jsx
const { loading, dismiss } = useNotification();

const toastId = loading("Procesando...");
setTimeout(() => dismiss(toastId), 3000);
```

## Estilos

Todos los toasts usan estilos consistentes definidos en `TOAST_STYLES`:
- **Éxito**: Verde degradado
- **Error**: Rojo degradado
- **Info**: Azul degradado
- **Advertencia**: Naranja degradado

Puedes personalizar globalmente modificando `TOAST_STYLES` en `notificationContext.jsx`.

## Migración desde `message.jsx`

Cambia las importaciones:

**Antes:**
```jsx
import { success, errorMessag, info } from '../../message/message.jsx';

success("¡Listo!");
errorMessag("Error!");
```

**Ahora:**
```jsx
import { useNotification } from '../context/notificationContext';

const { success, error, info } = useNotification();

success("¡Listo!");
error("Error!");
```

## Ventajas
✓ Contexto centralizado y reutilizable
✓ Estilos consistentes en toda la app
✓ Fácil personalización
✓ Soporte para operaciones asíncronas
✓ Mayor flexibilidad que funciones aisladas