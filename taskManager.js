let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(tasksToRender = tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasksToRender.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
      <span>${task.description}</span>
      <div>
        <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="updateTask(${task.id})">Update</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const description = taskInput.value.trim();

  if (description) {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
}

function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function updateTask(id) {
  const newDescription = prompt('Enter new task description:');
  const task = tasks.find(task => task.id === id);
  if (task && newDescription) {
    task.description = newDescription;
    saveTasks();
    renderTasks();
  }
}

function searchTasks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(searchInput));
  renderTasks(filteredTasks);
}

renderTasks();
