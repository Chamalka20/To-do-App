const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root', 
  database: 'to-do-app'   
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');

  // SQL commands to create tables if they don't exist
  const createUsersTable = `CREATE TABLE IF NOT EXISTS Users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
  )`;

  const createTasksTable = `CREATE TABLE IF NOT EXISTS Tasks (
    taskId INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    status ENUM('pending', 'done') DEFAULT 'pending',
    dueDate DATE
  )`;

  const createUserTasksTable = `CREATE TABLE IF NOT EXISTS UserTasks (
    userTaskId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    taskId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (taskId) REFERENCES Tasks(taskId)
  )`;

  // Execute SQL commands to create tables
  connection.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created successfully');
  });

  connection.query(createTasksTable, (err) => {
    if (err) throw err;
    console.log('Tasks table created successfully');
  });

  connection.query(createUserTasksTable, (err) => {
    if (err) throw err;
    console.log('UserTasks table created successfully');
  });
});

// Close the connection when the script ends
process.on('exit', () => {
  connection.end();
  console.log('Connection closed');
});

module.exports = connection;