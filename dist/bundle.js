/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\nvar todoList = document.querySelector('.todo-list');\nvar footer = document.querySelector('.footer');\nvar todoCount = document.querySelector('.todo-count');\nvar filters = document.querySelector('.filters');\nvar btnClear = document.querySelector('.clear-completed');\nvar currentFilter = \"All\";\nrenderTodo();\nfilters.addEventListener('click', changeFilter, false);\n\nfunction removeTodo(id) {\n  removeData(id);\n  renderTodo(currentFilter);\n}\n\nfunction changeTodo(id) {\n  var obj = getData(id);\n  obj.completed = !obj.completed;\n  saveData(id, obj);\n  renderTodo(currentFilter);\n}\n\nfunction renderTodo(filter) {\n  var todos = getAllData();\n  var count = getCountActive(todos);\n  todoList.innerHTML = \"\";\n  var arr = filterTodo(todos, filter);\n\n  for (var i = 0; i < arr.length; i++) {\n    var li = document.createElement('li');\n    var checked = \"\";\n    if (arr[i].completed === true) checked = 'checked';\n    li.innerHTML = \"\\n\\t\\t\\t<input class=\\\"toggle\\\" type=\\\"checkbox\\\" \".concat(checked, \" onchange=\\\"changeTodo(\").concat(arr[i].id, \")\\\">\\n\\t\\t\\t<label ondblclick=\\\"editTodo(event)\\\">\").concat(arr[i].todo, \"</label>\\n\\t\\t\\t<input class=\\\"edit-todo\\\" onkeypress=\\\"saveTodo(event, this)\\\" onblur=\\\"blurInTodo(this)\\\" data-todoId=\\\"\").concat(arr[i].id, \"\\\" type=\\\"text\\\" name=\\\"edit-todo\\\" value=\\\"\").concat(arr[i].todo, \"\\\"/>\\n\\t\\t\\t<button class=\\\"destroy\\\" onclick=\\\"removeTodo(\").concat(arr[i].id, \")\\\">\\xD7</button>\\n\\t\\t\");\n    todoList.appendChild(li);\n  }\n\n  footer.style.display = todos.length > 0 ? 'flex' : 'none';\n  todoCount.innerHTML = \"\".concat(count, \" \").concat(getWordItem(count), \" left\");\n  btnClear.style.visibility = count < todos.length ? 'visible' : 'hidden';\n}\n\nfunction addTodo(e, input) {\n  if (e.keyCode !== 13) return;\n  var todoText = validTodo(input.value);\n  if (todoText === '') return;\n  var obj = {\n    id: new Date().getTime(),\n    todo: todoText,\n    completed: false\n  };\n  saveData(obj.id, obj);\n  input.value = \"\";\n  renderTodo(currentFilter);\n}\n\nfunction clearCompleted() {\n  var arr = filterCompleted(getAllData(), true);\n  arr.forEach(function (item) {\n    return removeData(item.id);\n  });\n  renderTodo(currentFilter);\n}\n\nfunction changeFilter() {\n  var target = event.target.closest('li');\n  if (target === null) return;\n  var oldSelect = document.querySelector('.filters .selected');\n  oldSelect.classList.toggle('selected');\n  target.classList.toggle('selected');\n  currentFilter = target.textContent;\n  renderTodo(currentFilter);\n}\n\nfunction filterTodo(arr, filter) {\n  var result;\n\n  switch (filter) {\n    case 'Active':\n      result = filterCompleted(arr, false);\n      break;\n\n    case 'Completed':\n      result = filterCompleted(arr, true);\n      break;\n\n    default:\n      result = arr;\n  }\n\n  return result;\n}\n\nfunction filterCompleted(arr, flag) {\n  var result = [];\n  result = arr.filter(function (item) {\n    return item.completed === flag;\n  });\n  return result;\n}\n\nfunction getCountActive(arr) {\n  var count = 0;\n  arr.forEach(function (item) {\n    if (item.completed === false) count++;\n  });\n  return count;\n}\n\nfunction getWordItem(n) {\n  return n === 1 ? 'item' : 'items';\n}\n\nfunction setTodoById(id, todo) {\n  setData(id, 'todo', todo);\n}\n\nfunction editTodo(e) {\n  var input = e.target.nextElementSibling;\n  input.style.display = \"block\";\n  input.focus();\n}\n\nfunction saveTodo(e, input) {\n  if (e.keyCode !== 13) return;\n  saveEdited(input);\n}\n\nfunction blurInTodo(input) {\n  saveEdited(input);\n}\n\nfunction saveEdited(input) {\n  var todoText = validTodo(input.value);\n  if (todoText === '') return;\n  setTodoById(Number(input.dataset.todoid), todoText);\n  input.style.display = \"none\";\n  renderTodo(currentFilter);\n}\n\nfunction validTodo(text) {\n  text = text.trim();\n  var map = {\n    '&': '&amp;',\n    '<': '&lt;',\n    '>': '&gt;',\n    '\"': '&quot;',\n    \"'\": '&#039;'\n  };\n  return text.replace(/[&<>'\"]/g, function (n) {\n    return map[n];\n  });\n}\n\nfunction saveData(id, data) {\n  localStorage.setItem(String(id), JSON.stringify(data));\n}\n\nfunction getData(id) {\n  var obj = JSON.parse(localStorage.getItem(String(id)));\n  return obj !== undefined ? obj : null;\n}\n\nfunction getAllData() {\n  var arr = [];\n\n  for (var i = 0; i < localStorage.length; i++) {\n    arr.push(getData(localStorage.key(i)));\n  }\n\n  return arr;\n}\n\nfunction removeData(id) {\n  localStorage.removeItem(String(id));\n}\n\nfunction setData(id, key, value) {\n  var obj = getData(id);\n  obj[key] = value;\n  saveData(id, obj);\n}\n\n\nvar store = new _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('todoss');\nstore.insert({\n  name: 'Alex',\n  age: 10\n});\nstore.getAll();\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Store; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Store =\n/*#__PURE__*/\nfunction () {\n  function Store(name) {\n    _classCallCheck(this, Store);\n\n    var localStorage = window.localStorage;\n    var liveTodos;\n\n    this.getLocalStorage = function () {\n      return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');\n    };\n\n    this.setLocalStorage = function (todos) {\n      liveTodos = todos;\n      localStorage.setItem(name, JSON.stringify(liveTodos));\n    };\n  }\n\n  _createClass(Store, [{\n    key: \"insert\",\n    value: function insert(item) {\n      var todos = this.getLocalStorage();\n      todos.push(item);\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"getAll\",\n    value: function getAll() {\n      console.log(this.getLocalStorage());\n    }\n  }]);\n\n  return Store;\n}();\n\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ });