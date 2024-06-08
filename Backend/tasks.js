const dbConnection = require('./dbConnection');

// Get all tasks for a specific user
const getAllTasks = (userId, callback) => {
  console.log(userId);
  dbConnection.query('SELECT tasks.* FROM tasks JOIN usertasks ON tasks.taskId = usertasks.taskId WHERE usertasks.userId = ?',
     [userId], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Get a task by ID for a specific user
const getTaskById = (userId, taskId, callback) => {
  dbConnection.query('SELECT * FROM tasks INNER JOIN userTasks ON task.tasksId = userTasks.taskId WHERE userTasks.userId = ? AND tasks.tasksId = ?', [userId, taskId], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
};

// Create a new task for a specific user
const createTask = (userId, task, callback) => {
  dbConnection.beginTransaction((err) => {
    if (err) {
      callback(err);
      return;
    }
    dbConnection.query('INSERT INTO tasks SET ?', task, (err, results) => {
      if (err) {
        dbConnection.rollback(() => {
          callback(err);
        });
        return;
      }
      const taskId = results.insertId;
      dbConnection.query('INSERT INTO userTasks SET ?', { userId, taskId }, (err) => {
        if (err) {
          dbConnection.rollback(() => {
            callback(err);
          });
          return;
        }
        dbConnection.commit((err) => {
          if (err) {
            dbConnection.rollback(() => {
              callback(err);
            });
            return;
          }
          callback(null, { id: taskId, ...task });
        });
      });
    });
  });
};

// Update a task by ID for a specific user
const updateTask = (id, task, callback) => {
  dbConnection.query('UPDATE tasks SET ? WHERE taskId = ?', [task, id], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Delete a task by ID for a specific user
const deleteTask = (taskId, userId, callback) => {
  dbConnection.beginTransaction((err) => {
    if (err) {
      callback(err);
      return;
    }

    // First, delete from userTasks
    dbConnection.query('DELETE FROM userTasks WHERE userId = ? AND taskId = ?', [userId, taskId], (err, results) => {
      if (err) {
        dbConnection.rollback(() => {
          callback(err);
        });
        return;
      }

      // Then, delete from tasks
      dbConnection.query('DELETE FROM tasks WHERE taskId = ?', [taskId], (err) => {
        if (err) {
          dbConnection.rollback(() => {
            callback(err);
          });
          return;
        }

        // Commit the transaction
        dbConnection.commit((err) => {
          if (err) {
            dbConnection.rollback(() => {
              callback(err);
            });
            return;
          }

          callback(null, results); // You can adjust this to return whatever result is appropriate
        });
      });
    });
  });
};


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
