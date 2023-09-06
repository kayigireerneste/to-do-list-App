const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText !== '') {
    const li = createTaskElement(taskText, taskDate);

    taskList.appendChild(li);

    taskInput.value = '';
    dateInput.value = '';
  }
}

function createTaskElement(taskText, taskDate) {
  const li = document.createElement('li');
  li.classList.add('task-item');

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');

  const taskTextElement = document.createElement('h3');
  taskTextElement.textContent = taskText;
  taskTextElement.classList.add('task-text');

  const taskDateElement = document.createElement('h3');
  taskDateElement.textContent = taskDate;
  taskDateElement.classList.add('task-date');

  const editButton = document.createElement('span');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit');
  editButton.addEventListener('click', editTask);

  const deleteButton = document.createElement('span');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', deleteTask);

  taskContainer.appendChild(taskTextElement);
  taskContainer.appendChild(taskDateElement);
  li.appendChild(taskContainer);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}

function editTask(event) {
  const listItem = event.target.parentNode;
  const taskTextElement = listItem.querySelector('.task-text');
  const taskDateElement = listItem.querySelector('.task-date');
  const editButton = listItem.querySelector('.edit');

  const isEditing = listItem.classList.contains('editing');

  if (isEditing) {
    const newTaskText = taskTextElement.firstChild.value;
    const newTaskDate = taskDateElement.firstChild.value;

    taskTextElement.textContent = newTaskText;
    taskDateElement.textContent = newTaskDate;
    editButton.textContent = 'Edit';

    listItem.classList.remove('editing');
  } else {
    const taskText = taskTextElement.textContent;
    const taskDate = taskDateElement.textContent;

    taskTextElement.innerHTML = '<input type="text" value="' + taskText + '">';
    taskDateElement.innerHTML = '<input type="date" value="' + taskDate + '">';
    editButton.textContent = 'Save';

    listItem.classList.add('editing');
  }
}

function deleteTask(event) {
  const listItem = event.target.parentNode;
  taskList.removeChild(listItem);
}