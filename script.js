// Wait for the entire HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select the DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Add class using classList.add

        // Add click event to remove the task
        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Add click event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add keypress event to support "Enter" key submission
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
