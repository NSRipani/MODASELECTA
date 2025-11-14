# E-commerce Full Stack Project

## Descripción General

MODASELECTA es un e-commerce en pleno desarrollo, diseñada para ofrecer una experiencia de compra digital moderna y eficiente en el rubro de moda y accesorios. La plataforma busca centralizar la oferta de productos de distintas marcas y emprendedores, garantizando variedad, calidad y seguridad en la compra, además de un diseño moderno y adaptable a distintos dispositivos.

El sistema está dividido en dos grandes módulos: un frontend desarrollado con React y un backend construido con Node.js y Express. Ambos módulos se comunican entre sí mediante API REST, permitiendo una arquitectura escalable y mantenible.
---

## Estructura del Proyecto

```
cliente/   # Frontend (React + Vite)
server/    # Backend (Node.js + Express)
```

### Frontend (`cliente/`)
- **Tecnologías:** React, Vite, Context API, CSS Modules, 
- **Carpetas principales:**
  - `components/`: Componentes reutilizables (navbar, footer, productos, etc.)
  - `context/`: Manejo de estado global (carrito, usuario, productos, etc.)
  - `assets/`: Imágenes y recursos estáticos
  - `hook/`: Custom hooks para lógica reutilizable
  - `navigatePage/`: Lógica de navegación interna
- **Funcionalidades previstas:**
  - Visualización de productos
  - Carrito de compras
  - Registro e inicio de sesión de usuarios
  - Panel de administración (en desarrollo)
  - Página de inicio, contacto y cambio de contraseña

### Backend (`server/`)
- **Tecnologías:** Node.js, Express, MongoDB (previsto), JWT para autenticación, Joi

- **Procesamieinto de datos:** Para el proceso de datos cosnta por capas:
  - DAO, Repository, Service y Controller:
    - Usuarios
    - Productos
    - Carrito de compra
    - Ordenes
    - Contato
    - Suscripción

- **Carpetas principales:**
  - `controllers/`: Lógica de negocio y controladores de rutas
  - `dao/`: Acceso a datos y modelos
  - `dto/`: Objetos de transferencia de datos
  - `middleware/`: Validaciones, manejo de errores, autenticación
  - `mocks/`: Generación de objetos random para prubas de fucionalidades
  - `repository/`: Repositorios para acceso a datos
  - `route/`: Definición de rutas y sockets(no utilziado aun)
  - `service/`: Servicios de negocio
  - `auth/`: generateToken, datos que contiene de un usuario autenticado y chequeo de cookie
  - `config/`: Estrategia de Autenticación  
  - `utils/`, coneccion a BD de Mogo, recursos de multer, mailer, logger y swagger
  - `assets/`: utilidades y recursos imágenes
- **Funcionalidades previstas:**
  - Gestión de usuarios y autenticación
  - Gestión de productos, órdenes y carrito
  - Envío de emails y notificaciones
  - API REST para comunicación con el frontend

---

## Instalación y Ejecución

### Requisitos previos
- Node.js >= 18.x
- npm >= 9.x

### Clonar el repositorio
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <nombre_del_proyecto>
```

### Instalación de dependencias
#### Frontend
```bash
cd cliente
npm install
```
#### Backend
```bash
cd server
npm install
```

### Ejecución en desarrollo
#### Frontend
```bash
npm run dev
```
#### Backend
```bash
node server.js
```

---

## Estado del Proyecto


El proyecto se encuentra en una etapa inicial de desarrollo. Se están implementando las funcionalidades básicas y la estructura general. Se aceptan sugerencias y contribuciones.

---

## Mejoras y Recomendaciones

- **Pruebas Automatizadas:** Agregar tests unitarios y de integración tanto en frontend (React Testing Library, Jest) como en backend (Jest, Mocha).
- **Automatización de Despliegues:** Configurar pipelines de CI/CD para pruebas y despliegue automático.
- **Accesibilidad y UX:** Mejorar la accesibilidad y la experiencia de usuario en el frontend, incluyendo feedback visual y estados de carga.
- **Tests de Seguridad:** Implementar pruebas de seguridad y análisis de vulnerabilidades.

Estas acciones ayudarán a robustecer el proyecto y facilitarán su escalabilidad y mantenibilidad.

---

## Autores
- NICOLÁS SEBASTIÁN RIPANI
