//DOM elements
const taskBoxElement = document.getElementById("task-box");
const addButtonElement = document.getElementById("add-button");
const taskListElement = document.getElementById("task-list");

//array to store the tasks
let tasks = [];

//handle when the window loads
function onLoadHandler() {
  //loading tasks from localStorage
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks.push(...storedTasks); //pushing stored tasks into the tasks array
  }

  addButtonElement.addEventListener("click", addTask); //event listener to the add button

  renderTasks();
}

function renderTasks() {
  taskListElement.innerHTML = "";
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

    taskListElement.appendChild(listItem);
  });
}

function addTask() {
  let newTaskDescription = taskBoxElement.value;
  const newTask = { description: newTaskDescription, done: false };
  tasks.push(newTask);
  saveTasks();
  taskBoxElement.value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

window.addEventListener("load", onLoadHandler);
