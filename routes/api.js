// Creates an instance of the Express configuration
var express = require("express");
// Uses an Express function to create a router
var router = express.Router();
// Imports the database scafolding that will be used
const db = require("../model/helper");

// HTTP method (request) that is triggered when the page is loaded
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// HTTP method (request) that is triggered when the user wants to see all the elements on the todo list
router.get("/todos", (req, res) => {
  // req is not used and can be replaces by _
  // It is using the db that was imported on line 6
  // It gets all the elements from the items table in ascending order
  db("SELECT * FROM items ORDER BY id ASC;")
    // When it gets the results
    .then(results => {
      // It sends the response in the form of an object
      res.send(results.data);
    })
    // Error handler
    .catch(err => res.status(500).send(err));
});

// This is the method to add new todos to the items table
router.post("/todos", async (req, response) => {
  // The new task will be sent to the database in JSON format
  // It will be in the body of the request on the property text
  let text = req.body.text;
  // The program will wait until the database is updated to keep running
  await db(`INSERT INTO items (text, complete) VALUES ("${text}", 0);`);
  // On the mysql command I harcoded the incomplete status on the item
  // When the database is updated the program will return the new element added to the table
  response.send(await db("SELECT * FROM items ORDER BY id DESC LIMIT 1;"));
});

// The : on the url means that you can edit the parameters
// This method will edit a task
router.put("/todos/:todo_id", async (req, response) => {
  // The edited text will be in the body of the reques
  let newText = req.body.text;
  // The id has to go on the parameters od the request
  let id = req.params.todo_id;
  await db(`UPDATE items SET text = "${newText}" WHERE id = ${id}`);
  // The response will be the item edited
  response.send(await db(`SELECT * FROM items WHERE id = ${id};`));
});

router.delete("/todos/:todo_id", async (req, response) => {
  let id = req.params.todo_id;
  await db(`DELETE FROM items WHERE id = ${id};`);
  // Since we are not asking to edit or add anything, a 200 response is enough
  response.status(200).send();
});

// Exports the router that will be used on the app.js file
module.exports = router;
