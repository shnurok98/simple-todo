import Store from './store.js';

const store = new Store('todos');


let newTodo = document.querySelector('input[name="new-todo"]');
let todoList = document.querySelector('.todo-list');
let footer = document.querySelector('.footer');
let todoCount = document.querySelector('.todo-count');
let filters = document.querySelector('.filters');
let btnClear = document.querySelector('.clear-completed');

let currentFilter = "All";

renderTodo();

// Handlers
newTodo.addEventListener('keypress', handleAddTodo, false);
filters.addEventListener('click', changeFilter, false);
btnClear.addEventListener('click', handleClearCompleted, false);

function handleRemoveTodo() {
	store.remove({ id: Number(this.dataset.todoid) });
	renderTodo(currentFilter);
}

function handleChangeTodo() {
	store.update({
		id: Number(this.dataset.todoid),
		completed: this.checked
	});
	renderTodo(currentFilter);
}

function renderTodo(filter) {
	let todos = store.getAll();
	let count = getCountActive(todos);

	todoList.innerHTML = "";

	let arr = filterTodo(todos, filter);
	
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		let checked = "";

		// if (arr[i].completed === true) checked = 'checked';

		// So bad code...
		let toggle = document.createElement('input');
		toggle.className = 'toggle';
		toggle.type = 'checkbox';
		if (arr[i].completed === true) toggle.checked = true;
		toggle.setAttribute('data-todoId', arr[i].id);
		toggle.onchange = handleChangeTodo;

		let label = document.createElement('label');
		label.innerHTML = `${arr[i].todo}`;
		label.ondblclick = handleEditTodo;

		let editInput = document.createElement('input');
		editInput.className = 'edit-todo';
		editInput.name = 'edit-todo';
		editInput.setAttribute('data-todoId', arr[i].id);
		editInput.value = `${arr[i].todo}`;
		editInput.onkeypress = handleSaveTodo;
		editInput.onblur = handleBlurInTodo;

		let destroyBtn = document.createElement('button');
		destroyBtn.className = 'destroy';
		destroyBtn.setAttribute('data-todoId', arr[i].id);
		destroyBtn.innerHTML = `×`;
		destroyBtn.onclick = handleRemoveTodo;

		// li.innerHTML = `
		// 	<input class="toggle" type="checkbox" ${checked} onchange="changeTodo(${arr[i].id})">
		// 	<label ondblclick="editTodo(event)">${arr[i].todo}</label>
		// 	<input class="edit-todo" onkeypress="saveTodo(event, this)" onblur="blurInTodo(this)" data-todoId="${arr[i].id}" type="text" name="edit-todo" value="${arr[i].todo}"/>
		// 	<button class="destroy" onclick="removeTodo(${arr[i].id})">×</button>
		// `;

		li.append(toggle, label, editInput, destroyBtn);

		todoList.appendChild(li);

	}

	footer.style.display = todos.length > 0 ? 'flex' : 'none';
	todoCount.innerHTML = `${count} ${getWordItem(count)} left`;
	btnClear.style.visibility = count < todos.length ? 'visible' : 'hidden';
}

function handleAddTodo(e) {
	if (e.keyCode !== 13) return;

	let todoText = validTodo(this.value);
	if (todoText === '') return;

	let obj = {
		id: new Date().getTime(),
		todo: todoText,
		completed: false
	};

	store.insert(obj);

	this.value = "";
	renderTodo(currentFilter);
}

function handleClearCompleted() {
	store.remove({ completed: true });

	renderTodo(currentFilter);
}

function changeFilter(){
	let target = event.target.closest('li');
	if (target === null) return;

	let oldSelect = document.querySelector('.filters .selected');
	oldSelect.classList.toggle('selected');
	
	target.classList.toggle('selected');
	currentFilter = target.textContent;

	renderTodo(currentFilter);
}

function filterTodo(arr, filter) {
	let result;
	switch(filter){
		case 'Active':
			result = filterCompleted(arr, false);
			break;
		case 'Completed':
			result = filterCompleted(arr, true);
			break;
		default:
			result = arr;
	}
	return result;
}

function filterCompleted(arr, flag){
	let result = [];

	result = arr.filter(item => {
		return item.completed === flag;
	});

	return result;
}

function getCountActive(arr) {
	let count = 0;

	arr.forEach((item) => {
		if (item.completed === false) count++;
	})

	return count;
}

function getWordItem(n) {
	return n === 1 ? 'item': 'items';
}

function handleEditTodo(e) {
	let input = e.target.nextElementSibling;
	input.style.display = "block";
	input.focus();
}

function handleSaveTodo(e) {
	if (e.keyCode !== 13) return;
	
	saveEdited(this);
}

function handleBlurInTodo() {
	saveEdited(this);
}

function saveEdited(input) {
	let todoText = validTodo(input.value);
	if (todoText === '') return;

	store.update({ id: Number(input.dataset.todoid), todo:  todoText});
	
	input.style.display = "none";
	renderTodo(currentFilter);
}

function validTodo(text) {
	text = text.trim();

	let map = {
		'&': '&amp;',
   	'<': '&lt;',
   	'>': '&gt;',
   	'"': '&quot;',
   	"'": '&#039;'
	};

	return text.replace(/[&<>'"]/g, function(n) { return map[n]; });
}