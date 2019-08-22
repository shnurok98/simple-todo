import Store from './store';
import View from './view';
import { escapeForHTML } from './helpers';

export default class Controller {
	constructor(store, view) {
		this.store = store;
		this.view = view;
		this._activeFilter = 'All';
		this._lastActiveFilter = null;

		view.bindChangeFilter(this.setView.bind(this));
		view.bindAddItem(this.addItem.bind(this));
		view.bindRemoveCompleted(this.removeCompletedItems.bind(this));
		view.bindRemoveItem(this.removeItem.bind(this));
		view.bindToggleItem(this.toggleCompleted.bind(this));
		view.bindEditItemSave(this.editItemSave.bind(this));
	}

	setView(filter) {
		this.view.updateFilterButtons(filter);
		this._activeFilter = filter;
		this._filter();
	}

	addItem(todo) {
		this.store.insert({
			id: new Date().getTime(),
			todo: escapeForHTML(todo),
			completed: false
		}, () => {
			this.view.clearNewTodo();
			this._filter(true);
		});
	}

	editItemSave(id, todo) {
		if (todo.length) {
			this.store.update({
				id: id,
				todo: escapeForHTML(todo)
			}, () => {
				this.view.editItemDone(id, todo);
			});
		} else {
			this.removeItem(id);
		}
	}

	removeItem(id) {
		this.store.remove({ id }, () => {
			this._filter();
			this.view.removeItem(id);
		});
	}

	removeCompletedItems() {
		this.store.remove({ completed: true }, () => {
			this._filter(true);
		});
	}

	toggleCompleted(id, completed) {
		this.store.update({ id, completed }, () => {
			this.view.setItemComplete(id, completed);
			this._filter();
		});
	}

	_filter(force) {
		const filter = this._activeFilter;

		if (force || this._lastActiveFilter !== 'All' || this._lastActiveFilter !== filter) {
			this.store.find({
				'All': {},
				'Active': { completed: false },
				'Completed': { completed: true }
			}[filter], this.view.showItems.bind(this.view));
		}

		this.store.count((all, active, completed) => {
			this.view.setFooterVisibility(all);
			this.view.setItemsCounter(active);
			this.view.setClearButtonVisibility(completed);
		});

		this._lastActiveFilter = filter;
	}
}