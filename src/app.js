import Store from './store';
import Template from './template';
import { escapeForHTML } from './helpers';
import View from './view';

const store = new Store('todos');
const template = new Template();
const view = new View(template);


// let newTodo = document.querySelector('input[name="new-todo"]');
// let todoList = document.querySelector('.todo-list');
// let footer = document.querySelector('.footer');
// let todoCount = document.querySelector('.todo-count');
// let filters = document.querySelector('.filters');
// let btnClear = document.querySelector('.clear-completed');

let currentFilter = "All";

renderTodo();

//	Listeners of listItem
// delegateListener(todoList, '.toggle', 'change', handleChangeTodo);
// delegateListener(todoList, 'label', 'dblclick', handleEditTodo);
// delegateListener(todoList, '.edit-todo', 'change', handleSaveEdited);
// delegateListener(todoList, '.edit-todo', 'blur', handleSaveEdited, true);
// delegateListener(todoList, '.destroy', 'click', handleRemoveTodo);

// Handlers
// newTodo.addEventListener('change', handleAddTodo, false);
// filters.addEventListener('click', changeFilter, false);
// btnClear.addEventListener('click', handleClearCompleted, false);

view.bindAddItem(handleAddTodo);
view.bindRemoveCompleted(handleClearCompleted);
view.bindRemoveItem(handleRemoveTodo);
view.bindToggleItem(handleChangeTodo);
view.bindEditItemSave(handleSaveEdited);
view.bindEditItem(handleEditTodo);
view.bindChangeFilter(handleChangeFilter);

function handleRemoveTodo(id) {
	store.remove({ id: id });
	renderTodo(currentFilter);
	view.removeItem(id);
}

function handleChangeTodo(id, completed) {
	store.update({
		id: id,
		completed: completed
	});
	view.setItemComplete(id, completed);
	renderTodo(currentFilter);
}

function renderTodo(filter) {
	let arr = filterTodo(filter);
	
	// todoList.innerHTML = template.itemList(arr);
	view.showItems(arr);

	store.count((all, active, completed) => {
		view.setFooterVisibility(all > 0);
		// footer.style.display = all > 0 ? 'flex' : 'none';
		// todoCount.innerHTML = template.itemCounter(active);
		view.setItemsCounter(active);
		view.setClearButtonVisibility(completed > 0)
		// btnClear.style.visibility = completed > 0 ? 'visible' : 'hidden';
	});
}

function handleAddTodo(todo) {
	let todoText = escapeForHTML(todo);
	if (todoText === '') return;

	let obj = {
		id: new Date().getTime(),
		todo: todoText,
		completed: false
	};

	store.insert(obj);

	view.clearNewTodo();
	renderTodo(currentFilter);
}

function handleClearCompleted() {
	store.remove({ completed: true });

	renderTodo(currentFilter);
}

function handleChangeFilter(target){
	view.updateFilterButtons(target);

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

function handleEditTodo(target) {
	view.editItem(target);
}

function handleSaveEdited(id, todo) {
	let todoText = escapeForHTML(todo);
	if (todoText === '') return;

	store.update({ id: id, todo: todo});
	
	// view.editItemDone(id, todo);
	renderTodo(currentFilter);
}