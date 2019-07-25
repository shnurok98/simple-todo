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

filters.addEventListener('click', changeFilter, false);

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

// TODO: считает count для входного массива, а не основного todos (один из выходов изменение todos и использование reduce)
// TODO: показывает кнопку clr при completed = 0 (после того как она уже срабатывала)
// TODO: сделать ф. для изменения слова 'задач'
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

	footer.style.display = todos.length > 0 ? 'flex' : 'none';
	todoCount.innerHTML = count + ' задач осталось';
	btnClear.style.visibility = count < todos.length ? 'visible' : 'hidden';
}

// TODO: валидация ввода (пустой, html...)
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

// TODO: при вызове использует (и далее подгружает) основной массив и не учитывает фильтр
function clearCompleted() {
	// Получаем незавершенные для замены массива
	let arr = filterTodo(false);

	todos = arr;

	renderTodo(todos);
}

function changeFilter(){
	let target = event.target.closest('li');
	if (target === null) return;

	let oldSelect = document.querySelector('.filters .selected');
	oldSelect.classList.toggle('selected');
	
	target.classList.toggle('selected');

	switch(target.textContent){
		case 'All':
			renderTodo(todos);
			break;
		case 'Active':
			renderTodo(filterTodo(false));
			break;
		case 'Completed':
			renderTodo(filterTodo(true));
			break;
	}
}

function filterTodo(flag){
	let arr = [];

	arr = todos.filter(function(item){
		return item.completed === flag;
	});

	return arr;
}