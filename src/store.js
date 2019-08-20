export default class Store {
	constructor(name) {
		const localStorage = window.localStorage;

		let liveTodos;

		this.getLocalStorage = () => {
			return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
		};

		this.setLocalStorage = (todos) => {
			liveTodos = todos;
			localStorage.setItem(name, JSON.stringify(liveTodos));
		};
	}

	insert(item) {
		const todos = this.getLocalStorage();
		todos.push(item);
		this.setLocalStorage(todos);
	}

	update(newItem) {
		const id = newItem.id;
		const todos = this.getLocalStorage();

		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
				for (let key in newItem) {
					todos[i][key] = newItem[key];
				}
				break;
			}
		}

		this.setLocalStorage(todos);
	}

	remove(query) {
		const todos = this.getLocalStorage().filter(todo => {
			for (let key in query) {
				if (query[key] !== todo[key]) return true;
			}
			return false;
		});

		this.setLocalStorage(todos);
	}

	find(query, cb) {
		const todos = this.getLocalStorage();
		let k;

		cb(todos.filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return false;
				}
			}
			return true;
		}));
	}

	count(cb) {
		this.find({}, data => {
			const total = data.length;

			let i = total;
			let completed = 0;

			while(i--) {
				completed += data[i].completed;
			}
			cb(total, total - completed, completed)
		});
	}
}