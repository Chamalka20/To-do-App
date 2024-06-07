// Function to retrieve tasks from localStorage
function getTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the UI
function renderTasks() {
    var tasks = getTasks();
    var tableBody = document.getElementById("taskList");
    tableBody.innerHTML = "";
    tasks.forEach(function(task, index) {
        var tr = document.createElement("tr");
        var tdTask = document.createElement("td");
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed || false;
        var taskText = document.createElement("span");
        taskText.textContent = task.name;
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.style.display = "none";
        var editButton = document.createElement("div");
        var deleteButton = document.createElement("div");

        // Inline CSS styles
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Add event listeners
        checkBox.addEventListener("change", function() {
            tasks[index].completed = checkBox.checked;
            saveTasks(tasks);
            renderTasks();
        });
        editButton.addEventListener("click", function() {
            var newTaskName = window.prompt("Edit task:", task.name);
            if (newTaskName !== null && newTaskName.trim() !== "") {
                tasks[index].name = newTaskName.trim();
                saveTasks(tasks);
                renderTasks();
            }
        });
        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        });

        // Append elements to list item
        tdTask.appendChild(checkBox);
        tdTask.appendChild(taskText);
        tdTask.appendChild(editInput);
        tr.appendChild(tdTask);
        var tdAction = document.createElement("td");
        tdAction.appendChild(editButton);
        tdAction.appendChild(deleteButton);
        tr.appendChild(tdAction);

        // Add completed class if task is completed
        if (task.completed) {
            tr.classList.add("completed");
        }

        tableBody.appendChild(tr);
    });
}

// Function to add a new task
function addTask() {
    var input = document.getElementById("taskInput").value;
    if (input === '') {
        alert("Please enter a task!");
        return;
    }

    var tasks = getTasks();
    tasks.push({ name: input, completed: false });
    saveTasks(tasks);
    renderTasks();

    document.getElementById("taskInput").value = "";
}

// Initial rendering of tasks
renderTasks();
