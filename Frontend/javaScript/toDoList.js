// Base URL for API requests
const url = 'http://localhost:3000';
var userId;

function checkedUserAuthenticated (){
    var id = localStorage.getItem('userId');
    if(id !== null){
        userId= id;
        getTasks(userId);
    }else{
        window.location.href = '../html/login.html';
    }
}

// Function to retrieve tasks from the backend using $.ajax
function getTasks(userId) {
    console.log(userId);
    return $.ajax({
        url: `${url}/getAllTasks/${userId}`,
        method: 'GET',
        dataType: 'json'
    }).done(function(tasks) {
        renderTasks(tasks);
        console.log(tasks);
    }).fail(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
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
function renderTasks(tasks){
     // Sort tasks by due date
     tasks.sort((a, b) => {
        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } 
    });
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
        dueDateText.textContent = task.dueDate ? formatDate(task.dueDate) : "No due date";
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
            updateTask(task.taskId, { status: task.status }).done(function() {
                saveTasks(tasks);
                getTasks(userId);
            });
        });
        editButton.addEventListener("click", function() {
            var newTaskDescription = window.prompt("Edit task:", task.description);
            if (newTaskDescription !== null && newTaskDescription.trim() !== "") {
                updateTask(task.taskId, { description: newTaskDescription }).done(function() {
                    task.description = newTaskDescription.trim();
                    saveTasks(tasks);
                    getTasks(userId);
                });
            }
        });
        deleteButton.addEventListener("click", function() {
            deleteTask(task.taskId).done(function() {
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
   
}

// Function to add a new task
function addTask() {
    var input = document.getElementById("taskInput").value;
    var dueDate = document.getElementById("dueDateInput").value;
    if (input === '') {
        alert("Please enter a task!");
        return;
    }

    // Retrieve user ID from localStorage
    var userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        return;
    }

    var task = {
        description: input,
        dueDate: dueDate,
        status: "pending"
    };

    var data = {
        userId: userId,
        task: task
    };

    $.ajax({
        url: `${url}/addNewTask`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data)
    }).done(function() {
        getTasks(userId);
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
    var userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        return;
    }

    $.ajax({
        url: `${url}/deleteTask/${taskId}`,
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({ userId: userId }),
        success: function() {
            getTasks(userId);
        },
        error: function(xhr, status, error) {
            console.error('Error deleting task:', xhr.responseText);
        }
    });
}
// Function to sign out the user
function signOut() {
    // Remove user ID from localStorage
    localStorage.removeItem('userId');
    window.location.href = '../html/login.html';
}


checkedUserAuthenticated();
