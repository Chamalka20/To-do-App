<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            overflow-x: auto;
        }
        code {
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        ul {
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>To-Do List Application</h1>

        <h2>Overview</h2>
        <p>This To-Do List application allows users to manage their tasks efficiently. Users can add, edit, delete, and filter tasks based on due dates. The application is built using HTML, CSS, JavaScript (jQuery), and Node.js with a MySQL database.</p>

        <h2>Features</h2>
        <ul>
            <li>User Authentication</li>
            <li>Add new tasks</li>
            <li>Edit existing tasks</li>
            <li>Delete tasks</li>
            <li>Mark tasks as completed</li>
            <li>Filter tasks by due date</li>
        </ul>

        <h2>Technologies Used</h2>
        <ul>
            <li>Frontend:
                <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript (jQuery)</li>
                </ul>
            </li>
            <li>Backend:
                <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                </ul>
            </li>
            <li>Database:
                <ul>
                    <li>MySQL</li>
                </ul>
            </li>
        </ul>

        <h2>Setup and Installation</h2>

        <h3>Prerequisites</h3>
        <ul>
            <li>Node.js installed</li>
            <li>MySQL installed</li>
        </ul>

        <h3>Steps</h3>
        <ol>
            <li>Clone the repository:
                <pre><code>git clone https://github.com/yourusername/todo-list-app.git
cd todo-list-app</code></pre>
            </li>
            <li>Install the dependencies:
                <pre><code>npm install</code></pre>
            </li>
            <li>Set up the MySQL database:
                <ul>
                    <li>Create a database named <code>todo_list</code>.</li>
                    <li>Import the provided SQL file to create the necessary tables:
                        <pre><code>mysql -u yourusername -p todo_list < database/todo_list.sql</code></pre>
                    </li>
                </ul>
            </li>
            <li>Configure the database connection:
                <ul>
                    <li>Rename <code>.env.example</code> to <code>.env</code> and update the database credentials.</li>
                </ul>
            </li>
            <li>Start the backend server:
                <pre><code>node index.js</code></pre>
            </li>
            <li>Open the <code>index.html</code> file in your browser to view the application.</li>
        </ol>

        <h2>Usage</h2>

        <h3>Authentication</h3>
        <p>On opening the application, you will be prompted to log in or sign up. After logging in, you can start managing your tasks.</p>

        <h3>Managing Tasks</h3>
        <ul>
            <li><strong>Add Task:</strong> Enter the task description and due date, then click "Add Task".</li>
            <li><strong>Edit Task:</strong> Click the "Edit" button next to a task to update its description.</li>
            <li><strong>Delete Task:</strong> Click the "Delete" button next to a task to remove it.</li>
            <li><strong>Mark as Completed:</strong> Check the box next to a task to mark it as completed.</li>
            <li><strong>Filter Tasks:</strong> Use the filter section to display tasks due on a specific date.</li>
        </ul>

        <h2>File Structure</h2>
        <pre><code>├── database
│   └── todo_list.sql
├── public
│   ├── css
│   │   └── toDoList.css
│   ├── html
│   │   └── login.html
│   ├── js
│   │   └── toDoList.js
│   └── index.html
├── routes
│   └── tasks.js
├── index.js
├── .env.example
├── package.json
└── README.md</code></pre>

        <h2>API Endpoints</h2>
        <ul>
            <li><code>GET /getAllTasks/:userId</code> - Retrieve all tasks for a specific user.</li>
            <li><code>POST /addNewTask</code> - Add a new task for a specific user.</li>
            <li><code>PUT /updateTask/:taskId</code> - Update a task by its ID.</li>
            <li><code>DELETE /deleteTask/:taskId</code> - Delete a task by its ID.</li>
        </ul>

        <h2>License</h2>
        <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

        <h2>Acknowledgements</h2>
        <ul>
            <li><a href="https://jquery.com/">jQuery</a></li>
            <li><a href="https://nodejs.org/">Node.js</a></li>
            <li><a href="https://expressjs.com/">Express.js</a></li>
            <li><a href="https://www.mysql.com/">MySQL</a></li>
        </ul>

        <h2>Contributing</h2>
        <p>Contributions are welcome! Please open an issue or submit a pull request for any changes.</p>

        <h2>Contact</h2>
        <p>For any inquiries, please contact <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>
    </div>
</body>
</html>
