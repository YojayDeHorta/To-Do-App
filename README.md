📋 SISTEMA DE GESTIÓN DE TAREAS
==========================================

🎯 Una aplicación web moderna para organizar tus tareas diarias de manera eficiente.
Solución full-stack con backend en Node.js y frontend en Vue.js.

✨ CARACTERÍSTICAS PRINCIPALES
============================

🔐 Autenticación de Usuarios
- Registro y login seguro
- Cada usuario tiene su propia lista de tareas

📝 Gestión Completa de Tareas (CRUD)
- ✅ Crear nuevas tareas con título y descripción 
- 👀 Visualizar todas tus tareas organizadas
- ✏️ Actualizar estado (completada/pendiente) y detalles
- 🗑️ Eliminar tareas que ya no necesites

📄 Sistema de Paginación
- Navegación fluida entre páginas
- Optimizado para grandes volúmenes de datos

🛠️ TECNOLOGÍAS UTILIZADAS
=========================

Backend:
--------
🟢 Node.js - Entorno de ejecución JavaScript 
⚡ Express.js - Framework web para APIs REST   
🔄 Sequelize - ORM para gestión de base de datos 
🗃️ MySQL - Base de datos relacional 
🔑 JWT - Autenticación y autorización 

Frontend:
---------
💚 Vue.js - Framework para interfaces de usuario 
📡 Axios - Cliente HTTP para peticiones API 
🎨 Tailwind CSS - Framework CSS utilitario 

⚙️ CONFIGURACIÓN DEL PROYECTO
=============================

📋 Requisitos Previos:
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- MySQL

🖥️ CONFIGURACIÓN DEL BACKEND
============================

1️⃣ Navegar al directorio:
   cd backend

2️⃣ Instalar dependencias:
   npm install

3️⃣ Crear archivo .env en la carpeta backend:
```bash
   DB_NAME=tu_nombre_de_bd 
   DB_USER=tu_usuario 
   DB_PASSWORD=tu_contraseña 
   DB_HOST=localhost 
   DB_PORT=3306 
   TOKEN_SECRET=token_secret 
   TOKEN_EXPIRATION=12h 
   PORT=3000
```
4️⃣ Iniciar el servidor:
   node app.js

🎉 El servidor estará corriendo en localhost:3000

💡 NOTA: El frontend ya está integrado en el build del backend

🎨 CONFIGURACIÓN DEL FRONTEND (OPCIONAL)
=======================================

1️⃣ Navegar al directorio:
   cd frontend

2️⃣ Instalar dependencias:
   npm install

3️⃣ Crear archivo .env en la carpeta frontend:

   VITE_API_URL=http://localhost:3500

4️⃣ Iniciar servidor de desarrollo:
   npm run dev

🎉 La aplicación estará disponible en http://localhost:5173/

🌐 DESPLIEGUE EN PRODUCCIÓN
===========================

Frontend: Vercel, Netlify
Backend: Render, Railway, Heroku
Base de Datos: PlanetScale, AWS RDS

⚠️ IMPORTANTE: Configura todas las variables de entorno en tu plataforma de despliegue
