# To-Do List

A simple to-do list fullstack application using React for the frontend, Express for the backend, and MySQL for the database.

**🔍 Keywords:** React.js, Express, Mysql, JavaScript, CSS3, HTML5, async/await, API, Git, responsive design.

### 🟡 Version 1

In the first version, the focus was on developing the basic functionalities of the app, such as adding tasks, marking them as complete, and deleting them.

- **🌱 Next version:** Add animations when the card is clicked.
- **👾 Bugs:** The upcoming version will introduce the ability to assign tasks to specific dates, enhancing the app's functionality and allowing users to better organize and schedule their tasks.

### 📦 Dependencies

1. Run `npm install` in project directory. This will install server-related dependencies such as `express`.

2. `cd client` and run `npm install`. This will install client dependencies (React).

### 💾 Database Setup

To set up the MySQL database for the project, follow these steps:

1. Access the MySQL interface in your terminal by running the appropriate command.
2. Create a new database called "adjectives" by executing the following command: `create database todos`.
3. Create an `.env` file in the project folder and add the MySQL authentication information for the MySQL user. For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_NAME=todos
   DB_PASS=YOURPASSWORD

   ```

4. Run `npm run migrate` in a new terminal window in the project folder. This command will create a table called 'adjectives' in the database.
5. The database has already been populated with the information of adjectives.

Tables in todos:

| Tables_in_todos |
| --------------- |
| items           |

Table structure for items:

| Field    | Type        | Null | Key | Default | Extra          |
| -------- | ----------- | ---- | --- | ------- | -------------- |
| id       | int         | NO   | PRI | NULL    | auto_increment |
| text     | varchar(40) | NO   |     | NULL    |                |
| complete | tinyint(1)  | YES  |     | NULL    |                |

Data in the items table:

| id  | text              | complete |
| --- | ----------------- | -------- |
| 53  | study node        | 1        |
| 54  | finish homework   | 1        |
| 55  | call mom          | 0        |
| 57  | computer backup   | 0        |
| 58  | update github     | 0        |
| 60  | create app        | 1        |
| 62  | call cedrick      | 0        |
| 63  | improve app       | 0        |
| 66  | use panda planner | 0        |

### 🔧 Development

1. Run `npm start` in project directory to start the Express server on port 4000
2. In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

### 🗂️ File structure:

    📗 to-do-list
    ├── 📂 bin
    ├── 📂 client
    │   ├── 📂 src
    │   │   ├── 🎨 App.css
    │   │   ├── 🎨 index.css
    │   │   ├── 💙 App.jsx
    │   │   └── 💙 main.jsx
    ├── 📂 model
    │   └── 📜 database.js
    │   └── 📜 helper.js
    ├── 📂 public
    │   └── 📄 index.html
    ├── 📂 routes
    │   └── 📜 api.js
    ├── 📜 app.js
    └── 📖 README.md
