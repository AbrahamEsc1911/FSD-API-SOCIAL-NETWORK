!['banner'](./images/oc%20social%20network.svg)

# Social Network (Ocean)
This project is carried out to fulfill the syllabus of the Full Stack Developer Bootcamp by [@GeeksHubsAcademy](https://github.com/GeeksHubsAcademy). This project involves developing a functional API connected to a non-relational database, where users can register, interact with other users through posts or comments, like posts, and follow or unfollow users to see or not see their posts.

## Contents
  <ol>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#deploy">Deploy</a></li>
    <li><a href="#database-diagram">Diagram</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#future-features">Future Functionalities</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## About the Project
RESTful API that interacts with a non-relational database, specifically MongoDB. The API is implemented using Node.js as the runtime environment and Mongoose as the MongoDB data modeling library for Node.js.

The API architecture is based on the following key components:

##### Node.js:
Used as the runtime environment for developing the API, providing an efficient and scalable platform based on asynchronous events.

##### Express.js:
Web framework for Node.js used to create the HTTP server and manage the API's routes, middlewares, and controllers.

##### Mongoose:
Data modeling library used to define schemas, validate data, and provide an abstraction layer over CRUD (Create, Read, Update, Delete) operations in the MongoDB database.

##### MongoDB:
NoSQL database used for data storage, selected for its flexibility in managing unstructured data and its horizontal scalability capability.

This combination of technologies allows building a robust and scalable API, suitable for modern applications that require efficient management of large volumes of unstructured data.

## Stack
Technologies used for the development of this project: 

<a href="https://nodejs.org/en/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://www.mongodb.com/">
    <img src= "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="https://expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://mongoosejs.com/">
    <img src= "https://img.shields.io/badge/MONGOOSE-url?style=for-the-badge&logo=MONGOOSE&color=%23880000"/>
</a>
<a href="https://www.postman.com/">
    <img src= "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
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
You can access the deployment of this API at:
<div>
    <a href="https://tattoostudio.zeabur.app"><strong>Production URL</strong></a>
</div>

## Diagrama BD :zap:
!['imagen-db'](./images/db%20architecture.svg)

## Installation
1. Clone the repository
   ```bash
    git clone https://github.com/AbrahamEsc1911/FSD-API-SOCIAL-NETWORK.git   
2. Install the dependencies
   ```bash
      npm install
3. Use the `.env.example` file as a template to create the `.env` file and fill it with your data.

`Environment Variables`
- `PORT` is the port where the server runs
- `MONGO_URI` the MongoDB URI for database connection
- `SALT_ROUNDS` the number of rounds Bcrypt uses to encrypt passwords
- `SECRET_KEY` the secret word JSON Web Token uses to create tokens
4. Set up and connect the MongoDB database to the API
- <details>
  <summary>(Optional) Steps to set up and run MongoDB in Docker</summary>

  - Pull the MongoDB image
     ```bash
     docker pull mongo
     ```

  - Create a MongoDB container
     Customize the data such as:
     - `--name` (container name)
     - `-p ...:27017` (port)
     - `...PASSWORD` (password)

     Example:
     ```bash
     docker run -d -p 27017:27017 --name container_name -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=your_password mongo:latest
     ```

  - Verify if the container is running
     ```bash
     docker ps
     ```
  - If the container is not running, start it
     ```bash
     docker start container_name
     ```
</details>

5. Run the seeders to populate the database with collections and documents
   ```bash
    npm run db:seed 
    ```
6. Run the server
   ```bash
   npm run dev
## Endpoints
<details>
<summary><strong>Healthy</strong></summary>

- **Healthy**
  - **Method**: `GET`
  - **URL**: `localhost:4000/healthy`

</details>

<details>
<summary><strong>Auth</strong></summary>

- **Register**
  - **Method**: `POST`
  - **URL**: `localhost:4000/api/v1/users/register`
  - **Authentication**: Not required
  - **Body**: 
    ```js
    { "email": "admin@admin.com", "password": "12345678" }
    ```
- **Login**
  - **Method**: `POST`
  - **URL**: `localhost:4000/api/v1/users/login`
  - **Authentication**: Not required
  - **Body**: 
    ```js
    { "email": "user@user.com", "password": "12345678" }
    ```

</details>

<details>
<summary><strong>Users</strong></summary>

- **Get all users (admin)**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/users`
  - **Authentication**: `Bearer Token`
- **Get user profile**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/users/profile`
  - **Authentication**: `Bearer Token`
- **Get user by email (admin)**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/users/filter`
  - **Params**: `?email=email@email`
  - **Authentication**: `Bearer Token` (role admin)
- **Update user**
  - **Method**: `PUT`
  - **URL**: `localhost:4000/api/v1/users/profile`
  - **Authentication**: `Bearer Token`
  - **Body**: 
    ```js
    { "name": "user", "email": "user@user.com", "password": "12345678" }
    ```
- **Update role by ID (admin)**
  - **Method**: `PUT`
  - **URL**: `localhost:4000/api/v1/users/:userId/role`
  - **Authentication**: `Bearer Token` (role admin)
  - **Body**: 
    ```js
    { "roles": "user" }
    ```
- **Delete user by ID (admin)**
  - **Method**: `DELETE`
  - **URL**: `localhost:4000/api/v1/users/:userId`
  - **Authentication**: `Bearer Token` (role admin)
- **Follow and unfollow users**
  - **Method**: `PUT`
  - **URL**: `localhost:4000/api/v1/users/follow/:userId`
  - **Authentication**: `Bearer Token`

</details>

<details>
<summary><strong>Posts</strong></summary>

- **Create post**
  - **Method**: `POST`
  - **URL**: `localhost:4000/api/v1/posts`
  - **Authentication**: `Bearer Token`
  - **Body**: 
    ```js
    { "message": "Post message" }
    ```
- **Delete post by ID**
  - **Method**: `DELETE`
  - **URL**: `localhost:4000/api/v1/posts/:postId`
  - **Authentication**: `Bearer Token`
- **Update post by ID**
  - **Method**: `PUT`
  - **URL**: `localhost:4000/api/v1/posts/:postId`
  - **Authentication**: `Bearer Token`
  - **Body**: 
    ```js
    { "message": "Updated message" }
    ```
- **Get user posts**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/own`
  - **Authentication**: `Bearer Token`
- **Get all posts**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/posts`
  - **Authentication**: Not required
- **Get post by ID**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/:postId`
  - **Authentication**: Not required
- **Get posts by user ID**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/users/posts/:userId`
  - **Authentication**: Not required
- **Like/dislike post by ID**
  - **Method**: `PUT`
  - **URL**: `localhost:4000/api/v1/posts/like/:postId`
  - **Authentication**: `Bearer Token`
- **Get follower timeline posts**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/timeline`
  - **Authentication**: `Bearer Token`

</details>

<details>
<summary><strong>Comments</strong></summary>

- **Create new comment**
  - **Method**: `POST`
  - **URL**: `localhost:4000/api/v1/comments/:postId`
  - **Authentication**: `Bearer Token`
  - **Body**: 
    ```js
    { "comment": "Comment" }
    ```
- **Delete comment by ID**
  - **Method**: `DELETE`
  - **URL**: `localhost:4000/api/v1/comments/:commentId`
  - **Authentication**: `Bearer Token`
- **Update comment by ID**
  - **Method**: `PUT`
  - **URL**: `localhost:4000/api/v1/comments/:commentId`
  - **Authentication**: `Bearer Token`
  - **Body**: 
    ```js
    { "comment": "Updated comment" }
    ```
- **Get all comments by post ID**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/posts/:postId/comments`
  - **Authentication**: Not required
- **Get comment by ID**
  - **Method**: `GET`
  - **URL**: `localhost:4000/api/v1/comments/:commentId`
  - **Authentication**: Not required

</details>

## Future Features
- Allow users to like comments.
- Include the possibility of adding images or other types of files in posts to enrich the content.
- Allow users to set a profile picture avatar.

## Contributions
Suggestions and contributions are always welcome.

You can do it in two ways:

1. Opening an issue
2. Create a fork of the repository
    - Create a new branch  
        ```bash
         git checkout -b feature/username-improvement
    - Commit your changes 
        ```bash
         git commit -m 'feat: improve X thing'
    - Push to the branch 
        ```bash
         git push origin feature/username-improvement
    - Open a Pull Request

## Author 

- [@AbrahamEsc1911](https://github.com/AbrahamEsc1911)

## Contact
<a href = "mailto:abrancho1908@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/abraham-escobar-angola-237a20224/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>

!['banner'](./images/banner1.svg)