const dbConnection = require('./dbConnection');

//  get all tasks
const getAllTasks = (callback) => {
  dbConnection.query('SELECT * FROM task', (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

//  get a task by ID
const getTaskById = (id, callback) => {
  dbConnection.query('SELECT * FROM tasks WHERE tasksId = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
};

// create a new task
const createTask = (task, callback) => {
  dbConnection.query('INSERT INTO tasks SET ?', task, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, { id: results.insertId, ...task });
  });
};

// update a task by ID
const updateTask = (id, task, callback) => {
  dbConnection.query('UPDATE tasks SET ? WHERE tasksId = ?', [task, id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// delete a task by ID
const deleteTask = (id, callback) => {
  dbConnection.query('DELETE FROM tasks WHERE tasksId = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};