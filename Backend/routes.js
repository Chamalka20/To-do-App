const express = require('express');
const router = express.Router();
const tasks = require('./tasks');
const users = require('./users');

// Signup 
router.post('/signup', (req, res) => {
  const { userName, email, password } = req.body;

  users.signup({ userName, email, password }, (err, user) => {
    if (err) {
      res.status(500).send('Error signing up');
      return;
    }
    res.status(201).send(user);
  });
});
// Sign-in 
router.post('/signIn', (req, res) => {
  const { email, password } = req.body;

  users.signIn(email, password, (err, user) => {
    if (err) {
      res.status(500).send('Error signing in');
      return;
    }

    if (!user) {
      res.status(401).send('Invalid email or password');
      return;
    }

    res.status(200).send(user);
  });
});

//  get all tasks
router.get('/getAllTasks', (req, res) => {
  tasks.getAllTasks((err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});

//get a task by ID
router.get('/getTaskByID/:id', (req, res) => {
  const taskId = req.params.id;
  tasks.getTaskById(taskId, (err, task) => {
    if (err) {
      console.error('Error retrieving task:', err);
      res.status(500).send('Database query error');
      return;
    }
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    res.json(task);
  });
});

// create a new task
router.post('/addNewTask', (req, res) => {
  const newTask = req.body;
  tasks.createTask(newTask, (err, task) => {
    if (err) {
      console.error('Error creating task:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.status(201).json(task);
  });
});

// update a task by ID
router.put('/updateTask/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasks.updateTask(taskId, updatedTask, (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      res.status(500).send('Database query error');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Task not found');
      return;
    }
    res.sendStatus(204);
  });
});

// delete a task by ID
router.delete('/deleteTask/:id', (req, res) => {
  const taskId = req.params.id;
  tasks.deleteTask(taskId, (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Database query error');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Task not found');
      return;
    }
    res.sendStatus(204);
  });
});

module.exports = router;