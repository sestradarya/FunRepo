const inputEl = document.getElementById("main-input")
const addBtn = document.getElementById("add-button")
const tasksEl = document.getElementById("tasks")
const clearBtn = document.getElementById("clear-button")


async function addTask() {
    const taskText = inputEl.value;
    const id = await getRandomId();
    const taskObj = {
        id: id,
        text: taskText,
        isChecked: false
    }

    if (taskText) {
        addToLS(taskObj);
        renderTasks();

    }
    inputEl.value = ''

}

tasksEl.addEventListener('click', (event) => {
    const targetEl = event.target
    const parentEl = targetEl.parentElement
    const id = parentEl.getAttribute('taskid')

    if (targetEl.className === 'checkbox') {
        if (targetEl.checked) {
            changeCheckedInLS(id)
            renderTasks()
        }
        else {
            changeCheckedInLS(id)
            renderTasks()
        }
    }
    if (targetEl.className === 'delete-button') {
        removeFromLS(id);
        renderTasks()
    }

})


function renderTasks() {
    tasksEl.innerHTML = ''


    let list = getFromLS()


    if (list === null) { tasksEl.innerHTML = '<hr>'; localStorage.setItem('taskList', JSON.stringify([])); }

    list = getFromLS();
    for (obj of list) {
        tasksEl.innerHTML += `
            <div class="task" taskid = "${obj.id}" >
                <button class="delete-button">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <input class="checkbox" type="checkbox" ${obj.isChecked && 'checked'}>
                <p class="task-text" style="${obj.isChecked && "text-decoration: line-through; color: #DE6262;"}">${obj.text}</p>
            </div>
            <hr>
        `
    }
}


function addToLS(task) {
    const list = getFromLS()
    localStorage.setItem('taskList', JSON.stringify([...list, task]))
}

function getFromLS() {
    return JSON.parse(localStorage.getItem('taskList'))
}

function changeCheckedInLS(id) {
    const list = getFromLS()
    const newList = []
    for (let el of list) {
        el.id !== id ?
            newList.push(el) :
            newList.push({ ...el, isChecked: !el.isChecked })
    }
    localStorage.setItem('taskList', JSON.stringify(newList))
}

function removeFromLS(taskId) {
    const list = getFromLS()
    const newList = []
    for (let el of list) {
        el.id !== taskId && newList.push(el)
    }
    localStorage.setItem('taskList', JSON.stringify(newList))
}

async function getRandomId() {
    const res = await fetch('https://www.uuidtools.com/api/generate/v1');
    const data = await res.json();
    return data[0]
}

addBtn.addEventListener('click', () => {
    addTask()
})

clearBtn.addEventListener('click', () => {
    tasksEl.innerHTML = `<hr>`
    localStorage.setItem('taskList', JSON.stringify([]))
})

renderTasks()


// bugs:
// pressing a delete button working not only on the whole button
