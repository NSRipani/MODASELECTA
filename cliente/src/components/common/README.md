# LoadingSpinner Component

Un componente reutilizable para mostrar estados de carga en la aplicación.

## Props

- `size`: Tamaño del spinner ('small', 'medium', 'large'). Default: 'medium'
- `color`: Color del borde del spinner. Default: '#18bc9c'
- `message`: Mensaje opcional a mostrar debajo del spinner. Default: 'Cargando...'

## Uso

```jsx
import LoadingSpinner from '../common/LoadingSpinner.jsx';

// Uso básico
<LoadingSpinner />

// Con props personalizados
<LoadingSpinner size="large" color="#ff6b6b" message="Procesando pedido..." />
```

## Ejemplos de Integración

- En componentes que cargan datos: `if (loading) return <LoadingSpinner message="Cargando productos..." />;`
- Durante operaciones asíncronas: Mostrar en botones o secciones específicas.

## Estilos

Los estilos están en `LoadingSpinner.css`. Es responsive y usa animaciones CSS puras.