Basic To-Do List Application:


- In this assignment I have to create full stack MERN application with authetication and after this it should get to the dashboard of my todo.

- Where Schema model will be having:

  - User Schema (Username,password,email)

  - Title Schema

    - Title (Title for all the task e.g Sunday)
    - Tasks ( eg. on Sunday I'll do shopping, family time, movies etc.)

- No of controllers will be there for the title,tasks and user

- First Intention to create title then after adding it to the list I'll add extra task under it.

### Technologies (Will be used in it)

---

- Node.js
- Express.js(node.js Framework)
- Postman
- Mongoose(will connect to MongoDB)
- Other required packages.

###  Setup:

- **Initialize a Node.js Project**: Create a new folder and run `npm init -y` to start a new Node.js project. This will generate a `package.json` file.
- **Install Necessary Dependencies**:
    - `express` for creating the server.
    - `sqlite3` for interacting with the SQLite database.
    - `bcryptjs` for hashing passwords securely.
    - `jsonwebtoken` for handling JWTs for authentication.
    - `cors` to handle cross-origin requests from the frontend.
    - `dotenv` for managing environment variables.

    ###  Database Setup:

- **SQLite Database**: Instead of MongoDB, use SQLite to store user information and to-do items.
- **Schema Definition**: Define tables for users and to-do items. Users might have fields like `id`, `username`, `password`, and to-do items might include `id`, `user_id`, `description`, `status`.

### User Authentication:

- **Registration and Login**:
    - For registration, take the username and password, hash the password using `bcryptjs`, and store in the SQLite database.
    - For login, compare the hashed password stored in the database with the password provided by the user using `bcryptjs`.
- **JWT Integration**: Use `jsonwebtoken` to create a JWT when the user logs in, which will be used to authenticate subsequent requests.

### To-Do Operations:

- **CRUD Operations**:
    - **Create**: Insert a new to-do item linked with the user's `id`.
    - **Read**: Fetch all to-do items for the logged-in user using their `id`.
    - **Update**: Allow users to update the description or status of their to-do items.
    - **Delete**: Enable users to delete their to-do items.


### Session Management:

- **Session with JWT**: Instead of session management through MongoDB, manage sessions using JWTs that expire after a certain period.
- **Store Login Activity**: Optionally, you could store user activity logs in a separate table in SQLite if needed for audit purposes.

###  API Endpoints:
where I'll be making different routes for the required CRUD (Create,Retrieve,Update,Delete)

- Define endpoints as per the requirements but ensure they interact with SQLite. For instance:
    - `POST /register` and `POST /login` for user registration and login.
    - `POST /todos`, `GET /todos`, `PUT /todos/:id`, and `DELETE /todos/:id` for managing to-do items.


### Frontend and Deployment:

- **React Frontend**:
    - Use `create-react-app` to initialize a new React project.
    - Create components for registration, login, and to-do item management.
    - Use `axios` or `fetch` for API requests to communicate with the Node.js backend.
- **Deployment**:
    - Deploy the backend using any Node.js compatible hosting service, e.g., Heroku.
    - Deploy the frontend on Netlify or Vercel.


- Front end...
  [Vercel](https://auth-todo-list-mern.vercel.app/)
- Back end...
  [Railway](https://auth-todo-list-mern-production-e11d.up.railway.app/)
