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
	todoList.innerHTML = "";

	let arr = filterTodo(filter);
	
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
		editInput.onchange = handleSaveEdited;

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

	store.count((all, active, completed) => {
		footer.style.display = all > 0 ? 'flex' : 'none';
		todoCount.innerHTML = `${active} ${getWordItem(active)} left`;
		btnClear.style.visibility = completed > 0 ? 'visible' : 'hidden';
	});
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

function filterTodo(filter) {
	let result;
	switch(filter){
		case 'Active':
			store.find({ completed: false }, res => {
				result = res;
			});
			break;
		case 'Completed':
			store.find({ completed: true }, res => {
				result = res;
			});
			break;
		default:
			store.find({}, res => result = res);
	}
	return result;
}

function getWordItem(n) {
	return n === 1 ? 'item': 'items';
}

function handleEditTodo(e) {
	let input = e.target.nextElementSibling;
	input.style.display = "block";
	input.focus();
}

function handleSaveEdited() {
	let todoText = validTodo(this.value);
	if (todoText === '') return;

	store.update({ id: Number(this.dataset.todoid), todo:  todoText});
	
	this.style.display = "none";
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