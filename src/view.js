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

		delegateListener(this.todoList, 'label', 'dblclick', ({ target }) => {
			this.editItem(target.nextElementSibling);
		});
	}

	showItems(items) {
		this.todoList.innerHTML = this.template.itemList(items);
	}

	editItem(target) {
		target.style.display = "block";
		target.focus();
	}

	removeItem(id) {
		const listItem = this.todoList.querySelector(`[data-todoid="${id}"]`);
		
		if (listItem) {
			this.todoList.removeChild(listItem.parentElement);
		}
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

	updateFilterButtons(filter) {
		this.filters.querySelector('.selected').classList.toggle('selected');
		this.filters.querySelector(`[data-filter="${filter}"]`).classList.toggle('selected');
	}

	clearNewTodo() {
		this.newTodo.value = '';
	}

	setItemComplete(id, completed) {
		this.todoList.querySelector(`.toggle[data-todoid="${id}"]`).checked = completed;
	}

	editItemDone(id, todo) {
		const input = this.todoList.querySelector(`.edit-todo[data-todoid="${id}"]`);
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

	bindChangeFilter(handler) {
		this.filters.addEventListener('click', ({ target }) => {
			const filter = target.closest('li').dataset.filter;
			if (filter) {
				handler(filter);
			}
		}, false);
	}
}