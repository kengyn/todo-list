/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-events.js":
/*!***************************!*\
  !*** ./src/dom-events.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buttonEventListeners": () => (/* binding */ buttonEventListeners),
/* harmony export */   "displayTasks": () => (/* binding */ displayTasks),
/* harmony export */   "projectEventListeners": () => (/* binding */ projectEventListeners),
/* harmony export */   "projectToDOM": () => (/* binding */ projectToDOM),
/* harmony export */   "taskEventListeners": () => (/* binding */ taskEventListeners),
/* harmony export */   "taskToDom": () => (/* binding */ taskToDom)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



// projects

function projectEventListeners() {
  const projectsBtn = document.querySelector(".projects-btn");
  const projectsForm = document.querySelector(".add-project-form");
  const addProjectInput = document.querySelector(".add-project-input");
  const addProjectBtn = document.querySelector(".add-project-btn");
  const cancelProjectBtn = document.querySelector(".cancel-project-btn");

  projectsBtn.addEventListener("click", () => {
    projectsForm.classList.remove("hidden");
    projectsBtn.classList.add("hidden");
  });

  addProjectBtn.addEventListener("click", () => {
    (0,_projects__WEBPACK_IMPORTED_MODULE_0__.projectProcess)(addProjectInput.value);
    addProjectInput.value = "";
    projectsForm.classList.add("hidden");
    projectsBtn.classList.remove("hidden");
  });

  cancelProjectBtn.addEventListener("click", () => {
    addProjectInput.value = "";
    projectsForm.classList.add("hidden");
    projectsBtn.classList.remove("hidden");
  });
}

function buttonEventListeners() {
  document.addEventListener("click", (e) => {
    let element = e.target;
    if (element.classList.contains("kill-project")) {
      deleteProject(e);
    }
    if (element.classList.contains("project-name")) {
      selectProject(element);
    }
    if (element.classList.contains("expand-btn")) {
      expandTask(element);
    }
    if (element.classList.contains("delete-btn")) {
      deleteTask(e);
    }
    if (element.classList.contains("edit-task-btn")) {
      addEditForm(e);
    }
    if (element.classList.contains("edit-confirm-btn")) {
      (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.confirmEditTask)(e);
    }
    if (element.classList.contains("edit-cancel-btn")) {
      (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.cancelEditTask)(e);
    }
    if (element.classList.contains("check-task")) {
      (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.completeTask)(e);
    }
  });
}

function deleteProject(e) {
  let dataNum = e.composedPath()[1].dataset.num;
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectList.splice(dataNum, 1);
  e.target.parentElement.remove();
  resetDomDataNum();
  (0,_projects__WEBPACK_IMPORTED_MODULE_0__.resetDataNum)();
  const AllTasksContainer = document.querySelector(".all-tasks-container");
  AllTasksContainer.replaceChildren();
}

const projectToDOM = (dataNum, Name) => {
  const projectContainer = document.querySelector(".project-container");
  let projectObj = document.createElement("div");
  let projectImg = document.createElement("img");
  let projectName = document.createElement("p");
  let projectBtn = document.createElement("button");

  clearSelected();

  projectObj.classList.add("project-obj");
  projectObj.classList.add("selected");
  projectObj.dataset.num = dataNum;
  projectImg.src = "./images/format-list-bulleted-square.png";
  projectImg.classList.add("project-name");
  projectName.textContent = Name;
  projectName.classList.add("project-name");
  projectBtn.classList.add("kill-project");

  projectObj.appendChild(projectImg);
  projectObj.appendChild(projectName);
  projectObj.appendChild(projectBtn);

  projectContainer.appendChild(projectObj);

  displayTasks(dataNum);
};

const resetDomDataNum = () => {
  let domData = document.querySelectorAll("[data-num]");
  for (let data of domData) {
    data.dataset.num = Array.prototype.indexOf.call(domData, data);
  }
};

function clearSelected() {
  const projects = document.querySelectorAll(".project-name");
  for (let project of projects) {
    if (project.parentElement.classList.contains("selected")) {
      project.parentElement.classList.remove("selected");
    }
  }
}
function checkSelected() {
  const projects = document.querySelectorAll(".project-name");
  const AllTasksContainer = document.querySelector(".all-tasks-container");
  for (let project of projects) {
    if (!project.parentElement.classList.contains("selected")) {
      AllTasksContainer.replaceChildren();
      console.log("select a project");
    }
  }
}

