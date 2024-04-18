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
    tasks.push(...storedTasks); //pushing stored tasks into the tasks array, inspo from ChatGPT
  }

  addButtonElement.addEventListener("click", addTask);

  renderTasks();
}

function renderTasks() {
  //checkbox function, inspo from ChatGPT
  taskListElement.innerHTML = ""; //clear existing task list
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

    //delete button function
    const deleteButton = document.createElement("button"); //delete button for each task
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1); //remove the task from array when delete button is clicked
      saveTasks();
    });
    listItem.appendChild(deleteButton);

    taskListElement.appendChild(listItem);
  });
}

//to add a new task
function addTask() {
  //value of the input
  let newTaskDescription = taskBoxElement.value; //new task object
  const newTask = { description: newTaskDescription, done: false };
  tasks.push(newTask);
  saveTasks();
  taskBoxElement.value = ""; //clear the input after adding the task
}
//to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

//to call onloadhandler function when the window loads
window.addEventListener("load", onLoadHandler);
