# Test Técnico Fullstack - Consulta UF
Esta es una aplicación web fullstack desarrollada como solución a un test técnico. El objetivo es crear un sistema que permita a los usuarios consultar el valor de la UF (Unidad de Fomento) por fecha, previa autenticación.

La solución está 100% dockerizada, separando el frontend y el backend en servicios independientes orquestados con Docker Compose.

## Stack Tecnológico
Este proyecto fue construido con un enfoque moderno y escalable:

Frontend: React, TypeScript, Vite, React Router, Axios.

Backend: Node.js, Express, TypeScript, JSON Web Token (JWT).

Orquestación: Docker & Docker Compose.

Servidor Frontend: Nginx (configurado para manejar el enrutamiento de una SPA).

## Características Principales
Arquitectura Fullstack: Frontend y Backend desacoplados.


Autenticación JWT: Login de usuarios (admin/1234) que genera un token para mantener la sesión activa.


### Rutas Protegidas:

- ProtectedRoute: No se puede acceder a /consulta sin un token válido.

- PublicRoute: Si el usuario ya está logueado, es redirigido de /login a /consulta.

Backend como Proxy: El frontend nunca habla con la API externa. Llama al backend, que valida el token y luego consulta mindicador.cl.


### Validaciones Completas:

La fecha no puede estar vacía.

La fecha no puede ser futura.

Manejo de errores de API (404 si la fecha no tiene datos, 503 si el servicio externo falla).

## Cómo Ejecutar
Asegúrate de tener Docker y Docker Compose instalados.

Clonar el repositorio

git clone https://github.com/IvanCaceresS/cepet-web-app-technical-test
cd cepet-web-app-technical-test
Crear el archivo de entorno Crea un archivo llamado .env dentro de la carpeta backend/. backend/.env

JWT_SECRET=clave-super-ultra-mega-hiper-secreta


Levantar los contenedores Desde la raíz del proyecto, ejecuta:

docker-compose up --build

Frontend (Aplicación Web): http://localhost:8080

Backend (API): http://localhost:4000

## credenciales de Acceso
Las credenciales están hardcoded en el backend, como se solicitó.

Usuario: admin 
Contraseña: 1234