function selectProject(e) {
  clearSelected();
  e.parentElement.classList.add("selected");
  displayTasks(e.parentElement.dataset.num);
}

// tasks
function taskEventListeners() {
  const addTaskBtn = document.querySelector(".add-task-btn");
  const addTaskContainer = document.querySelector(".add-task-container");
  const taskTitle = document.querySelector(".add-task-title");
  const dueDate = document.querySelector(".add-due-date");
  const taskDetails = document.querySelector(".add-task-details");
  const confirmTaskBtn = document.querySelector(".confirm-task-btn");
  const cancelTaskBtn = document.querySelector(".cancel-task-btn");

  addTaskBtn.addEventListener("click", () => {
    addTaskContainer.classList.remove("hidden");
    addTaskBtn.classList.add("hidden");
  });

  cancelTaskBtn.addEventListener("click", () => {
    taskTitle.value = "";
    taskDetails.value = "";
    dueDate.value = "";
    addTaskContainer.classList.add("hidden");
    addTaskBtn.classList.remove("hidden");
  });

  confirmTaskBtn.addEventListener("click", () => {
    if (_projects__WEBPACK_IMPORTED_MODULE_0__.projectList.length == 0) {
      alert("make project first");
    }
    checkSelected();
    (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.taskProcess)(taskTitle.value, taskDetails.value, dueDate.value);
    taskTitle.value = "";
    taskDetails.value = "";
    dueDate.value = "";
    addTaskContainer.classList.add("hidden");
    addTaskBtn.classList.remove("hidden");
  });
}

const taskToDom = (newId, title, details, dueDate) => {
  const AllTasksContainer = document.querySelector(".all-tasks-container");
  let taskContainer = document.createElement("div");
  let task = document.createElement("div");
  let checkTask = document.createElement("div");
  let taskTitle = document.createElement("p");
  let taskDate = document.createElement("p");
  let btnContainer = document.createElement("div");
  let expandBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");
  let detailsContainer = document.createElement("div");
  let taskDescription = document.createElement("p");
  let editBtn = document.createElement("button");

  taskContainer.classList.add("task-container");
  task.classList.add("task");
  task.dataset.id = newId;
  checkTask.classList.add("check-task");
  taskTitle.classList.add("task-title");
  taskDate.classList.add("due-date");
  btnContainer.classList.add("task-btns-container");
  expandBtn.classList.add("expand-btn");
  deleteBtn.classList.add("delete-btn");
  detailsContainer.classList.add("task-details");
  detailsContainer.classList.add("hidden");
  taskDescription.classList.add("task-description");
  editBtn.classList.add("edit-task-btn");

  taskTitle.textContent = title;
  taskDescription.textContent = details;
  taskDate.textContent = dueDate;

  btnContainer.appendChild(expandBtn);
  btnContainer.appendChild(deleteBtn);
  task.appendChild(checkTask);
  task.appendChild(taskTitle);
  task.appendChild(taskDate);
  task.appendChild(btnContainer);
  detailsContainer.appendChild(taskDescription);
  detailsContainer.appendChild(editBtn);
  taskContainer.appendChild(task);
  taskContainer.appendChild(detailsContainer);
  AllTasksContainer.appendChild(taskContainer);
};

function expandTask(e) {
  e.classList.toggle("expand-up");
  e.parentElement.parentElement.nextSibling.classList.toggle("hidden");
}

const resetDomDataId = () => {
  let domData = document.querySelectorAll("[data-id]");
  for (let data of domData) {
    data.dataset.id = Array.prototype.indexOf.call(domData, data);
  }
};

function deleteTask(e) {
  let dataNum = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.selected)();
  let taskNum = e.composedPath()[2].dataset.id;
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[dataNum].tasks.splice(taskNum, 1);
  e.target.parentElement.parentElement.parentElement.remove();
  resetDomDataId();
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.resetDataId)();
  // }
}

