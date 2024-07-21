!['banner'](./images/oc%20social%20network.svg)

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="####Social Network">Social Network</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Red Scial (Ocean)
Se realiza este proyecto con el objetivo de dar cumplimiento al temario del Bootcamp Full Stack Developer de [@GeeksHubsAcademy](https://github.com/GeeksHubsAcademy). Este proyecto implica el desarrollo de una API funcional conectada a una base de datos no relacional, donde los usuarios se pueden dar de alta, interactuar con otros usuarios a traves de publicaciones o comentarios, dar me gusta las publicaciones y tambien pueden seguir de dejar de seguir usuarios para ver o no sus publicaciones. 

## Sobre el proyecto
API RESTful que interactúa con una base de datos no relacional, específicamente MongoDB. La API está implementada utilizando Node.js como entorno de ejecución y Mongoose como la librería de modelado de datos de MongoDB para Node.js.

La arquitectura de la API se basa en los siguientes componentes clave:

##### Node.js:
Utilizado como el entorno de ejecución para el desarrollo de la API, proporcionando una plataforma eficiente y escalable basada en eventos asíncronos.

##### Express.js:
Framework web para Node.js empleado para crear el servidor HTTP y gestionar las rutas, middlewares y controladores de la API.

##### Mongoose:
Librería de modelado de datos que se utiliza para definir esquemas, validar datos y proporcionar una capa de abstracción sobre las operaciones CRUD (Crear, Leer, Actualizar, Borrar) en la base de datos MongoDB.

##### MongoDB:
Base de datos NoSQL utilizada para el almacenamiento de datos, seleccionada por su flexibilidad en la gestión de datos no estructurados y su capacidad de escalabilidad horizontal.

Esta combinación de tecnologías permite construir una API robusta y escalable, adecuada para aplicaciones modernas que requieren la gestión eficiente de grandes volúmenes de datos no estructurados.

## Stack
Tecnologias utilizadas para el desarrollo de este proyecto: 

<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://www.mongodb.com/es">
    <img src= "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="https://expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://mongoosejs.com/">
    <img src= "https://img.shields.io/badge/MONGOOSE-url?style=for-the-badge&logo=MONGOOSE&color=%23880000
    "/>
</a>
<a href="https://www.postman.com/">
    <img src= "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
    "/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white"/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>

## Deploy  
Puedes acceder al deploy de esta API en:
<div >
    <a href="https://tattoostudio.zeabur.app"><strong>Url a producción </strong></a>
</div>

## Instalación
1. Clonar el repositorio
   ```bash
    git clone https://github.com/AbrahamEsc1911/FSD-API-SOCIAL-NETWORK.git   
2. Instalar las dependencias
   ```bash
      npm install
3. Usar el archivo `.env.example` como plantilla para crear el `.env` y poder rellenarlo con tus datos.

`variables de entorno`
- `PORT` es el puerto en que corre el servidor
- `MONGO_URI` el URI de MongoDB para la conexión a la base de datos
- `SALT_ROUNDS` es la cantidad de vueltas que utiliza Bcrypt para encriptar las contraseñas
- `SECRET_KEY` palabra secreta que usa JSON Web Token para la creación de los tokens
3. Levantar base de datos MongoDB y conectarla con la API
- <details>
  <summary>(Opcional) Pasos para configurar y ejecutar MongoDB en Docker</summary>

  - Hacer un pull de la imagen de MongoDB
     ```bash
     docker pull mongo
     ```

  - Crear un contenedor de MongoDB
     Personaliza los datos como:
     - `--name` (nombre del contenedor)
     - `-p ...:27017` (puerto)
     - `...PASSWORD` (contraseña)

     Ejemplo:
     ```bash
     docker run -d -p 27017:27017 --name nombre_del_contenedor -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=tu_password mongo:latest
     ```

  - Verificar si el contenedor está en ejecución
     ```bash
     docker ps
     ```
  - Si el contenedor no está en ejecución, iniciarlo
     ```bash
     docker start nombre_del_contenedor
     ```
</details>

4. Ejecutar los seeders para sembrar los multiples colleciones y documentos en la Base de Dados
   ```bash
    npm run db:seed 
    ```
5. Correr el servidor
   ```bash
   npm run dev
   ``` 

## Endpoints

#### Healthy
- **Healthy**
  - **Método**: `GET`
  - **URL**: `localhost:4000/healthy`

#### Auth
- **Registro**
  - **Método**: `POST`
  - **URL**: `localhost:4000/api/v1/users/register`
  - **Autenticación**: No requiere
  - **Cuerpo**: `{ "email": "admin@admin.com", "password": "12345678" }`
- **Inicio de sesión**
  - **Método**: `POST`
  - **URL**: `localhost:4000/api/v1/users/login`
  - **Autenticación**: No requiere
  - **Cuerpo**: `{ "email": "user@user.com", "password": "12345678" }`

## Users
- **Obtener todos los usuarios (admin)**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/users`
  - **Autenticación**: Bearer Token
- **Obtener perfil de usuario**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/users/profile`
  - **Autenticación**: Bearer Token
- **Obtener usuario por correo (admin)**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/users/filter`
  - **Params**: `?email=email@email`
  - **Autenticación**: Bearer Token (role admin)
- **Actualizar usuario**
  - **Método**: `PUT`
  - **URL**: `localhost:4000/api/v1/users/profile`
  - **Autenticación**: Bearer Token
  - **Cuerpo**: `{ "name": "user", "email": "user@user.com", "password": "12345678" }`
- **Actualizar rol por ID (admin)**
  - **Método**: `PUT`
  - **URL**: `localhost:4000/api/v1/users/:userId/role`
  - **Autenticación**: Bearer Token (role admin)
  - **Cuerpo**: `{ "roles": "user" }`
- **Eliminar usuario por ID (admin)**
  - **Método**: `DELETE`
  - **URL**: `localhost:4000/api/v1/users/:userId`
  - **Autenticación**: Bearer Token (role admin)
- **Seguir y dejar de seguir usuarios**
  - **Método**: `PUT`
  - **URL**: `localhost:4000/api/v1/users/follow/:userId`
  - **Autenticación**: Bearer Token

## Posts
- **Crear post**
  - **Método**: `POST`
  - **URL**: `localhost:4000/api/v1/posts`
  - **Autenticación**: Bearer Token
  - **Cuerpo**: `{ "message": "Mensaje del post" }`
- **Eliminar post por ID**
  - **Método**: `DELETE`
  - **URL**: `localhost:4000/api/v1/posts/:postId`
  - **Autenticación**: Bearer Token
- **Actualizar post por ID**
  - **Método**: `PUT`
  - **URL**: `localhost:4000/api/v1/posts/:postId`
  - **Autenticación**: Bearer Token
  - **Cuerpo**: `{ "message": "Mensaje actualizado" }`
- **Obtener posts del usuario**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/own`
  - **Autenticación**: Bearer Token
- **Obtener todos los posts**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/posts`
  - **Autenticación**: No requiere
- **Obtener post por ID**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/:postId`
  - **Autenticación**: No requiere
- **Obtener posts por ID de usuario**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/users/posts/:userId`
  - **Autenticación**: No requiere
- **Dar me gusta/no me gusta a un post por ID**
  - **Método**: `PUT`
  - **URL**: `localhost:4000/api/v1/posts/like/:postId`
  - **Autenticación**: Bearer Token
- **Obtener posts del timeline de seguidores**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/timeline`
  - **Autenticación**: Bearer Token

## Comments
- **Crear nuevo comentario**
  - **Método**: `POST`
  - **URL**: `localhost:4000/api/v1/comments/:postId`
  - **Autenticación**: Bearer Token
  - **Cuerpo**: `{ "comment": "Comentario" }`
- **Eliminar comentario por ID**
  - **Método**: `DELETE`
  - **URL**: `localhost:4000/api/v1/comments/:commentId`
  - **Autenticación**: Bearer Token
- **Actualizar comentario por ID**
  - **Método**: `PUT`
  - **URL**: `localhost:4000/api/v1/comments/:commentId`
  - **Autenticación**: Bearer Token
  - **Cuerpo**: `{ "comment": "Comentario actualizado" }`
- **Obtener todos los comentarios por ID de post**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/:postId/comments`
  - **Autenticación**: No requiere
- **Obtener comentario por ID**
  - **Método**: `GET`
  - **URL**: `localhost:4000/api/v1/comments/:commentId`
  - **Autenticación**: No requiere
