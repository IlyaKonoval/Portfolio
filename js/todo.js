const taskForm = document.getElementById('task-form');
const listContainer = document.getElementById("task-list")
const taskCount = document.getElementById("task-count");
const completedCount = document.getElementById("completed-count");

function showToast(message, type = 'error') {

    if (document.getElementById("toast-container").hasChildNodes("toastik")) {
        return;
    }

    const toast = document.createElement('div');
    toast.className = "toastik"
    toast.className = `
    ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
    text-white p-4 rounded-lg shadow-lg opacity-90 transition duration-300 mb-4
    `;
    toast.innerText = message;

    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function updateCounts() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.crossed");
    taskCount.textContent = allTasks.length;
    completedCount.textContent = completedTasks.length;
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("crossed");
        saveContent();
        updateCounts();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveContent();
        updateCounts();
    }
}, false);

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputBox = document.getElementById('input-box');
    if (inputBox.value === '') {
        showToast('empty task', 'error');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveContent();
    updateCounts();
});

function saveContent() {
    localStorage.setItem("content", listContainer.innerHTML);
}

function displayContent() {
    listContainer.innerHTML = localStorage.getItem("content");
    updateCounts();
}

displayContent();