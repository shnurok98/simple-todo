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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./src/store.js\");\n\nvar store = new _store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('todos');\nvar newTodo = document.querySelector('input[name=\"new-todo\"]');\nvar todoList = document.querySelector('.todo-list');\nvar footer = document.querySelector('.footer');\nvar todoCount = document.querySelector('.todo-count');\nvar filters = document.querySelector('.filters');\nvar btnClear = document.querySelector('.clear-completed');\nvar currentFilter = \"All\";\nrenderTodo(); // Handlers\n\nnewTodo.addEventListener('keypress', handleAddTodo, false);\nfilters.addEventListener('click', changeFilter, false);\nbtnClear.addEventListener('click', handleClearCompleted, false);\n\nfunction handleRemoveTodo() {\n  store.remove({\n    id: Number(this.dataset.todoid)\n  });\n  renderTodo(currentFilter);\n}\n\nfunction handleChangeTodo() {\n  store.update({\n    id: Number(this.dataset.todoid),\n    completed: this.checked\n  });\n  renderTodo(currentFilter);\n}\n\nfunction renderTodo(filter) {\n  todoList.innerHTML = \"\";\n  var arr = filterTodo(filter);\n\n  for (var i = 0; i < arr.length; i++) {\n    var li = document.createElement('li');\n    var checked = \"\"; // if (arr[i].completed === true) checked = 'checked';\n    // So bad code...\n\n    var toggle = document.createElement('input');\n    toggle.className = 'toggle';\n    toggle.type = 'checkbox';\n    if (arr[i].completed === true) toggle.checked = true;\n    toggle.setAttribute('data-todoId', arr[i].id);\n    toggle.onchange = handleChangeTodo;\n    var label = document.createElement('label');\n    label.innerHTML = \"\".concat(arr[i].todo);\n    label.ondblclick = handleEditTodo;\n    var editInput = document.createElement('input');\n    editInput.className = 'edit-todo';\n    editInput.name = 'edit-todo';\n    editInput.setAttribute('data-todoId', arr[i].id);\n    editInput.value = \"\".concat(arr[i].todo);\n    editInput.onchange = handleSaveEdited;\n    var destroyBtn = document.createElement('button');\n    destroyBtn.className = 'destroy';\n    destroyBtn.setAttribute('data-todoId', arr[i].id);\n    destroyBtn.innerHTML = \"\\xD7\";\n    destroyBtn.onclick = handleRemoveTodo; // li.innerHTML = `\n    // \t<input class=\"toggle\" type=\"checkbox\" ${checked} onchange=\"changeTodo(${arr[i].id})\">\n    // \t<label ondblclick=\"editTodo(event)\">${arr[i].todo}</label>\n    // \t<input class=\"edit-todo\" onkeypress=\"saveTodo(event, this)\" onblur=\"blurInTodo(this)\" data-todoId=\"${arr[i].id}\" type=\"text\" name=\"edit-todo\" value=\"${arr[i].todo}\"/>\n    // \t<button class=\"destroy\" onclick=\"removeTodo(${arr[i].id})\">×</button>\n    // `;\n\n    li.append(toggle, label, editInput, destroyBtn);\n    todoList.appendChild(li);\n  }\n\n  store.count(function (all, active, completed) {\n    footer.style.display = all > 0 ? 'flex' : 'none';\n    todoCount.innerHTML = \"\".concat(active, \" \").concat(getWordItem(active), \" left\");\n    btnClear.style.visibility = completed > 0 ? 'visible' : 'hidden';\n  });\n}\n\nfunction handleAddTodo(e) {\n  if (e.keyCode !== 13) return;\n  var todoText = validTodo(this.value);\n  if (todoText === '') return;\n  var obj = {\n    id: new Date().getTime(),\n    todo: todoText,\n    completed: false\n  };\n  store.insert(obj);\n  this.value = \"\";\n  renderTodo(currentFilter);\n}\n\nfunction handleClearCompleted() {\n  store.remove({\n    completed: true\n  });\n  renderTodo(currentFilter);\n}\n\nfunction changeFilter() {\n  var target = event.target.closest('li');\n  if (target === null) return;\n  var oldSelect = document.querySelector('.filters .selected');\n  oldSelect.classList.toggle('selected');\n  target.classList.toggle('selected');\n  currentFilter = target.textContent;\n  renderTodo(currentFilter);\n}\n\nfunction filterTodo(filter) {\n  var result;\n\n  switch (filter) {\n    case 'Active':\n      store.find({\n        completed: false\n      }, function (res) {\n        result = res;\n      });\n      break;\n\n    case 'Completed':\n      store.find({\n        completed: true\n      }, function (res) {\n        result = res;\n      });\n      break;\n\n    default:\n      store.find({}, function (res) {\n        return result = res;\n      });\n  }\n\n  return result;\n}\n\nfunction getWordItem(n) {\n  return n === 1 ? 'item' : 'items';\n}\n\nfunction handleEditTodo(e) {\n  var input = e.target.nextElementSibling;\n  input.style.display = \"block\";\n  input.focus();\n}\n\nfunction handleSaveEdited() {\n  var todoText = validTodo(this.value);\n  if (todoText === '') return;\n  store.update({\n    id: Number(this.dataset.todoid),\n    todo: todoText\n  });\n  this.style.display = \"none\";\n  renderTodo(currentFilter);\n}\n\nfunction validTodo(text) {\n  text = text.trim();\n  var map = {\n    '&': '&amp;',\n    '<': '&lt;',\n    '>': '&gt;',\n    '\"': '&quot;',\n    \"'\": '&#039;'\n  };\n  return text.replace(/[&<>'\"]/g, function (n) {\n    return map[n];\n  });\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Store; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Store =\n/*#__PURE__*/\nfunction () {\n  function Store(name) {\n    _classCallCheck(this, Store);\n\n    var localStorage = window.localStorage;\n    var liveTodos;\n\n    this.getLocalStorage = function () {\n      return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');\n    };\n\n    this.setLocalStorage = function (todos) {\n      liveTodos = todos;\n      localStorage.setItem(name, JSON.stringify(liveTodos));\n    };\n  }\n\n  _createClass(Store, [{\n    key: \"insert\",\n    value: function insert(item) {\n      var todos = this.getLocalStorage();\n      todos.push(item);\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"update\",\n    value: function update(newItem) {\n      var id = newItem.id;\n      var todos = this.getLocalStorage();\n\n      for (var i = 0; i < todos.length; i++) {\n        if (todos[i].id === id) {\n          for (var key in newItem) {\n            todos[i][key] = newItem[key];\n          }\n\n          break;\n        }\n      }\n\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"remove\",\n    value: function remove(query) {\n      var todos = this.getLocalStorage().filter(function (todo) {\n        for (var key in query) {\n          if (query[key] !== todo[key]) return true;\n        }\n\n        return false;\n      });\n      this.setLocalStorage(todos);\n    }\n  }, {\n    key: \"find\",\n    value: function find(query, cb) {\n      var todos = this.getLocalStorage();\n      var k;\n      cb(todos.filter(function (todo) {\n        for (k in query) {\n          if (query[k] !== todo[k]) {\n            return false;\n          }\n        }\n\n        return true;\n      }));\n    }\n  }, {\n    key: \"count\",\n    value: function count(cb) {\n      this.find({}, function (data) {\n        var total = data.length;\n        var i = total;\n        var completed = 0;\n\n        while (i--) {\n          completed += data[i].completed;\n        }\n\n        cb(total, total - completed, completed);\n      });\n    }\n  }]);\n\n  return Store;\n}();\n\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ });