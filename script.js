const form = document.querySelector('form');

const input = document.querySelector('#taskInput');
const taskList = document.querySelector('.todoList');
let allTasks = retrieveTasks();
getAllTasks(allTasks);


form.addEventListener('submit', (e) =>{
    e.preventDefault();
     let task = input.value.trim();
    if(task.length > 0){
        addTask(task);
        saveTasks();
    }
    input.value = "";
    getAllTasks(allTasks);
})


function getAllTasks(tasks){
    let collection = "";
    tasks.forEach((task, id) =>{
        collection += `<li class="task" >
        <input type="checkbox" id="${String(id)}"/>
        <label for="${String(id)}" class="customCheckBox">
                <i class="bi bi-check"></i>
        </label>
        <label class="task-text" for="${String(id)}">${task}</label>

            <button><i class="bi bi-pencil-fill"></i></button
            ><button><i class="bi bi-trash"></i></button>
        </li>`
    })

    taskList.innerHTML = collection;
}






function addTask(task){
    allTasks.push(task);


}


function saveTasks(){
    const todos = JSON.stringify(allTasks);
    localStorage.setItem("todos", todos);
}

function retrieveTasks(){
    let todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}



