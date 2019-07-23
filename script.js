let todos = [
	{
		id: 1,
		todo: 'Something to note',
		completed: false
	},
	{
		id: 2,
		todo: 'Something',
		completed: false
	},
	{
		id: 3,
		todo: 'note',
		completed: true
	}
];


let todoList = document.querySelector('.todo-list');
let footer = document.querySelector('.footer');
let todoCount = document.querySelector('.todo-count');
let filters = document.querySelector('.filters');
let btnClear = document.querySelector('.clear-completed');

renderTodo(todos);

// filters.addEventListener();

function removeTodo(id) {
	let arr = [];

	for (let i = 0; i < todos.length; i++) {
		if (todos[i].id === id) continue;

		arr.push(todos[i]);
	}

	todos = arr;
	renderTodo(todos);
}

function changeTodo(id) {
	for (let i = 0; i < todos.length; i++) {
		if (todos[i].id === id) {
			todos[i].completed = !todos[i].completed;
			renderTodo(todos);
			break;
		}
	}
}

function renderTodo(arr) {
	let count = 0;
	todoList.innerHTML = "";

	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		let checked = "";

		if (arr[i].completed === true) {
			checked = 'checked';
		} else {
			count++;
		};

		li.innerHTML = `
			<input class="toggle" type="checkbox" ${checked} onchange="changeTodo(${arr[i].id})">
			<label>${arr[i].todo}</label>
			<button class="destroy" onclick="removeTodo(${arr[i].id})">×</button>
		`;

		todoList.appendChild(li);
	}

	footer.style.display = arr.length > 0 ? 'flex' : 'none';
	todoCount.innerHTML = count + ' задач осталось';
	btnClear.style.visibility = count < arr.length ? 'visible' : 'hidden';
}

function addTodo(e, input) {
	if (e.keyCode !== 13) return;

	let obj = {
		id: todos.length + 1,
		todo: input.value,
		completed: false
	};

	todos.push(obj);
	input.value = "";
	renderTodo(todos);
}

function clearCompleted() {
	let arr = todos.filter(function(item){
		return item.completed !== true;
	})

	todos = arr;

	renderTodo(todos);
}