function addEditForm(e) {
  let editName = document.createElement("input");
  let editDate = document.createElement("input");
  editDate.setAttribute("type", "date");
  let editDetails = document.createElement("textarea");
  let editBtnContainer = document.createElement("div");
  let editConfirmBtn = document.createElement("button");
  let editCancelBtn = document.createElement("button");

  editName.classList.add("edit-name-input");
  editDate.classList.add("edit-date-input");
  editDetails.classList.add("edit-details-input");
  editBtnContainer.classList.add("edit-btn-container");
  editConfirmBtn.classList.add("edit-confirm-btn");
  editCancelBtn.classList.add("edit-cancel-btn");

  editConfirmBtn.textContent = "Confirm";
  editCancelBtn.textContent = "Cancel";

  editName.value = e.composedPath()[2].firstChild.children[1].innerText;
  e.composedPath()[2].firstChild.children[1].replaceWith(editName);

  editDate.value = e.composedPath()[2].firstChild.children[2].innerText;
  e.composedPath()[2].firstChild.children[2].replaceWith(editDate);

  editDetails.value = e.composedPath()[1].firstChild.innerText;
  e.composedPath()[1].firstChild.replaceWith(editDetails);

  editBtnContainer.appendChild(editConfirmBtn);
  editBtnContainer.appendChild(editCancelBtn);

  e.composedPath()[2].appendChild(editBtnContainer);
}

let displayTasks = (project) => {
  const AllTasksContainer = document.querySelector(".all-tasks-container");
  AllTasksContainer.replaceChildren();
  let selectedProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[project].tasks;
  for (let task of selectedProject) {
    taskToDom(task.id, task.title, task.details, task.dueDate);
  }
};




/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectList": () => (/* binding */ projectList),
/* harmony export */   "projectProcess": () => (/* binding */ projectProcess),
/* harmony export */   "resetDataNum": () => (/* binding */ resetDataNum)
/* harmony export */ });
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-events */ "./src/dom-events.js");


const projectList = [];

//project factory
const projectFactory = (dataNum, projectName, tasks) => {
  return { dataNum, projectName, tasks };
};

const projectProcess = (projectName) => {
  let dataNum = setDataNum();
  let newProject = projectFactory(dataNum, projectName, []);
  projectList.push(newProject);
  (0,_dom_events__WEBPACK_IMPORTED_MODULE_0__.projectToDOM)(dataNum, projectName);
};

const setDataNum = () => {
  const datanum = document.querySelectorAll("[data-num]");
  return datanum.length;
};

function resetDataNum() {
  for (let project of projectList) {
    project.dataNum = projectList.indexOf(project);
  }
}




/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cancelEditTask": () => (/* binding */ cancelEditTask),
/* harmony export */   "completeTask": () => (/* binding */ completeTask),
/* harmony export */   "confirmEditTask": () => (/* binding */ confirmEditTask),
/* harmony export */   "resetDataId": () => (/* binding */ resetDataId),
/* harmony export */   "selected": () => (/* binding */ selected),
/* harmony export */   "taskProcess": () => (/* binding */ taskProcess)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-events */ "./src/dom-events.js");



//task factory
const taskFactory = (dataNum, id, title, details, dueDate, completed) => {
  return { dataNum, id, title, details, dueDate, completed };
};

let id = () => {
  return _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[selected()].tasks.length;
};

function taskProcess(title, details, dueDate) {
  let newId = id();
  let dataNum = selected();
  let newTask = taskFactory(dataNum, newId, title, details, dueDate, false);
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[dataNum].tasks.push(newTask);

  (0,_dom_events__WEBPACK_IMPORTED_MODULE_1__.taskToDom)(newId, title, details, dueDate);
}

function selected() {
  const projects = document.querySelectorAll(".project-obj");
  for (let project of projects) {
    if (project.classList.contains("selected")) {
      return project.dataset.num;
    }
  }
}

function resetDataId() {
  let taskList = _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[selected()].tasks;
  for (let task of taskList) {
    task.id = taskList.indexOf(task);
  }
}

function confirmEditTask(e) {
  let tasks =
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[selected()].tasks[e.composedPath()[2].firstChild.dataset.id];
  let newTitle = e.composedPath()[2].firstChild.children[1].value;
  let newDate = e.composedPath()[2].firstChild.children[2].value;
  let newDetails = e.composedPath()[2].children[1].firstChild.value;

  tasks.title = newTitle;
  tasks.details = newDetails;
  tasks.dueDate = newDate;

  (0,_dom_events__WEBPACK_IMPORTED_MODULE_1__.displayTasks)(selected());
}

function cancelEditTask() {
  (0,_dom_events__WEBPACK_IMPORTED_MODULE_1__.displayTasks)(selected());
}

let completeTask = (e) => {
  console.log(e);
  e.target.classList.toggle("checked");
  e.composedPath()[1].classList.toggle("completed");
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[selected()].tasks[
    e.composedPath()[2].firstChild.dataset.id
  ].completed = true;
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-events */ "./src/dom-events.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");





