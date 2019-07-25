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

let currentFilter = "All";

renderTodo();

filters.addEventListener('click', changeFilter, false);

function removeTodo(id) {
	let arr = [];

	for (let i = 0; i < todos.length; i++) {
		if (todos[i].id === id) continue;

		arr.push(todos[i]);
	}

	todos = arr;
	renderTodo(currentFilter);
}

function changeTodo(id) {
	for (let i = 0; i < todos.length; i++) {
		if (todos[i].id === id) {
			todos[i].completed = !todos[i].completed;
			renderTodo(currentFilter);
			break;
		}
	}
}

// TODO: считает count для входного массива, а не основного todos (один из выходов изменение todos и использование reduce)
// TODO: сделать ф. для изменения слова 'задач'
function renderTodo(filter) {
	let count = 0;
	let arr;
	todoList.innerHTML = "";

	arr = filterTodo(filter);
	console.log(arr);
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

	footer.style.display = todos.length > 0 ? 'flex' : 'none';
	todoCount.innerHTML = count + ' задач осталось';
	btnClear.style.visibility = count < arr.length ? 'visible' : 'hidden';
}

// TODO: валидация ввода (пробелы, html, ...)
function addTodo(e, input) {
	if (e.keyCode !== 13) return;

	let obj = {
		id: todos.length + 1,
		todo: input.value,
		completed: false
	};

	todos.push(obj);
	input.value = "";
	renderTodo(currentFilter);
}

function clearCompleted() {
	// Получаем незавершенные для замены массива
	let arr = filterCompleted(false);

	todos = arr;

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
	let arr;
	switch(filter){
		case 'Active':
			arr = filterCompleted(false);
			break;
		case 'Completed':
			arr = filterCompleted(true);
			break;
		default:
			arr = todos;
	}
	return arr;
}

function filterCompleted(flag){
	let arr = [];

	arr = todos.filter(function(item){
		return item.completed === flag;
	});

	return arr;
}