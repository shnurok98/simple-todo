let todoList = document.querySelector('.todo-list');
let footer = document.querySelector('.footer');
let todoCount = document.querySelector('.todo-count');
let filters = document.querySelector('.filters');
let btnClear = document.querySelector('.clear-completed');

let currentFilter = "All";

renderTodo();

filters.addEventListener('click', changeFilter, false);

function removeTodo(id) {
	removeData(id);
	renderTodo(currentFilter);
}

function changeTodo(id) {
	let obj = getData(id);
	obj.completed = !obj.completed;
	saveData(id, obj);
	renderTodo(currentFilter);
}

function renderTodo(filter) {
	let todos = getAllData();
	let count = getCountActive(todos);

	todoList.innerHTML = "";

	let arr = filterTodo(todos, filter);
	
	for (let i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		let checked = "";

		if (arr[i].completed === true) checked = 'checked';

		li.innerHTML = `
			<input class="toggle" type="checkbox" ${checked} onchange="changeTodo(${arr[i].id})">
			<label ondblclick="editTodo(event)">${arr[i].todo}</label>
			<input class="edit-todo" onkeypress="saveTodo(event, this)" onblur="blurInTodo(this)" data-todoId="${arr[i].id}" type="text" name="edit-todo" value="${arr[i].todo}"/>
			<button class="destroy" onclick="removeTodo(${arr[i].id})">×</button>
		`;

		todoList.appendChild(li);

	}

	footer.style.display = todos.length > 0 ? 'flex' : 'none';
	todoCount.innerHTML = `${count} ${getWordItem(count)} left`;
	btnClear.style.visibility = count < todos.length ? 'visible' : 'hidden';
}

function addTodo(e, input) {
	if (e.keyCode !== 13) return;

	let todoText = validTodo(input.value);
	if (todoText === '') return;

	let obj = {
		id: new Date().getTime(),
		todo: todoText,
		completed: false
	};

	saveData(obj.id, obj);
	input.value = "";
	renderTodo(currentFilter);
}

function clearCompleted() {
	let arr = filterCompleted(getAllData(), true);

	arr.forEach(item => removeData(item.id));

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

function filterTodo(arr, filter) {
	let result;
	switch(filter){
		case 'Active':
			result = filterCompleted(arr, false);
			break;
		case 'Completed':
			result = filterCompleted(arr, true);
			break;
		default:
			result = arr;
	}
	return result;
}

function filterCompleted(arr, flag){
	let result = [];

	result = arr.filter(item => {
		return item.completed === flag;
	});

	return result;
}

function getCountActive(arr) {
	let count = 0;

	arr.forEach((item) => {
		if (item.completed === false) count++;
	})

	return count;
}

function getWordItem(n) {
	return n === 1 ? 'item': 'items';
}

function setTodoById(id, todo) {
	setData(id, 'todo', todo);
}

function editTodo(e) {
	let input = e.target.nextElementSibling;
	input.style.display = "block";
	input.focus();
}

function saveTodo(e, input) {
	if (e.keyCode !== 13) return;
	
	saveEdited(input);
}

function blurInTodo(input) {
	saveEdited(input);
}

function saveEdited(input) {
	let todoText = validTodo(input.value);
	if (todoText === '') return;

	setTodoById(Number(input.dataset.todoid), todoText);
	
	input.style.display = "none";
	renderTodo(currentFilter);
}

function validTodo(text) {
	text = text.trim();

	let map = {
		'&': '&amp;',
   	'<': '&lt;',
   	'>': '&gt;',
   	'"': '&quot;',
   	"'": '&#039;'
	};

	return text.replace(/[&<>'"]/g, function(n) { return map[n]; });
}


function saveData(id, data) {
	localStorage.setItem(String(id), JSON.stringify(data));
}

function getData(id) {
	let obj = JSON.parse(localStorage.getItem( String(id) ));
	return obj !== undefined ? obj: null;
}

function getAllData() {
	let arr = [];
	for (let i = 0; i < localStorage.length; i++) {
		arr.push(getData( localStorage.key(i) ));
	}
	return arr;
}

function removeData(id) {
	localStorage.removeItem( String(id) );
}

function setData(id, key, value) {
	let obj = getData(id);
	obj[key] = value;
	saveData(id, obj);
}