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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template */ \"./src/template.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\n\nvar store = new _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('todos');\nvar template = new _template__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar newTodo = document.querySelector('input[name=\"new-todo\"]');\nvar todoList = document.querySelector('.todo-list');\nvar footer = document.querySelector('.footer');\nvar todoCount = document.querySelector('.todo-count');\nvar filters = document.querySelector('.filters');\nvar btnClear = document.querySelector('.clear-completed');\nvar currentFilter = \"All\";\nrenderTodo(); //\tListeners of listItem\n\nObject(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"delegateListener\"])(todoList, '.toggle', 'change', handleChangeTodo);\nObject(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"delegateListener\"])(todoList, 'label', 'dblclick', handleEditTodo);\nObject(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"delegateListener\"])(todoList, '.edit-todo', 'change', handleSaveEdited);\nObject(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"delegateListener\"])(todoList, '.edit-todo', 'blur', handleSaveEdited, true);\nObject(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"delegateListener\"])(todoList, '.destroy', 'click', handleRemoveTodo); // Handlers\n\nnewTodo.addEventListener('keypress', handleAddTodo, false);\nfilters.addEventListener('click', changeFilter, false);\nbtnClear.addEventListener('click', handleClearCompleted, false);\n\nfunction handleRemoveTodo() {\n  store.remove({\n    id: Number(this.dataset.todoid)\n  });\n  renderTodo(currentFilter);\n}\n\nfunction handleChangeTodo() {\n  store.update({\n    id: Number(this.dataset.todoid),\n    completed: this.checked\n  });\n  renderTodo(currentFilter);\n}\n\nfunction renderTodo(filter) {\n  var arr = filterTodo(filter);\n  todoList.innerHTML = template.todoList(arr);\n  store.count(function (all, active, completed) {\n    footer.style.display = all > 0 ? 'flex' : 'none';\n    todoCount.innerHTML = template.itemCounter(active);\n    btnClear.style.visibility = completed > 0 ? 'visible' : 'hidden';\n  });\n}\n\nfunction handleAddTodo(e) {\n  if (e.keyCode !== 13) return;\n  var todoText = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"escapeForHTML\"])(this.value);\n  if (todoText === '') return;\n  var obj = {\n    id: new Date().getTime(),\n    todo: todoText,\n    completed: false\n  };\n  store.insert(obj);\n  this.value = \"\";\n  renderTodo(currentFilter);\n}\n\nfunction handleClearCompleted() {\n  store.remove({\n    completed: true\n  });\n  renderTodo(currentFilter);\n}\n\nfunction changeFilter() {\n  var target = event.target.closest('li');\n  if (target === null) return;\n  var oldSelect = document.querySelector('.filters .selected');\n  oldSelect.classList.toggle('selected');\n  target.classList.toggle('selected');\n  currentFilter = target.textContent;\n  renderTodo(currentFilter);\n}\n\nfunction filterTodo(filter) {\n  var result;\n\n  switch (filter) {\n    case 'Active':\n      store.find({\n        completed: false\n      }, function (res) {\n        result = res;\n      });\n      break;\n\n    case 'Completed':\n      store.find({\n        completed: true\n      }, function (res) {\n        result = res;\n      });\n      break;\n\n    default:\n      store.find({}, function (res) {\n        return result = res;\n      });\n  }\n\n  return result;\n}\n\nfunction handleEditTodo(e) {\n  var input = e.target.nextElementSibling;\n  input.style.display = \"block\";\n  input.focus();\n}\n\nfunction handleSaveEdited() {\n  var todoText = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"escapeForHTML\"])(this.value);\n  if (todoText === '') return;\n  store.update({\n    id: Number(this.dataset.todoid),\n    todo: todoText\n  });\n  this.style.display = \"none\";\n  renderTodo(currentFilter);\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: delegateListener, escapeForHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delegateListener\", function() { return delegateListener; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"escapeForHTML\", function() { return escapeForHTML; });\nfunction delegateListener(target, selector, type, handler, capture) {\n  var cb = function cb(event) {\n    var targetElement = event.target;\n    var potentialElements = target.querySelectorAll(selector);\n    var i = potentialElements.length;\n\n    while (i--) {\n      if (potentialElements[i] === targetElement) {\n        handler.call(targetElement, event);\n        break;\n      }\n    }\n  };\n\n  target.addEventListener(type, cb, !!capture);\n}\nfunction escapeForHTML(text) {\n  text = text.trim();\n  var map = {\n    '&': '&amp;',\n    '<': '&lt;',\n    '>': '&gt;',\n    '\"': '&quot;',\n    \"'\": '&#039;'\n  };\n  return text.replace(/[&<>'\"]/g, function (n) {\n    return map[n];\n  });\n}\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Store; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Store =\n/*#__PURE__*/\nfunction () {\n  function Store(name) {\n    _classCallCheck(this, Store);\n\n    var localStorage = window.localStorage;\n    var liveTodos;\n\n    this.getLocalStorage = function () {\n      return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');\n    };\n\n    this.setLocalStorage = function (todos) {\n      liveTodos = todos;\n      localStorage.setItem(name, JSON.stringify(liveTodos));\n    };\n  }\n\n  _createClass(Store, [{\n    key: \"insert\",\n    value: function insert(item) {\n      var todos = this.getLocalStorage();\n      todos.push(item);\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"update\",\n    value: function update(newItem) {\n      var id = newItem.id;\n      var todos = this.getLocalStorage();\n\n      for (var i = 0; i < todos.length; i++) {\n        if (todos[i].id === id) {\n          for (var key in newItem) {\n            todos[i][key] = newItem[key];\n          }\n\n          break;\n        }\n      }\n\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"remove\",\n    value: function remove(query) {\n      var todos = this.getLocalStorage().filter(function (todo) {\n        for (var key in query) {\n          if (query[key] !== todo[key]) return true;\n        }\n\n        return false;\n      });\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"find\",\n    value: function find(query, cb) {\n      var todos = this.getLocalStorage();\n      var k;\n      cb(todos.filter(function (todo) {\n        for (k in query) {\n          if (query[k] !== todo[k]) {\n            return false;\n          }\n        }\n\n        return true;\n      }));\n    }\n  }, {\n    key: \"count\",\n    value: function count(cb) {\n      this.find({}, function (data) {\n        var total = data.length;\n        var i = total;\n        var completed = 0;\n\n        while (i--) {\n          completed += data[i].completed;\n        }\n\n        cb(total, total - completed, completed);\n      });\n    }\n  }]);\n\n  return Store;\n}();\n\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ }),

