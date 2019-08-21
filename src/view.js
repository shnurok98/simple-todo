import Template from './template';
import { delegateListener } from './helpers';

export default class View {
	constructor(template) {
		this.template = template;
		this.newTodo = document.querySelector('input[name="new-todo"]');
		this.todoList = document.querySelector('.todo-list');
		this.footer = document.querySelector('.footer');
		this.todoCount = document.querySelector('.todo-count');
		this.filters = document.querySelector('.filters');
		this.btnClear = document.querySelector('.clear-completed');
	}

	showItems(items) {
		this.todoList.innerHTML = this.template.itemList(items);
	}

	editItem(target) {
		target.style.display = "block";
		target.focus();
	}

	removeItem(id) {
		const listItem = document.querySelector(`[data-todoid="${id}"]`).parentElement;
		this.todoList.removeChild(listItem);
	}

	setItemsCounter(count) {
		this.todoCount.innerHTML = this.template.itemCounter(count);
	}

	setClearButtonVisibility(visible) {
		this.btnClear.style.visibility = !!visible ? 'visible' : 'hidden';
	}

	setFooterVisibility(visible) {
		this.footer.style.display = !!visible ? 'flex' : 'none';
	}

	updateFilterButtons(target) {
		// let target = event.target.closest('li');
		// if (target === null) return;
		document.querySelector('.filters .selected').classList.toggle('selected');
		target.classList.toggle('selected');
	}

	clearNewTodo() {
		this.newTodo.value = '';
	}

	setItemComplete(id, completed) {
		document.querySelector(`.toggle[data-todoid="${id}"]`).checked = completed;
	}

	editItemDone(id, todo) {
		const input = document.querySelector(`.edit-todo[data-todoid="${id}"]`);
		input.previousElementSibling.textContent = todo;
		input.style.display = "none";
	}


	bindAddItem(handler) {
		this.newTodo.addEventListener('change', ({ target }) => {
			const todo = target.value.trim();
			if (todo) {
				handler(todo);
			}
		}, false);
	}

	bindRemoveCompleted(handler) {
		this.btnClear.addEventListener('click', handler, false);
	}

	bindRemoveItem(handler) {
		delegateListener(this.todoList, '.destroy', 'click', ({ target }) => {
			handler(Number(target.dataset.todoid));
		});
	}

	bindToggleItem(handler) {
		delegateListener(this.todoList, '.toggle', 'change', ({ target }) => {
			handler(Number(target.dataset.todoid), target.checked);
		});
	}

	bindEditItemSave(handler) {
		delegateListener(this.todoList, '.edit-todo', 'blur', ({ target }) => {
			handler(Number(target.dataset.todoid), target.value.trim());
		}, true);

		delegateListener(this.todoList, '.edit-todo', 'change', ({ target }) => {
			target.blur();
		});
	}

	bindEditItem(handler) {
		delegateListener(this.todoList, 'label', 'dblclick', ({ target }) => {
			handler(target.nextElementSibling);
		});
	}

	bindChangeFilter(handler) {
		this.filters.addEventListener('click', ({ target }) => {
			const filter = target.closest('li');
			if (filter === null) return;
			handler(filter);
		}, false);
	}
}
// убрал trim() из escapeFromHTML()