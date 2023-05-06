var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/todos", (req, res) => {
  // Send back the full list of items

  db("SELECT * FROM items ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/todos", async (req, response) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  let text = req.body.text;
  await db(`INSERT INTO items (text, complete) VALUES ("${text}", 0);`);
  response.send(await db("SELECT * FROM items ORDER BY id DESC LIMIT 1;"));
});

// router.post('/todoss', (req, response) => {
//   let text = req.body.text;
//   db(`INSERT INTO items (text, complete) VALUES ("${text}", 0);`).then(() => {
//     db('SELECT * FROM items ORDER BY id ASC;').then((results) => {
//       response.send(results.data);
//     });
//   });
// });

router.put("/todos/:todo_id", async (req, response) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  let newText = req.body.text;
  let id = req.params.todo_id;
  await db(`UPDATE items SET text = "${newText}" WHERE id = ${id}`);
  response.send(await db(`SELECT * FROM items WHERE id = ${id};`));
});

router.delete("/todos/:todo_id", async (req, response) => {
  let id = req.params.todo_id;
  await db(`DELETE FROM items WHERE id = ${id};`);
  response.status(200).send();
});

module.exports = router;
