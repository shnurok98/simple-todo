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

	getAll() {
		return this.getLocalStorage();
	}
}



// function saveData(id, data) { +
// 	localStorage.setItem(String(id), JSON.stringify(data));
// }

// function getData(id) {
// 	let obj = JSON.parse(localStorage.getItem( String(id) ));
// 	return obj !== undefined ? obj: null;
// }

// function getAllData() { +
// 	let arr = [];
// 	for (let i = 0; i < localStorage.length; i++) {
// 		arr.push(getData( localStorage.key(i) ));
// 	}
// 	return arr;
// }

// function removeData(id) { +
// 	localStorage.removeItem( String(id) );
// }

// function setData(id, key, value) { +
// 	let obj = getData(id);
// 	obj[key] = value;
// 	saveData(id, obj);
// }