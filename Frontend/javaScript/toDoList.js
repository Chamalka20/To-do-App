// Base URL for API requests
const url = 'http://localhost:3000';

// Function to retrieve tasks from the backend using $.ajax
function getTasks() {
    return $.ajax({
        url: `${url}/getAllTasks`,
        method: 'GET',
        dataType: 'json'
    });
}

// Function to save tasks to localStorage (optional, if needed)
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to format the due date
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}


// Function to render tasks on the UI
function renderTasks() {
    getTasks().done(function(tasks) {
        var tableBody = document.getElementById("taskList");
        tableBody.innerHTML = "";
        tasks.forEach(function(task, index) {
            var tr = document.createElement("tr");
            var tdTask = document.createElement("td");
            var checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = task.status === "done" || false;
            var taskText = document.createElement("span");
            taskText.textContent = task.description;
            var editInput = document.createElement("input");
            editInput.type = "text";
            editInput.style.display = "none";
            var dueDateText = document.createElement("span");
            dueDateText.textContent = task.due_date ? formatDate(task.due_date) : "No due date";
            var editButton = document.createElement("button");
            var deleteButton = document.createElement("button");

            // Inline CSS styles
            editButton.textContent = "Edit";
            editButton.style.padding = "8px 15px";
            editButton.style.marginRight = "5px";
            editButton.style.color = "#fff";
            editButton.style.cursor = "pointer";
            editButton.style.borderRadius = "3px";
            editButton.style.backgroundColor = "#28a745";
            editButton.style.border = "1px solid transparent";

            deleteButton.textContent = "Delete";
            deleteButton.style.padding = "8px 15px";
            deleteButton.style.marginRight = "5px";
            deleteButton.style.color = "#fff";
            deleteButton.style.cursor = "pointer";
            deleteButton.style.borderRadius = "3px";
            deleteButton.style.backgroundColor = "#dc3545";
            deleteButton.style.border = "1px solid transparent";

            // Add event listeners
            checkBox.addEventListener("change", function() {
                task.status = task.status === "done" ? "pending" : "done";
                updateTask(task.tasksId, { status: task.status }).done(function() {
                    saveTasks(tasks);
                    renderTasks();
                });
            });
            editButton.addEventListener("click", function() {
                var newTaskDescription = window.prompt("Edit task:", task.description);
                if (newTaskDescription !== null && newTaskDescription.trim() !== "") {
                    updateTask(task.tasksId, { description: newTaskDescription }).done(function() {
                        task.description = newTaskDescription.trim();
                        saveTasks(tasks);
                        renderTasks();
                    });
                }
            });
            deleteButton.addEventListener("click", function() {
                deleteTask(task.tasksId).done(function() {
                    tasks.splice(index, 1);
                    saveTasks(tasks);
                    renderTasks();
                });
            });

            // Append elements to list item
            tdTask.appendChild(checkBox);
            tdTask.appendChild(taskText);
            tdTask.appendChild(editInput);
            tr.appendChild(tdTask);

            var tdDueDate = document.createElement("td");
            tdDueDate.appendChild(dueDateText);
            tr.appendChild(tdDueDate);

            var tdAction = document.createElement("td");
            tdAction.appendChild(editButton);
            tdAction.appendChild(deleteButton);
            tr.appendChild(tdAction);

            // Add completed class if task is completed
            if (task.status === "done") {
                tr.classList.add("completed");
            }

            tableBody.appendChild(tr);
        });
    }).fail(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

// Function to add a new task
function addTask() {
    var input = document.getElementById("taskInput").value;
    var dueDate = document.getElementById("dueDateInput").value;
    if (input === '') {
        alert("Please enter a task!");
        return;
    }

    $.ajax({
        url: `${url}/addNewTask`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ description: input, due_date: dueDate, status: "pending" })
    }).done(function() {
        renderTasks();
        document.getElementById("taskInput").value = "";
        document.getElementById("dueDateInput").value = "";
    }).fail(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

// Function to update a task
function updateTask(taskId, task) {
    return $.ajax({
        url: `${url}/updateTask/${taskId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(task)
    });
}

// Function to delete a task
function deleteTask(taskId) {
    return $.ajax({
        url: `${url}/deleteTask/${taskId}`,
        method: 'DELETE'
    });
}

// Initial rendering of tasks
renderTasks();
