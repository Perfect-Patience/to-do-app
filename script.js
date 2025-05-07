const form = document.querySelector("#form1");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector(".todoList");

//get saved tasks and load them.
let allTasks = retrieveTasks();
getAllTasks(allTasks);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let task = input.value.trim();
  if (task.length > 0) {
    addTask(task);
    saveTasks();
  }
  input.value = "";
  getAllTasks(allTasks);
});

function getAllTasks(tasks) {
  let collection = "";
  tasks.forEach((task, id) => {
    collection += `<li class="task" >
        <input type="checkbox" id="${String(id)}"/>
        <label for="${String(id)}" class="customCheckBox">
                <i class="bi bi-check"></i>
        </label>
        <label class="task-text" for="${String(id)}">${task.text}</label>

            <button class="editBtn"><i class="bi bi-pencil-fill"></i></button>
            <button class="deleteBtn" data-id="${id}"><i class="bi bi-trash"></i></button>
        </li>`;
  });

  taskList.innerHTML = collection;

  const allDeleteButtons = document.querySelectorAll(".deleteBtn");
  allDeleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = e.target.closest("button").getAttribute("data-id");
      deleteTask(taskId);
    });
  });


  const checkBoxes = document.querySelectorAll('input[type="checkbox"');
  checkBoxes.forEach((box) => {
    const id = Number(box.getAttribute("id"));
    if (allTasks[id].completed) {
      box.checked = true;
    }
    box.addEventListener("change", () => {
      allTasks[id].completed = box.checked;
      saveTasks();
    });
  });
}

// functions

function addTask(task) {
  const taskObj = {
    text: task,
    completed: false,
  };
  allTasks.push(taskObj);
}

function saveTasks() {
  const todos = JSON.stringify(allTasks);
  localStorage.setItem("todos", todos);
}

function retrieveTasks() {
  let todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

function deleteTask(taskId) {
  let newTasks = [];

  allTasks.forEach((task, id) => {
    if (taskId != String(id)) {
      newTasks.push(task);
    }
  });

  allTasks = newTasks;
  saveTasks();
  getAllTasks(allTasks);
}