/***/ "./src/template.js":
/*!*************************!*\
  !*** ./src/template.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Template; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Template =\n/*#__PURE__*/\nfunction () {\n  function Template() {\n    _classCallCheck(this, Template);\n  }\n\n  _createClass(Template, [{\n    key: \"todoList\",\n    value: function todoList(items) {\n      return items.reduce(function (html, item) {\n        return html + \"\\n\\t\\t\\t<li>\\n\\t\\t\\t\\t<input class=\\\"toggle\\\" type=\\\"checkbox\\\" data-todoid=\\\"\".concat(item.id, \"\\\" \").concat(item.completed ? 'checked' : '', \">\\n\\t\\t\\t\\t<label>\").concat(item.todo, \"</label>\\n\\t\\t\\t\\t<input class=\\\"edit-todo\\\" data-todoId=\\\"\").concat(item.id, \"\\\" name=\\\"edit-todo\\\" value=\\\"\").concat(item.todo, \"\\\"/>\\n\\t\\t\\t\\t<button class=\\\"destroy\\\" data-todoid=\\\"\").concat(item.id, \"\\\">\\xD7</button>\\n\\t\\t\\t</li>\\n\\t\\t\");\n      }, '');\n    }\n  }, {\n    key: \"itemCounter\",\n    value: function itemCounter(active) {\n      return \"\".concat(active, \" \").concat(active === 1 ? 'item' : 'items', \" left\");\n    }\n  }]);\n\n  return Template;\n}();\n\n\n\n//# sourceURL=webpack:///./src/template.js?");

/***/ })

/******/ });