# To-Do List Application

## Overview
This To-Do List application allows users to manage their tasks efficiently. Users can add, edit, delete, and filter tasks based on due dates. The application is built using HTML, CSS, JavaScript (jQuery), and Node.js with a MySQL database.

## Features
- User Authentication
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks by due date

## Technologies Used
### Frontend:
- HTML
- CSS
- JavaScript (jQuery)

### Backend:
- Node.js
- Express.js

### Database:
- MySQL
- 
### Dependencies
- `mysql2`
- `express`
- `bcrypt`
- `cors`

## Setup and Installation

### Prerequisites
- Node.js installed
- MySQL installed

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/Chamalka20/To-do-App.git
    cd todo-list-app
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up the MySQL database:
    - Create a database named `todo_list`.
4. Configure the database connection:
    - Rename `.env.example` to `.env` and update the database credentials.
5. Start the backend server:
    ```bash
    node index.js
    ```
6. Open the `index.html` file in your browser to view the application.

## Usage

### Authentication
On opening the application, you will be prompted to log in or sign up. After logging in, you can start managing your tasks.

### Managing Tasks
- **Add Task:** Enter the task description and due date, then click "Add Task".
- **Edit Task:** Click the "Edit" button next to a task to update its description.
- **Delete Task:** Click the "Delete" button next to a task to remove it.
- **Mark as Completed:** Check the box next to a task to mark it as completed.
- **Filter Tasks:** Use the filter section to display tasks due on a specific date.
## API Endpoints
- `GET /getAllTasks/:userId` - Retrieve all tasks for a specific user.
- `POST /addNewTask` - Add a new task for a specific user.
- `PUT /updateTask/:taskId` - Update a task by its ID.
- `DELETE /deleteTask/:taskId` - Delete a task by its ID.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [jQuery](https://jquery.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
