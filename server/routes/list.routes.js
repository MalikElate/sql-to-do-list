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

// Delete route 
router.delete('/:id',  (req, res) => {
    let id = req.params.id; // id of the thing to delete
    console.log('Delete route called with id of', id);
    let sqlText = `DELETE FROM tasks WHERE id=$1;`; 
    pool.query(sqlText, [id])
      .then( (result) => {
        res.sendStatus(200)
      }) 
      .catch((error)=>{
        console.log('error from db', error); 
        res.sendStatus(500)
      })
  });

  router.put('/:id', (req, res) => {
    let taskStatus = req.body.taskStatus; // task with updated status
    let id = req.params.id; // id of the book to update
    console.log(`Updating book ${id} with read status:`, taskStatus);
    let sqlText =''; 
    if (taskStatus == 'true') {
      sqlText = `UPDATE tasks SET status='false' WHERE id=$1`;
    } 
    else if (taskStatus == 'false'){ 
      sqlText = `UPDATE tasks SET status='true' WHERE id=$1`;
    }
    console.log(sqlText); 
    pool.query(sqlText, [id])
      .then( (result) => { 
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log('Error from db:', error);
        res.sendStatus(500);
    })
  });

  module.exports = router;