import Store from './store';
import Template from './template';
import { escapeForHTML } from './helpers';
import View from './view';

import Controller from './controller';

const store = new Store('todos');
const template = new Template();
const view = new View(template);

const controller = new Controller(store, view);
controller.setView('All');






let currentFilter = "All";

// renderTodo();

// view.bindAddItem(handleAddTodo);
// view.bindRemoveCompleted(handleClearCompleted);
// view.bindRemoveItem(handleRemoveTodo);
// view.bindToggleItem(handleChangeTodo);
// view.bindEditItemSave(handleSaveEdited);
// view.bindEditItem(handleEditTodo);
// view.bindChangeFilter(handleChangeFilter);

function handleRemoveTodo(id) {
	store.remove({ id: id });
	view.removeItem(id);
	renderTodo(currentFilter);
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
	
	view.showItems(arr);

	store.count((all, active, completed) => {
		view.setFooterVisibility(all > 0);
		view.setItemsCounter(active);
		view.setClearButtonVisibility(completed > 0)
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

	store.update({ id: id, todo: todoText});
	
	view.editItemDone(id, todoText);
	renderTodo(currentFilter);
}