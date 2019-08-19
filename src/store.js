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

	getAll() {
		console.log(this.getLocalStorage());
	}
}