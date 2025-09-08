# 📋 Sistema de Gestión de Tareas
Este es un proyecto de aplicación de lista de tareas, diseñada para ayudar a los usuarios a gestionar sus actividades diarias de manera eficiente. La aplicación está construida como una solución full-stack, con un backend robusto en Node.js y un frontend dinámico en Vue.js.

## ✨Características 🚀
Autenticación de Usuarios: Registro y login seguro para que cada usuario tenga su propia lista de tareas.

Gestión de Tareas (CRUD):

✅ Crear nuevas tareas con título y descripción.

🔍 Recuperar y visualizar tareas de forma paginada.

✏️ Update (actualizar) el estado de una tarea (completada/pendiente) o sus detalles.

🗑️ Delete (eliminar) tareas.

Paginación: Las tareas se muestran en páginas para mejorar la experiencia de usuario y el rendimiento al manejar grandes volúmenes de datos.

### Tecnologías Utilizadas 🛠️
**Backend**
Node.js: Entorno de ejecución de JavaScript del lado del servidor.

Express.js: Framework web para Node.js, utilizado para construir la API REST.

Sequelize: ORM (Object-Relational Mapper) para interactuar con la base de datos de manera sencilla.

MySQL: Sistema de gestión de bases de datos relacional.

jsonwebtoken (JWT): Para la gestión de la autenticación de usuarios.

**Frontend**
Vue.js: Framework progresivo para construir interfaces de usuario.

Axios: Cliente HTTP para realizar peticiones a la API del backend.

Tailwind CSS: Framework de CSS utilitario para un diseño rápido y responsivo.

### Configuración del Proyecto ⚙️
Sigue estos pasos para tener una copia del proyecto en tu máquina local para desarrollo.

**1. Requisitos Previos**
Asegúrate de tener instalado lo siguiente:

Node.js (versión 14 o superior)

npm (normalmente viene con Node.js)

MySQL

**2. Configuración del Backend**
Navega a la carpeta backend en tu terminal.

cd backend

Instala las dependencias del servidor.

npm install

Crea un archivo .env en la carpeta backend y añade tus variables de entorno para la base de datos.

DB_NAME=tu_nombre_de_bd
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=3306
TOKEN_SECRET=token_secret
TOKEN_EXPIRATION=12h
PORT=3000

Inicia el servidor.

node app.js

El servidor se ejecutará en el puerto especificado en tu archivo .env.

tambien se ha importado la build del frontend para que todo sea ejecutado en localhost:3000
igualmente, se puede inicializar el frontend por separado para su prueba y uso 

**3. Configuración del Frontend**
Navega a la carpeta frontend en tu terminal.

cd ../frontend

Instala las dependencias del cliente.

npm install

Crea un archivo .env en la carpeta frontend y añade la URL de la API.

VITE_API_URL=http://localhost:3500

Inicia la aplicación de Vue.

npm run dev

La aplicación se abrirá en tu navegador en http://localhost:5173/ (o un puerto similar).

### Despliegue 🌐
Este proyecto está configurado para ser desplegado en plataformas como Vercel para el frontend y Render o Railway para el backend. Recuerda configurar las variables de entorno de la base de datos en la plataforma de despliegue de tu backend para que la aplicación funcione correctamente en producción.
