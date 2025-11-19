# E-commerce Full Stack Project


## Descripción General

MODASELECTA es un e-commerce en pleno desarrollo, diseñada para ofrecer una experiencia de compra digital moderna y eficiente en el rubro de moda y accesorios. La plataforma busca centralizar la oferta de productos de distintas marcas y emprendedores, garantizando variedad, calidad y seguridad en la compra, además de un diseño moderno y adaptable a distintos dispositivos.

## Estructura del Proyecto
El sistema está dividido en dos grandes módulos: un frontend desarrollado con React y un backend construido con Node.js y Express. Ambos módulos se comunican entre sí mediante API REST, permitiendo una arquitectura escalable y mantenible.
---

---

## Instalación y Ejecución

### Requisitos previos
- Node.js >= 18.x
- npm >= 9.x

### Clonar el repositorio
```bash
git clone <https://github.com/NSRipani/MODASELECTA>
cd MODASELECTA
```

### Instalación de dependencias
#### Frontend (React + Vite)
```bash
cd cliente
npm install
```

Si necesitas crear el proyecto desde cero:
```bash
npm create vite@latest cliente -- --template react
cd cliente
npm install
```

#### Backend
```bash
cd server
npm install
```

### Ejecución en desarrollo
#### Frontend (React + Vite)
```bash
cd cliente
npm run dev
```
El servidor estará disponible en `http://localhost:5173`

#### Backend
```bash
cd server
npm run dev
```
El servidor estará disponible en `http://localhost:8000`
---

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
- **Tecnologías:** Node.js, Express, MongoDB, JWT para autenticación, Joi

- **Procesamieinto de datos:** Para el proceso de datos consta por capas:
  DAO, Repository, Service y Controller:
  - Usuarios
  - Productos
  - Carrito de compra
  - Ordenes
  - Contato
  - Suscripción
  - Cambio de contraseña
  - Uso de notificaciones via email

- **Carpetas principales:**
  - `controllers/`: Lógica de negocio y controladores de rutas
  - `dao/`: Acceso a datos y modelos
  - `dto/`: Objetos de transferencia de datos
  - `middleware/`: Validaciones, manejo de errores, autenticación
  - `mocks/`: Generación de objetos random para prubas de fucionalidades
  - `repository/`: Repositorios para acceso a datos
  - `route/`: Definición de rutas y sockets(no utilziado aun)
  - `service/`: modelo de negocio
  - `auth/`: generateToken, datos que contiene de un usuario autenticado y chequeo de cookie
  - `config/`: Estrategia de Autenticación  
  - `utils/`, coneccion a BD de Mogo, recursos de multer, mailer, logger y swagger
  - `assets/`: utilidades y recursos imágenes
- **Funcionalidades previstas:**
  - Gestión de usuarios y autenticación
  - Gestión de productos, órdenes y carrito
  - Envío de emails y notificaciones
  - API REST para comunicación con el frontend
 
## Stack Tecnológico

Breve listado de las tecnologías, librerías y herramientas utilizadas (o previstas) en el proyecto.

- **Frontend (cliente/)**
  - Framework: React
  - Bundler / dev server: Vite
  - Estado/global: Context API
  - Routing: React Router (previsto)
  - Peticiones HTTP: axios
  - UI / Toasters: sonner (toasts)
  - Estilos: CSS (archivos por componente) / CSS Modules
  - Linter / Formatter: ESLint / Prettier (configurable)

- **Backend (server/)**
  - Runtime: Node.js
  - Framework: Express
  - Base de datos: MongoDB (previsto)
  - ORM/ODM: Mongoose (previsto)
  - Autenticación: JWT en cookies, passport (estrategias en `config/`)
  - Validación: Joi 
  - Envío de emails: Nodemailer (utilidad en `utils/mailer.js`)
  - Documentación API: swagger-jsdoc + swagger-ui-express (config en `src/utils/swagger.js`)
  - Subida de archivos: multer (utilidad en `utils/multer.js`)
  - Logger: logger personalizado (`src/utils/logger.js`)

- **Dev / Infra & Herramientas**
  - Control de versiones: Git
  - Gestión de paquetes: npm
  - Entorno: Node >= 18
  - Documentación interactiva: Swagger UI (`/api-docs`)

- **Testing (recomendado/proyectado)**
  Aunque actualmente el proyecto no tenga tests implementados, se recomienda este flujo y estas dependencias para dejar todo documentado y facilitar su futura implementación.

  - Frontend: Jest + React Testing Library
  - Backend: Jest / Mocha + Supertest

## Documentación de API - Swagger

La API está documentada con **Swagger/OpenAPI 3.0.0**. Accede a la documentación interactiva en:

```
http://localhost:8000/api-docs
```

### Rutas Disponibles

#### **Autenticación (Auth)**
- `POST /api/users/register` - Registrar un nuevo usuario
- `POST /api/users/session` - Iniciar sesión de usuario
- `POST /api/users/logout` - Cerrar sesión de usuario

#### **Gestión de Usuarios (Users)**
- `GET /api/users/` - Obtener todos los usuarios (solo admin)
- `GET /api/users/{id}` - Obtener usuario por ID
- `GET /api/users/role?role={role}` - Filtrar usuarios por rol (solo admin)
- `GET /api/users/email?email={email}` - Buscar usuario por email (solo admin)
- `PATCH /api/users/{id}` - Actualizar usuario (solo admin)
- `DELETE /api/users/{id}` - Eliminar usuario (solo admin)

#### **Gestión de Productos (Products)**
- `GET /api/products/` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `POST /api/products/create` - Crear nuevo producto (solo admin)
- `DELETE /api/products/{id}` - Eliminar producto (solo admin)

#### **Recuperación de Contraseña (Password)**
- `POST /api/password/forgot` - Solicitar código de recuperación (sin autenticación)
- `POST /api/password/reset` - Restablecer contraseña con código (sin autenticación)

#### **Carrito, Órdenes y Contacto**
Estas rutas están en desarrollo y serán documentadas próximamente en Swagger.

### Nota de Seguridad
- Las rutas que requieren autenticación usan **JWT en cookies** (`cookieAuth`).
- Las rutas de recuperación de contraseña **no requieren autenticación** (accesibles públicamente).
- Las rutas exclusivas para administradores están protegidas por validación de rol.

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
