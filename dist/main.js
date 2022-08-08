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
/* harmony export */   "displayTasks": () => (/* binding */ displayTasks),
/* harmony export */   "projectToDOM": () => (/* binding */ projectToDOM),
/* harmony export */   "taskToDom": () => (/* binding */ taskToDom)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



// projects
const projectContainer = document.querySelector(".project-container");
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
function deleteProject(e) {
  // let element = e.target;
  let dataNum = e.composedPath()[1].dataset.num;
  // if (element.classList.contains("kill-project")) {
  _projects__WEBPACK_IMPORTED_MODULE_0__.projectList.splice(dataNum, 1);
  e.target.parentElement.remove();
  resetDomDataNum();
  (0,_projects__WEBPACK_IMPORTED_MODULE_0__.resetDataNum)();
  // }
}
// const displayProjects = (projectList) => {
//   for (let project of projectList) {
//     projectToDOM(project.dataNum, project.projectName);
//   }
// };

const projectToDOM = (dataNum, Name) => {
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

function selectProject(e) {
  // let element = e.target;
  // if (element.classList.contains("project-name")) {
  clearSelected();
  e.parentElement.classList.add("selected");
  displayTasks(e.parentElement.dataset.num);
  // }
}

// tasks
const addTaskBtn = document.querySelector(".add-task-btn");
const AllTasksContainer = document.querySelector(".all-tasks-container");
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
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.taskProcess)(taskTitle.value, taskDetails.value, dueDate.value);
  taskTitle.value = "";
  taskDetails.value = "";
  dueDate.value = "";
  addTaskContainer.classList.add("hidden");
  addTaskBtn.classList.remove("hidden");
});

const taskToDom = (newId, title, details, dueDate) => {
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
  // let element = e.target;
  // if (element.classList.contains("expand-btn")) {
  e.classList.toggle("expand-up");
  e.parentElement.parentElement.nextSibling.classList.toggle("hidden");
  // }
}

const resetDomDataId = () => {
  let domData = document.querySelectorAll("[data-id]");
  for (let data of domData) {
    data.dataset.id = Array.prototype.indexOf.call(domData, data);
  }
};

