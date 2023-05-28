# To-Do List

A simple to-do list fullstack application using React for the frontend, Express for the backend, and MySQL for the database.

**🔍 Keywords:** React.js, Express, Mysql, JavaScript, CSS3, HTML5, async/await, API, Git, responsive design.

### 🟡 Version 1

In the first version, the focus was on developing the basic functionalities of the app, such as adding tasks, marking them as complete, and deleting them.

- **🌱 Next version:** Add animations when the card is clicked.
- **👾 Bugs:** The upcoming version will introduce the ability to assign tasks to specific dates, enhancing the app's functionality and allowing users to better organize and schedule their tasks.

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

### 🗄️ Database:

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
