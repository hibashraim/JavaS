
// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display all tasks
function viewTasks() {
  console.clear();
  console.log("ID | Description | Status");
  console.log("-".repeat(30));
  tasks.forEach(task => {
    const status = task.completed ? "Completed" : "Pending";
    console.log(`${task.id} | ${task.description} | ${status}`);
  });
  console.log();
}

// Add a new task
function addTask(description) {
  const newTask = {
    id: tasks.length + 1,
    description: description,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  console.log(`Task "${description}" added!`);
}

// Toggle task completion status by ID
function toggleTaskCompletion(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    console.log(`Task ID ${id} status toggled.`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

// Update the description of a task by ID
function updateTaskDescription(id, newDescription) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.description = newDescription;
    saveTasks();
    console.log(`Task ID ${id} updated!`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

// Remove a task by ID
function removeTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    // Reassign IDs to remaining tasks
    tasks.forEach((task, idx) => (task.id = idx + 1));
    saveTasks();
    console.log(`Task ID ${id} removed.`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

// Search for tasks by description
function searchTasks(keyword) {
  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log("Search Results:");
  filteredTasks.forEach(task =>
    console.log(`ID: ${task.id}, Description: ${task.description}`)
  );
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sample Usage
console.log("Welcome to the Task Manager!");

// Test cases to demonstrate functionality
addTask("Learn JavaScript");
addTask("Build a Task Manager");
viewTasks();
toggleTaskCompletion(1);
updateTaskDescription(2, "Build a Task Manager with localStorage");
removeTask(1);
viewTasks();
searchTasks("Task");