function deleteTask(e) {
  // let element = e.target;
  let dataNum = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.selected)();
  let taskNum = e.composedPath()[2].dataset.id;
  // if (element.classList.contains("delete-btn")) {
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
  //   let name = projectName;
  let dataNum = setDataNum();
  let newProject = projectFactory(dataNum, projectName, []);
  projectList.push(newProject);
  (0,_dom_events__WEBPACK_IMPORTED_MODULE_0__.projectToDOM)(dataNum, projectName);
  // console.log(projectList);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/dom-events.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlCLGtEQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGtEQUFXO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLHlEQUFZO0FBQ2Q7O0FBRUE7QUFDQSxFQUFFLHlEQUFZO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGtEQUFXO0FBQ2I7QUFDQTtBQUNBOztBQVNFOzs7Ozs7O1VDdkVGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS1ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdExpc3QsIHByb2plY3RQcm9jZXNzLCByZXNldERhdGFOdW0gfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHtcbiAgdGFza1Byb2Nlc3MsXG4gIHNlbGVjdGVkLFxuICByZXNldERhdGFJZCxcbiAgY29uZmlybUVkaXRUYXNrLFxuICBjYW5jZWxFZGl0VGFzayxcbiAgY29tcGxldGVUYXNrLFxufSBmcm9tIFwiLi90YXNrc1wiO1xuXG4vLyBwcm9qZWN0c1xuY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtYnRuXCIpO1xuY29uc3QgcHJvamVjdHNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1mb3JtXCIpO1xuY29uc3QgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1pbnB1dFwiKTtcbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWJ0blwiKTtcbmNvbnN0IGNhbmNlbFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1wcm9qZWN0LWJ0blwiKTtcblxucHJvamVjdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcHJvamVjdHNGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIHByb2plY3RzQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59KTtcblxuYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBwcm9qZWN0UHJvY2VzcyhhZGRQcm9qZWN0SW5wdXQudmFsdWUpO1xuICBhZGRQcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICBwcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgcHJvamVjdHNCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn0pO1xuXG5jYW5jZWxQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFByb2plY3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIHByb2plY3RzRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICBwcm9qZWN0c0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJraWxsLXByb2plY3RcIikpIHtcbiAgICBkZWxldGVQcm9qZWN0KGUpO1xuICB9XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3QtbmFtZVwiKSkge1xuICAgIHNlbGVjdFByb2plY3QoZWxlbWVudCk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZXhwYW5kLWJ0blwiKSkge1xuICAgIGV4cGFuZFRhc2soZWxlbWVudCk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWJ0blwiKSkge1xuICAgIGRlbGV0ZVRhc2soZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC10YXNrLWJ0blwiKSkge1xuICAgIGFkZEVkaXRGb3JtKGUpO1xuICB9XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtY29uZmlybS1idG5cIikpIHtcbiAgICBjb25maXJtRWRpdFRhc2soZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1jYW5jZWwtYnRuXCIpKSB7XG4gICAgY2FuY2VsRWRpdFRhc2soZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hlY2stdGFza1wiKSkge1xuICAgIGNvbXBsZXRlVGFzayhlKTtcbiAgfVxufSk7XG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcbiAgLy8gbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgbGV0IGRhdGFOdW0gPSBlLmNvbXBvc2VkUGF0aCgpWzFdLmRhdGFzZXQubnVtO1xuICAvLyBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJraWxsLXByb2plY3RcIikpIHtcbiAgcHJvamVjdExpc3Quc3BsaWNlKGRhdGFOdW0sIDEpO1xuICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICByZXNldERvbURhdGFOdW0oKTtcbiAgcmVzZXREYXRhTnVtKCk7XG4gIC8vIH1cbn1cbi8vIGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9IChwcm9qZWN0TGlzdCkgPT4ge1xuLy8gICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaXN0KSB7XG4vLyAgICAgcHJvamVjdFRvRE9NKHByb2plY3QuZGF0YU51bSwgcHJvamVjdC5wcm9qZWN0TmFtZSk7XG4vLyAgIH1cbi8vIH07XG5cbmNvbnN0IHByb2plY3RUb0RPTSA9IChkYXRhTnVtLCBOYW1lKSA9PiB7XG4gIGxldCBwcm9qZWN0T2JqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHByb2plY3RJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBsZXQgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIGNsZWFyU2VsZWN0ZWQoKTtcblxuICBwcm9qZWN0T2JqLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW9ialwiKTtcbiAgcHJvamVjdE9iai5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gIHByb2plY3RPYmouZGF0YXNldC5udW0gPSBkYXRhTnVtO1xuICBwcm9qZWN0SW1nLnNyYyA9IFwiLi9pbWFnZXMvZm9ybWF0LWxpc3QtYnVsbGV0ZWQtc3F1YXJlLnBuZ1wiO1xuICBwcm9qZWN0SW1nLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gTmFtZTtcbiAgcHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcbiAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwia2lsbC1wcm9qZWN0XCIpO1xuXG4gIHByb2plY3RPYmouYXBwZW5kQ2hpbGQocHJvamVjdEltZyk7XG4gIHByb2plY3RPYmouYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICBwcm9qZWN0T2JqLmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xuXG4gIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdE9iaik7XG5cbiAgZGlzcGxheVRhc2tzKGRhdGFOdW0pO1xufTtcblxuY29uc3QgcmVzZXREb21EYXRhTnVtID0gKCkgPT4ge1xuICBsZXQgZG9tRGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1udW1dXCIpO1xuICBmb3IgKGxldCBkYXRhIG9mIGRvbURhdGEpIHtcbiAgICBkYXRhLmRhdGFzZXQubnVtID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChkb21EYXRhLCBkYXRhKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2xlYXJTZWxlY3RlZCgpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtbmFtZVwiKTtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGlmIChwcm9qZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHByb2plY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSkge1xuICAvLyBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAvLyBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LW5hbWVcIikpIHtcbiAgY2xlYXJTZWxlY3RlZCgpO1xuICBlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICBkaXNwbGF5VGFza3MoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQubnVtKTtcbiAgLy8gfVxufVxuXG4vLyB0YXNrc1xuY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgQWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsbC10YXNrcy1jb250YWluZXJcIik7XG5jb25zdCBhZGRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1jb250YWluZXJcIik7XG5jb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXRpdGxlXCIpO1xuY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWR1ZS1kYXRlXCIpO1xuY29uc3QgdGFza0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWRldGFpbHNcIik7XG5jb25zdCBjb25maXJtVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS10YXNrLWJ0blwiKTtcbmNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrLWJ0blwiKTtcblxuYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIGFkZFRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn0pO1xuXG5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gIHRhc2tEZXRhaWxzLnZhbHVlID0gXCJcIjtcbiAgZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG4gIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgYWRkVGFza0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmNvbmZpcm1UYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHRhc2tQcm9jZXNzKHRhc2tUaXRsZS52YWx1ZSwgdGFza0RldGFpbHMudmFsdWUsIGR1ZURhdGUudmFsdWUpO1xuICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICB0YXNrRGV0YWlscy52YWx1ZSA9IFwiXCI7XG4gIGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuICBhZGRUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIGFkZFRhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn0pO1xuXG5jb25zdCB0YXNrVG9Eb20gPSAobmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKSA9PiB7XG4gIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgY2hlY2tUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IGJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBleHBhbmRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBsZXQgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbGV0IGRldGFpbHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcbiAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgdGFzay5kYXRhc2V0LmlkID0gbmV3SWQ7XG4gIGNoZWNrVGFzay5jbGFzc0xpc3QuYWRkKFwiY2hlY2stdGFza1wiKTtcbiAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZHVlLWRhdGVcIik7XG4gIGJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1idG5zLWNvbnRhaW5lclwiKTtcbiAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmQtYnRuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRldGFpbHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stZGV0YWlsc1wiKTtcbiAgZGV0YWlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtdGFzay1idG5cIik7XG5cbiAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRldGFpbHM7XG4gIHRhc2tEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcblxuICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZXhwYW5kQnRuKTtcbiAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gIHRhc2suYXBwZW5kQ2hpbGQoY2hlY2tUYXNrKTtcbiAgdGFzay5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICB0YXNrLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgdGFzay5hcHBlbmRDaGlsZChidG5Db250YWluZXIpO1xuICBkZXRhaWxzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gIGRldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFzayk7XG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGV0YWlsc0NvbnRhaW5lcik7XG4gIEFsbFRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xufTtcblxuZnVuY3Rpb24gZXhwYW5kVGFzayhlKSB7XG4gIC8vIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG4gIC8vIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImV4cGFuZC1idG5cIikpIHtcbiAgZS5jbGFzc0xpc3QudG9nZ2xlKFwiZXhwYW5kLXVwXCIpO1xuICBlLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5uZXh0U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAvLyB9XG59XG5cbmNvbnN0IHJlc2V0RG9tRGF0YUlkID0gKCkgPT4ge1xuICBsZXQgZG9tRGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1pZF1cIik7XG4gIGZvciAobGV0IGRhdGEgb2YgZG9tRGF0YSkge1xuICAgIGRhdGEuZGF0YXNldC5pZCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZG9tRGF0YSwgZGF0YSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSkge1xuICAvLyBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICBsZXQgZGF0YU51bSA9IHNlbGVjdGVkKCk7XG4gIGxldCB0YXNrTnVtID0gZS5jb21wb3NlZFBhdGgoKVsyXS5kYXRhc2V0LmlkO1xuICAvLyBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtYnRuXCIpKSB7XG4gIHByb2plY3RMaXN0W2RhdGFOdW1dLnRhc2tzLnNwbGljZSh0YXNrTnVtLCAxKTtcbiAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIHJlc2V0RG9tRGF0YUlkKCk7XG4gIHJlc2V0RGF0YUlkKCk7XG4gIC8vIH1cbn1cblxuZnVuY3Rpb24gYWRkRWRpdEZvcm0oZSkge1xuICBsZXQgZWRpdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGxldCBlZGl0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgZWRpdERhdGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gIGxldCBlZGl0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgbGV0IGVkaXRCdG5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgZWRpdENvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBsZXQgZWRpdENhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgZWRpdE5hbWUuY2xhc3NMaXN0LmFkZChcImVkaXQtbmFtZS1pbnB1dFwiKTtcbiAgZWRpdERhdGUuY2xhc3NMaXN0LmFkZChcImVkaXQtZGF0ZS1pbnB1dFwiKTtcbiAgZWRpdERldGFpbHMuY2xhc3NMaXN0LmFkZChcImVkaXQtZGV0YWlscy1pbnB1dFwiKTtcbiAgZWRpdEJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG4tY29udGFpbmVyXCIpO1xuICBlZGl0Q29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1jb25maXJtLWJ0blwiKTtcbiAgZWRpdENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1jYW5jZWwtYnRuXCIpO1xuXG4gIGVkaXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gXCJDb25maXJtXCI7XG4gIGVkaXRDYW5jZWxCdG4udGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG4gIGVkaXROYW1lLnZhbHVlID0gZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmNoaWxkcmVuWzFdLmlubmVyVGV4dDtcbiAgZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmNoaWxkcmVuWzFdLnJlcGxhY2VXaXRoKGVkaXROYW1lKTtcblxuICBlZGl0RGF0ZS52YWx1ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsyXS5pbm5lclRleHQ7XG4gIGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsyXS5yZXBsYWNlV2l0aChlZGl0RGF0ZSk7XG5cbiAgZWRpdERldGFpbHMudmFsdWUgPSBlLmNvbXBvc2VkUGF0aCgpWzFdLmZpcnN0Q2hpbGQuaW5uZXJUZXh0O1xuICBlLmNvbXBvc2VkUGF0aCgpWzFdLmZpcnN0Q2hpbGQucmVwbGFjZVdpdGgoZWRpdERldGFpbHMpO1xuXG4gIGVkaXRCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdENvbmZpcm1CdG4pO1xuICBlZGl0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDYW5jZWxCdG4pO1xuXG4gIGUuY29tcG9zZWRQYXRoKClbMl0uYXBwZW5kQ2hpbGQoZWRpdEJ0bkNvbnRhaW5lcik7XG59XG5cbmxldCBkaXNwbGF5VGFza3MgPSAocHJvamVjdCkgPT4ge1xuICBBbGxUYXNrc0NvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RMaXN0W3Byb2plY3RdLnRhc2tzO1xuICBmb3IgKGxldCB0YXNrIG9mIHNlbGVjdGVkUHJvamVjdCkge1xuICAgIHRhc2tUb0RvbSh0YXNrLmlkLCB0YXNrLnRpdGxlLCB0YXNrLmRldGFpbHMsIHRhc2suZHVlRGF0ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IHByb2plY3RUb0RPTSwgdGFza1RvRG9tLCBkaXNwbGF5VGFza3MgfTtcbiIsImltcG9ydCB7IHByb2plY3RUb0RPTSB9IGZyb20gXCIuL2RvbS1ldmVudHNcIjtcblxuY29uc3QgcHJvamVjdExpc3QgPSBbXTtcblxuLy9wcm9qZWN0IGZhY3RvcnlcbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKGRhdGFOdW0sIHByb2plY3ROYW1lLCB0YXNrcykgPT4ge1xuICByZXR1cm4geyBkYXRhTnVtLCBwcm9qZWN0TmFtZSwgdGFza3MgfTtcbn07XG5cbmNvbnN0IHByb2plY3RQcm9jZXNzID0gKHByb2plY3ROYW1lKSA9PiB7XG4gIC8vICAgbGV0IG5hbWUgPSBwcm9qZWN0TmFtZTtcbiAgbGV0IGRhdGFOdW0gPSBzZXREYXRhTnVtKCk7XG4gIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkoZGF0YU51bSwgcHJvamVjdE5hbWUsIFtdKTtcbiAgcHJvamVjdExpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgcHJvamVjdFRvRE9NKGRhdGFOdW0sIHByb2plY3ROYW1lKTtcbiAgLy8gY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xufTtcblxuY29uc3Qgc2V0RGF0YU51bSA9ICgpID0+IHtcbiAgY29uc3QgZGF0YW51bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1udW1dXCIpO1xuICByZXR1cm4gZGF0YW51bS5sZW5ndGg7XG59O1xuXG5mdW5jdGlvbiByZXNldERhdGFOdW0oKSB7XG4gIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpc3QpIHtcbiAgICBwcm9qZWN0LmRhdGFOdW0gPSBwcm9qZWN0TGlzdC5pbmRleE9mKHByb2plY3QpO1xuICB9XG59XG5cbmV4cG9ydCB7IHByb2plY3RMaXN0LCBwcm9qZWN0UHJvY2VzcywgcmVzZXREYXRhTnVtIH07XG4iLCJpbXBvcnQgeyBwcm9qZWN0TGlzdCB9IGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgeyB0YXNrVG9Eb20sIGRpc3BsYXlUYXNrcyB9IGZyb20gXCIuL2RvbS1ldmVudHNcIjtcblxuLy90YXNrIGZhY3RvcnlcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKGRhdGFOdW0sIGlkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgY29tcGxldGVkKSA9PiB7XG4gIHJldHVybiB7IGRhdGFOdW0sIGlkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgY29tcGxldGVkIH07XG59O1xuXG5sZXQgaWQgPSAoKSA9PiB7XG4gIHJldHVybiBwcm9qZWN0TGlzdFtzZWxlY3RlZCgpXS50YXNrcy5sZW5ndGg7XG59O1xuXG5mdW5jdGlvbiB0YXNrUHJvY2Vzcyh0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSkge1xuICBsZXQgbmV3SWQgPSBpZCgpO1xuICBsZXQgZGF0YU51bSA9IHNlbGVjdGVkKCk7XG4gIGxldCBuZXdUYXNrID0gdGFza0ZhY3RvcnkoZGF0YU51bSwgbmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBmYWxzZSk7XG4gIHByb2plY3RMaXN0W2RhdGFOdW1dLnRhc2tzLnB1c2gobmV3VGFzayk7XG5cbiAgdGFza1RvRG9tKG5ld0lkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkKCkge1xuICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1vYmpcIik7XG4gIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBpZiAocHJvamVjdC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgcmV0dXJuIHByb2plY3QuZGF0YXNldC5udW07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0RGF0YUlkKCkge1xuICBsZXQgdGFza0xpc3QgPSBwcm9qZWN0TGlzdFtzZWxlY3RlZCgpXS50YXNrcztcbiAgZm9yIChsZXQgdGFzayBvZiB0YXNrTGlzdCkge1xuICAgIHRhc2suaWQgPSB0YXNrTGlzdC5pbmRleE9mKHRhc2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm1FZGl0VGFzayhlKSB7XG4gIGxldCB0YXNrcyA9XG4gICAgcHJvamVjdExpc3Rbc2VsZWN0ZWQoKV0udGFza3NbZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmRhdGFzZXQuaWRdO1xuICBsZXQgbmV3VGl0bGUgPSBlLmNvbXBvc2VkUGF0aCgpWzJdLmZpcnN0Q2hpbGQuY2hpbGRyZW5bMV0udmFsdWU7XG4gIGxldCBuZXdEYXRlID0gZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmNoaWxkcmVuWzJdLnZhbHVlO1xuICBsZXQgbmV3RGV0YWlscyA9IGUuY29tcG9zZWRQYXRoKClbMl0uY2hpbGRyZW5bMV0uZmlyc3RDaGlsZC52YWx1ZTtcblxuICB0YXNrcy50aXRsZSA9IG5ld1RpdGxlO1xuICB0YXNrcy5kZXRhaWxzID0gbmV3RGV0YWlscztcbiAgdGFza3MuZHVlRGF0ZSA9IG5ld0RhdGU7XG5cbiAgZGlzcGxheVRhc2tzKHNlbGVjdGVkKCkpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxFZGl0VGFzaygpIHtcbiAgZGlzcGxheVRhc2tzKHNlbGVjdGVkKCkpO1xufVxuXG5sZXQgY29tcGxldGVUYXNrID0gKGUpID0+IHtcbiAgY29uc29sZS5sb2coZSk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJjaGVja2VkXCIpO1xuICBlLmNvbXBvc2VkUGF0aCgpWzFdLmNsYXNzTGlzdC50b2dnbGUoXCJjb21wbGV0ZWRcIik7XG4gIHByb2plY3RMaXN0W3NlbGVjdGVkKCldLnRhc2tzW1xuICAgIGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5kYXRhc2V0LmlkXG4gIF0uY29tcGxldGVkID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCB7XG4gIHRhc2tQcm9jZXNzLFxuICBzZWxlY3RlZCxcbiAgcmVzZXREYXRhSWQsXG4gIGNvbmZpcm1FZGl0VGFzayxcbiAgY2FuY2VsRWRpdFRhc2ssXG4gIGNvbXBsZXRlVGFzayxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2RvbS1ldmVudHMuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=