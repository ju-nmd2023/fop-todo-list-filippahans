const taskBox = document.getElementById("task-box");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

let tasks = [];

function onLoadHandler() {
  //loading tasks from localStorage
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks.push(...storedTasks);
  }

  addButton.addEventListener("click", addTask);

  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
    });
    const taskDescription = document.createTextNode(task.description);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

function addTask() {
  let newTaskDescription = taskBox.value;
  const newTask = { description: newTaskDescription, done: false };
  tasks.push(newTask);
  saveTasks();
  taskBox.value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

window.addEventListener("load", onLoadHandler);
