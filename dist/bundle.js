'use strict';

var todoList = document.querySelector('.todo-list');
var footer = document.querySelector('.footer');
var todoCount = document.querySelector('.todo-count');
var filters = document.querySelector('.filters');
var btnClear = document.querySelector('.clear-completed');

var currentFilter = "All";

renderTodo();

filters.addEventListener('click', changeFilter, false);

function removeTodo(id) {
	removeData(id);
	renderTodo(currentFilter);
}

function changeTodo(id) {
	var obj = getData(id);
	obj.completed = !obj.completed;
	saveData(id, obj);
	renderTodo(currentFilter);
}

function renderTodo(filter) {
	var todos = getAllData();
	var count = getCountActive(todos);

	todoList.innerHTML = "";

	var arr = filterTodo(todos, filter);

	for (var i = 0; i < arr.length; i++) {
		var li = document.createElement('li');
		var checked = "";

		if (arr[i].completed === true) checked = 'checked';

		li.innerHTML = '\n\t\t\t<input class="toggle" type="checkbox" ' + checked + ' onchange="changeTodo(' + arr[i].id + ')">\n\t\t\t<label ondblclick="editTodo(event)">' + arr[i].todo + '</label>\n\t\t\t<input class="edit-todo" onkeypress="saveTodo(event, this)" onblur="blurInTodo(this)" data-todoId="' + arr[i].id + '" type="text" name="edit-todo" value="' + arr[i].todo + '"/>\n\t\t\t<button class="destroy" onclick="removeTodo(' + arr[i].id + ')">\xD7</button>\n\t\t';

		todoList.appendChild(li);
	}

	footer.style.display = todos.length > 0 ? 'flex' : 'none';
	todoCount.innerHTML = count + ' ' + getWordItem(count) + ' left';
	btnClear.style.visibility = count < todos.length ? 'visible' : 'hidden';
}

function addTodo(e, input) {
	if (e.keyCode !== 13) return;

	var todoText = validTodo(input.value);
	if (todoText === '') return;

	var obj = {
		id: new Date().getTime(),
		todo: todoText,
		completed: false
	};

	saveData(obj.id, obj);
	input.value = "";
	renderTodo(currentFilter);
}

function clearCompleted() {
	var arr = filterCompleted(getAllData(), true);

	arr.forEach(function (item) {
		return removeData(item.id);
	});

	renderTodo(currentFilter);
}

function changeFilter() {
	var target = event.target.closest('li');
	if (target === null) return;

	var oldSelect = document.querySelector('.filters .selected');
	oldSelect.classList.toggle('selected');

	target.classList.toggle('selected');
	currentFilter = target.textContent;

	renderTodo(currentFilter);
}

function filterTodo(arr, filter) {
	var result = void 0;
	switch (filter) {
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

function filterCompleted(arr, flag) {
	var result = [];

	result = arr.filter(function (item) {
		return item.completed === flag;
	});

	return result;
}

function getCountActive(arr) {
	var count = 0;

	arr.forEach(function (item) {
		if (item.completed === false) count++;
	});

	return count;
}

function getWordItem(n) {
	return n === 1 ? 'item' : 'items';
}

function setTodoById(id, todo) {
	setData(id, 'todo', todo);
}

function editTodo(e) {
	var input = e.target.nextElementSibling;
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
	var todoText = validTodo(input.value);
	if (todoText === '') return;

	setTodoById(Number(input.dataset.todoid), todoText);

	input.style.display = "none";
	renderTodo(currentFilter);
}

function validTodo(text) {
	text = text.trim();

	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>'"]/g, function (n) {
		return map[n];
	});
}

function saveData(id, data) {
	localStorage.setItem(String(id), JSON.stringify(data));
}

function getData(id) {
	var obj = JSON.parse(localStorage.getItem(String(id)));
	return obj !== undefined ? obj : null;
}

function getAllData() {
	var arr = [];
	for (var i = 0; i < localStorage.length; i++) {
		arr.push(getData(localStorage.key(i)));
	}
	return arr;
}

function removeData(id) {
	localStorage.removeItem(String(id));
}

function setData(id, key, value) {
	var obj = getData(id);
	obj[key] = value;
	saveData(id, obj);
}
