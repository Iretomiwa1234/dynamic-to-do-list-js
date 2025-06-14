document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get current task list from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Add a new task to the list and optionally save it
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add remove functionality
        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);

            // Remove from Local Storage
            let tasks = getStoredTasks();
            tasks = tasks.filter(task => task !== taskText);
            saveTasks(tasks);
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save new task if needed
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        taskInput.value = ''; // Clear input
    }

    // Handle add button click
    addButton.addEventListener('click', function () {
        addTask(taskInput.value, true);
    });

    // Allow "Enter" key to submit task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });

    // Load tasks when page is ready
    loadTasks();
});