(0,_dom_events__WEBPACK_IMPORTED_MODULE_0__.projectEventListeners)();
(0,_dom_events__WEBPACK_IMPORTED_MODULE_0__.buttonEventListeners)();
(0,_dom_events__WEBPACK_IMPORTED_MODULE_0__.taskEventListeners)();

(0,_projects__WEBPACK_IMPORTED_MODULE_1__.projectProcess)("project 1");
(0,_tasks__WEBPACK_IMPORTED_MODULE_2__.taskProcess)("Take finn out", "he need to doodoo reaal bad", "2022-08-08");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUU7QUFRdEQ7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsSUFBSSx5REFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBZTtBQUNyQjtBQUNBO0FBQ0EsTUFBTSxzREFBYztBQUNwQjtBQUNBO0FBQ0EsTUFBTSxvREFBWTtBQUNsQjtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRSx5REFBa0I7QUFDcEI7QUFDQTtBQUNBLEVBQUUsdURBQVk7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxRQUFRLHlEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixnREFBUTtBQUN4QjtBQUNBLEVBQUUsa0RBQVc7QUFDYjtBQUNBO0FBQ0EsRUFBRSxtREFBVztBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtEQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQVNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuUzBDOztBQUU1Qzs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx5REFBWTtBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JaO0FBQ2M7O0FBRXZEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQSxTQUFTLGtEQUFXO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxrREFBVzs7QUFFYixFQUFFLHNEQUFTO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixrREFBVztBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrREFBVztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSx5REFBWTtBQUNkOztBQUVBO0FBQ0EsRUFBRSx5REFBWTtBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxrREFBVztBQUNiO0FBQ0E7QUFDQTs7QUFTRTs7Ozs7OztVQ3ZFRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNGc0I7O0FBRXNCO0FBQ047O0FBRXRDLGtFQUFxQjtBQUNyQixpRUFBb0I7QUFDcEIsK0RBQWtCOztBQUVsQix5REFBYztBQUNkLG1EQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS1ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdExpc3QsIHByb2plY3RQcm9jZXNzLCByZXNldERhdGFOdW0gfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHtcbiAgdGFza1Byb2Nlc3MsXG4gIHNlbGVjdGVkLFxuICByZXNldERhdGFJZCxcbiAgY29uZmlybUVkaXRUYXNrLFxuICBjYW5jZWxFZGl0VGFzayxcbiAgY29tcGxldGVUYXNrLFxufSBmcm9tIFwiLi90YXNrc1wiO1xuXG4vLyBwcm9qZWN0c1xuXG5mdW5jdGlvbiBwcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGNvbnN0IHByb2plY3RzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1idG5cIik7XG4gIGNvbnN0IHByb2plY3RzRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtZm9ybVwiKTtcbiAgY29uc3QgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1pbnB1dFwiKTtcbiAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtYnRuXCIpO1xuICBjb25zdCBjYW5jZWxQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtcHJvamVjdC1idG5cIik7XG5cbiAgcHJvamVjdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBwcm9qZWN0c0J0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9KTtcblxuICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdFByb2Nlc3MoYWRkUHJvamVjdElucHV0LnZhbHVlKTtcbiAgICBhZGRQcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIHByb2plY3RzRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIHByb2plY3RzQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0pO1xuXG4gIGNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBhZGRQcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIHByb2plY3RzRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIHByb2plY3RzQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBidXR0b25FdmVudExpc3RlbmVycygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJraWxsLXByb2plY3RcIikpIHtcbiAgICAgIGRlbGV0ZVByb2plY3QoZSk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3QtbmFtZVwiKSkge1xuICAgICAgc2VsZWN0UHJvamVjdChlbGVtZW50KTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZXhwYW5kLWJ0blwiKSkge1xuICAgICAgZXhwYW5kVGFzayhlbGVtZW50KTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWJ0blwiKSkge1xuICAgICAgZGVsZXRlVGFzayhlKTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC10YXNrLWJ0blwiKSkge1xuICAgICAgYWRkRWRpdEZvcm0oZSk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtY29uZmlybS1idG5cIikpIHtcbiAgICAgIGNvbmZpcm1FZGl0VGFzayhlKTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1jYW5jZWwtYnRuXCIpKSB7XG4gICAgICBjYW5jZWxFZGl0VGFzayhlKTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hlY2stdGFza1wiKSkge1xuICAgICAgY29tcGxldGVUYXNrKGUpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xuICBsZXQgZGF0YU51bSA9IGUuY29tcG9zZWRQYXRoKClbMV0uZGF0YXNldC5udW07XG4gIHByb2plY3RMaXN0LnNwbGljZShkYXRhTnVtLCAxKTtcbiAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgcmVzZXREb21EYXRhTnVtKCk7XG4gIHJlc2V0RGF0YU51bSgpO1xuICBjb25zdCBBbGxUYXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxsLXRhc2tzLWNvbnRhaW5lclwiKTtcbiAgQWxsVGFza3NDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG59XG5cbmNvbnN0IHByb2plY3RUb0RPTSA9IChkYXRhTnVtLCBOYW1lKSA9PiB7XG4gIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY29udGFpbmVyXCIpO1xuICBsZXQgcHJvamVjdE9iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBwcm9qZWN0SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICBjbGVhclNlbGVjdGVkKCk7XG5cbiAgcHJvamVjdE9iai5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1vYmpcIik7XG4gIHByb2plY3RPYmouY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICBwcm9qZWN0T2JqLmRhdGFzZXQubnVtID0gZGF0YU51bTtcbiAgcHJvamVjdEltZy5zcmMgPSBcIi4vaW1hZ2VzL2Zvcm1hdC1saXN0LWJ1bGxldGVkLXNxdWFyZS5wbmdcIjtcbiAgcHJvamVjdEltZy5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IE5hbWU7XG4gIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImtpbGwtcHJvamVjdFwiKTtcblxuICBwcm9qZWN0T2JqLmFwcGVuZENoaWxkKHByb2plY3RJbWcpO1xuICBwcm9qZWN0T2JqLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcbiAgcHJvamVjdE9iai5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcblxuICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RPYmopO1xuXG4gIGRpc3BsYXlUYXNrcyhkYXRhTnVtKTtcbn07XG5cbmNvbnN0IHJlc2V0RG9tRGF0YU51bSA9ICgpID0+IHtcbiAgbGV0IGRvbURhdGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbnVtXVwiKTtcbiAgZm9yIChsZXQgZGF0YSBvZiBkb21EYXRhKSB7XG4gICAgZGF0YS5kYXRhc2V0Lm51bSA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZG9tRGF0YSwgZGF0YSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNsZWFyU2VsZWN0ZWQoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LW5hbWVcIik7XG4gIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBpZiAocHJvamVjdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICBwcm9qZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY2hlY2tTZWxlY3RlZCgpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtbmFtZVwiKTtcbiAgY29uc3QgQWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsbC10YXNrcy1jb250YWluZXJcIik7XG4gIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBpZiAoIXByb2plY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgQWxsVGFza3NDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICBjb25zb2xlLmxvZyhcInNlbGVjdCBhIHByb2plY3RcIik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSkge1xuICBjbGVhclNlbGVjdGVkKCk7XG4gIGUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gIGRpc3BsYXlUYXNrcyhlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5udW0pO1xufVxuXG4vLyB0YXNrc1xuZnVuY3Rpb24gdGFza0V2ZW50TGlzdGVuZXJzKCkge1xuICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1idG5cIik7XG4gIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay10aXRsZVwiKTtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWR1ZS1kYXRlXCIpO1xuICBjb25zdCB0YXNrRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZGV0YWlsc1wiKTtcbiAgY29uc3QgY29uZmlybVRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tdGFzay1idG5cIik7XG4gIGNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrLWJ0blwiKTtcblxuICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWRkVGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgY2FuY2VsVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0RldGFpbHMudmFsdWUgPSBcIlwiO1xuICAgIGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuICAgIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0pO1xuXG4gIGNvbmZpcm1UYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICBhbGVydChcIm1ha2UgcHJvamVjdCBmaXJzdFwiKTtcbiAgICB9XG4gICAgY2hlY2tTZWxlY3RlZCgpO1xuICAgIHRhc2tQcm9jZXNzKHRhc2tUaXRsZS52YWx1ZSwgdGFza0RldGFpbHMudmFsdWUsIGR1ZURhdGUudmFsdWUpO1xuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0RldGFpbHMudmFsdWUgPSBcIlwiO1xuICAgIGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuICAgIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0pO1xufVxuXG5jb25zdCB0YXNrVG9Eb20gPSAobmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKSA9PiB7XG4gIGNvbnN0IEFsbFRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGwtdGFza3MtY29udGFpbmVyXCIpO1xuICBsZXQgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IGNoZWNrVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCBidG5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgZXhwYW5kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbGV0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGxldCBkZXRhaWxzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsZXQgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1jb250YWluZXJcIik7XG4gIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gIHRhc2suZGF0YXNldC5pZCA9IG5ld0lkO1xuICBjaGVja1Rhc2suY2xhc3NMaXN0LmFkZChcImNoZWNrLXRhc2tcIik7XG4gIHRhc2tUaXRsZS5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZChcImR1ZS1kYXRlXCIpO1xuICBidG5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stYnRucy1jb250YWluZXJcIik7XG4gIGV4cGFuZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kLWJ0blwiKTtcbiAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnRuXCIpO1xuICBkZXRhaWxzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRldGFpbHNcIik7XG4gIGRldGFpbHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgdGFza0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRlc2NyaXB0aW9uXCIpO1xuICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LXRhc2stYnRuXCIpO1xuXG4gIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXRhaWxzO1xuICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IGR1ZURhdGU7XG5cbiAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGV4cGFuZEJ0bik7XG4gIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICB0YXNrLmFwcGVuZENoaWxkKGNoZWNrVGFzayk7XG4gIHRhc2suYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgdGFzay5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gIHRhc2suYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyKTtcbiAgZGV0YWlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICBkZXRhaWxzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xuICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2spO1xuICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRldGFpbHNDb250YWluZXIpO1xuICBBbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbn07XG5cbmZ1bmN0aW9uIGV4cGFuZFRhc2soZSkge1xuICBlLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmQtdXBcIik7XG4gIGUucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lm5leHRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG59XG5cbmNvbnN0IHJlc2V0RG9tRGF0YUlkID0gKCkgPT4ge1xuICBsZXQgZG9tRGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1pZF1cIik7XG4gIGZvciAobGV0IGRhdGEgb2YgZG9tRGF0YSkge1xuICAgIGRhdGEuZGF0YXNldC5pZCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZG9tRGF0YSwgZGF0YSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSkge1xuICBsZXQgZGF0YU51bSA9IHNlbGVjdGVkKCk7XG4gIGxldCB0YXNrTnVtID0gZS5jb21wb3NlZFBhdGgoKVsyXS5kYXRhc2V0LmlkO1xuICBwcm9qZWN0TGlzdFtkYXRhTnVtXS50YXNrcy5zcGxpY2UodGFza051bSwgMSk7XG4gIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICByZXNldERvbURhdGFJZCgpO1xuICByZXNldERhdGFJZCgpO1xuICAvLyB9XG59XG5cbmZ1bmN0aW9uIGFkZEVkaXRGb3JtKGUpIHtcbiAgbGV0IGVkaXROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBsZXQgZWRpdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGVkaXREYXRlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICBsZXQgZWRpdERldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gIGxldCBlZGl0QnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IGVkaXRDb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbGV0IGVkaXRDYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIGVkaXROYW1lLmNsYXNzTGlzdC5hZGQoXCJlZGl0LW5hbWUtaW5wdXRcIik7XG4gIGVkaXREYXRlLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWRhdGUtaW5wdXRcIik7XG4gIGVkaXREZXRhaWxzLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWRldGFpbHMtaW5wdXRcIik7XG4gIGVkaXRCdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImVkaXQtYnRuLWNvbnRhaW5lclwiKTtcbiAgZWRpdENvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtY29uZmlybS1idG5cIik7XG4gIGVkaXRDYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtY2FuY2VsLWJ0blwiKTtcblxuICBlZGl0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9IFwiQ29uZmlybVwiO1xuICBlZGl0Q2FuY2VsQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcblxuICBlZGl0TmFtZS52YWx1ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsxXS5pbm5lclRleHQ7XG4gIGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsxXS5yZXBsYWNlV2l0aChlZGl0TmFtZSk7XG5cbiAgZWRpdERhdGUudmFsdWUgPSBlLmNvbXBvc2VkUGF0aCgpWzJdLmZpcnN0Q2hpbGQuY2hpbGRyZW5bMl0uaW5uZXJUZXh0O1xuICBlLmNvbXBvc2VkUGF0aCgpWzJdLmZpcnN0Q2hpbGQuY2hpbGRyZW5bMl0ucmVwbGFjZVdpdGgoZWRpdERhdGUpO1xuXG4gIGVkaXREZXRhaWxzLnZhbHVlID0gZS5jb21wb3NlZFBhdGgoKVsxXS5maXJzdENoaWxkLmlubmVyVGV4dDtcbiAgZS5jb21wb3NlZFBhdGgoKVsxXS5maXJzdENoaWxkLnJlcGxhY2VXaXRoKGVkaXREZXRhaWxzKTtcblxuICBlZGl0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDb25maXJtQnRuKTtcbiAgZWRpdEJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0Q2FuY2VsQnRuKTtcblxuICBlLmNvbXBvc2VkUGF0aCgpWzJdLmFwcGVuZENoaWxkKGVkaXRCdG5Db250YWluZXIpO1xufVxuXG5sZXQgZGlzcGxheVRhc2tzID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgQWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsbC10YXNrcy1jb250YWluZXJcIik7XG4gIEFsbFRhc2tzQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuICBsZXQgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdExpc3RbcHJvamVjdF0udGFza3M7XG4gIGZvciAobGV0IHRhc2sgb2Ygc2VsZWN0ZWRQcm9qZWN0KSB7XG4gICAgdGFza1RvRG9tKHRhc2suaWQsIHRhc2sudGl0bGUsIHRhc2suZGV0YWlscywgdGFzay5kdWVEYXRlKTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgcHJvamVjdEV2ZW50TGlzdGVuZXJzLFxuICBidXR0b25FdmVudExpc3RlbmVycyxcbiAgdGFza0V2ZW50TGlzdGVuZXJzLFxuICBwcm9qZWN0VG9ET00sXG4gIHRhc2tUb0RvbSxcbiAgZGlzcGxheVRhc2tzLFxufTtcbiIsImltcG9ydCB7IHByb2plY3RUb0RPTSB9IGZyb20gXCIuL2RvbS1ldmVudHNcIjtcblxuY29uc3QgcHJvamVjdExpc3QgPSBbXTtcblxuLy9wcm9qZWN0IGZhY3RvcnlcbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKGRhdGFOdW0sIHByb2plY3ROYW1lLCB0YXNrcykgPT4ge1xuICByZXR1cm4geyBkYXRhTnVtLCBwcm9qZWN0TmFtZSwgdGFza3MgfTtcbn07XG5cbmNvbnN0IHByb2plY3RQcm9jZXNzID0gKHByb2plY3ROYW1lKSA9PiB7XG4gIGxldCBkYXRhTnVtID0gc2V0RGF0YU51bSgpO1xuICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KGRhdGFOdW0sIHByb2plY3ROYW1lLCBbXSk7XG4gIHByb2plY3RMaXN0LnB1c2gobmV3UHJvamVjdCk7XG4gIHByb2plY3RUb0RPTShkYXRhTnVtLCBwcm9qZWN0TmFtZSk7XG59O1xuXG5jb25zdCBzZXREYXRhTnVtID0gKCkgPT4ge1xuICBjb25zdCBkYXRhbnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW51bV1cIik7XG4gIHJldHVybiBkYXRhbnVtLmxlbmd0aDtcbn07XG5cbmZ1bmN0aW9uIHJlc2V0RGF0YU51bSgpIHtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0TGlzdCkge1xuICAgIHByb2plY3QuZGF0YU51bSA9IHByb2plY3RMaXN0LmluZGV4T2YocHJvamVjdCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgcHJvamVjdExpc3QsIHByb2plY3RQcm9jZXNzLCByZXNldERhdGFOdW0gfTtcbiIsImltcG9ydCB7IHByb2plY3RMaXN0IH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7IHRhc2tUb0RvbSwgZGlzcGxheVRhc2tzIH0gZnJvbSBcIi4vZG9tLWV2ZW50c1wiO1xuXG4vL3Rhc2sgZmFjdG9yeVxuY29uc3QgdGFza0ZhY3RvcnkgPSAoZGF0YU51bSwgaWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpID0+IHtcbiAgcmV0dXJuIHsgZGF0YU51bSwgaWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQgfTtcbn07XG5cbmxldCBpZCA9ICgpID0+IHtcbiAgcmV0dXJuIHByb2plY3RMaXN0W3NlbGVjdGVkKCldLnRhc2tzLmxlbmd0aDtcbn07XG5cbmZ1bmN0aW9uIHRhc2tQcm9jZXNzKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKSB7XG4gIGxldCBuZXdJZCA9IGlkKCk7XG4gIGxldCBkYXRhTnVtID0gc2VsZWN0ZWQoKTtcbiAgbGV0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeShkYXRhTnVtLCBuZXdJZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGZhbHNlKTtcbiAgcHJvamVjdExpc3RbZGF0YU51bV0udGFza3MucHVzaChuZXdUYXNrKTtcblxuICB0YXNrVG9Eb20obmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0ZWQoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LW9ialwiKTtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGlmIChwcm9qZWN0LmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICByZXR1cm4gcHJvamVjdC5kYXRhc2V0Lm51bTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXREYXRhSWQoKSB7XG4gIGxldCB0YXNrTGlzdCA9IHByb2plY3RMaXN0W3NlbGVjdGVkKCldLnRhc2tzO1xuICBmb3IgKGxldCB0YXNrIG9mIHRhc2tMaXN0KSB7XG4gICAgdGFzay5pZCA9IHRhc2tMaXN0LmluZGV4T2YodGFzayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29uZmlybUVkaXRUYXNrKGUpIHtcbiAgbGV0IHRhc2tzID1cbiAgICBwcm9qZWN0TGlzdFtzZWxlY3RlZCgpXS50YXNrc1tlLmNvbXBvc2VkUGF0aCgpWzJdLmZpcnN0Q2hpbGQuZGF0YXNldC5pZF07XG4gIGxldCBuZXdUaXRsZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsxXS52YWx1ZTtcbiAgbGV0IG5ld0RhdGUgPSBlLmNvbXBvc2VkUGF0aCgpWzJdLmZpcnN0Q2hpbGQuY2hpbGRyZW5bMl0udmFsdWU7XG4gIGxldCBuZXdEZXRhaWxzID0gZS5jb21wb3NlZFBhdGgoKVsyXS5jaGlsZHJlblsxXS5maXJzdENoaWxkLnZhbHVlO1xuXG4gIHRhc2tzLnRpdGxlID0gbmV3VGl0bGU7XG4gIHRhc2tzLmRldGFpbHMgPSBuZXdEZXRhaWxzO1xuICB0YXNrcy5kdWVEYXRlID0gbmV3RGF0ZTtcblxuICBkaXNwbGF5VGFza3Moc2VsZWN0ZWQoKSk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEVkaXRUYXNrKCkge1xuICBkaXNwbGF5VGFza3Moc2VsZWN0ZWQoKSk7XG59XG5cbmxldCBjb21wbGV0ZVRhc2sgPSAoZSkgPT4ge1xuICBjb25zb2xlLmxvZyhlKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImNoZWNrZWRcIik7XG4gIGUuY29tcG9zZWRQYXRoKClbMV0uY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgcHJvamVjdExpc3Rbc2VsZWN0ZWQoKV0udGFza3NbXG4gICAgZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmRhdGFzZXQuaWRcbiAgXS5jb21wbGV0ZWQgPSB0cnVlO1xufTtcblxuZXhwb3J0IHtcbiAgdGFza1Byb2Nlc3MsXG4gIHNlbGVjdGVkLFxuICByZXNldERhdGFJZCxcbiAgY29uZmlybUVkaXRUYXNrLFxuICBjYW5jZWxFZGl0VGFzayxcbiAgY29tcGxldGVUYXNrLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgcHJvamVjdEV2ZW50TGlzdGVuZXJzLFxuICBidXR0b25FdmVudExpc3RlbmVycyxcbiAgdGFza0V2ZW50TGlzdGVuZXJzLFxufSBmcm9tIFwiLi9kb20tZXZlbnRzXCI7XG5cbmltcG9ydCB7IHByb2plY3RQcm9jZXNzIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7IHRhc2tQcm9jZXNzIH0gZnJvbSBcIi4vdGFza3NcIjtcblxucHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG5idXR0b25FdmVudExpc3RlbmVycygpO1xudGFza0V2ZW50TGlzdGVuZXJzKCk7XG5cbnByb2plY3RQcm9jZXNzKFwicHJvamVjdCAxXCIpO1xudGFza1Byb2Nlc3MoXCJUYWtlIGZpbm4gb3V0XCIsIFwiaGUgbmVlZCB0byBkb29kb28gcmVhYWwgYmFkXCIsIFwiMjAyMi0wOC0wOFwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==