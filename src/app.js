import Store from './store';
import Template from './template';
import { delegateListener, escapeForHTML } from './helpers'

const store = new Store('todos');
const template = new Template();

let newTodo = document.querySelector('input[name="new-todo"]');
let todoList = document.querySelector('.todo-list');
let footer = document.querySelector('.footer');
let todoCount = document.querySelector('.todo-count');
let filters = document.querySelector('.filters');
let btnClear = document.querySelector('.clear-completed');

let currentFilter = "All";

renderTodo();

//	Listeners of listItem
delegateListener(todoList, '.toggle', 'change', handleChangeTodo);
delegateListener(todoList, 'label', 'dblclick', handleEditTodo);
delegateListener(todoList, '.edit-todo', 'change', handleSaveEdited);
delegateListener(todoList, '.edit-todo', 'blur', handleSaveEdited, true);
delegateListener(todoList, '.destroy', 'click', handleRemoveTodo);

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
	let arr = filterTodo(filter);
	
	todoList.innerHTML = template.todoList(arr);

	store.count((all, active, completed) => {
		footer.style.display = all > 0 ? 'flex' : 'none';
		todoCount.innerHTML = template.itemCounter(active);
		btnClear.style.visibility = completed > 0 ? 'visible' : 'hidden';
	});
}

function handleAddTodo(e) {
	if (e.keyCode !== 13) return;

	let todoText = escapeForHTML(this.value);
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

function handleEditTodo(e) {
	let input = e.target.nextElementSibling;
	input.style.display = "block";
	input.focus();
}

function handleSaveEdited() {
	let todoText = escapeForHTML(this.value);
	if (todoText === '') return;

	store.update({ id: Number(this.dataset.todoid), todo:  todoText});
	
	this.style.display = "none";
	renderTodo(currentFilter);
}