const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); 
// Get route
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM tasks;';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting books', error);
      res.sendStatus(500);
    });
  }); 
// Post route 
  router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding book`, newTask);
    let queryText = `INSERT INTO "tasks" ("task", "taskDisplay")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.taskDisplay])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
      });
  });


  module.exports = router;