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
  deleteProject(e);
  selectProject(e);
  expandTask(e);
  deleteTask(e);
});
function deleteProject(e) {
  let element = e.target;
  let dataNum = e.composedPath()[1].dataset.num;
  if (element.classList.contains("kill-project")) {
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectList.splice(dataNum, 1);
    e.target.parentElement.remove();
    resetDomDataNum();
    (0,_projects__WEBPACK_IMPORTED_MODULE_0__.resetDataNum)();
  }
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
  let element = e.target;
  if (element.classList.contains("project-name")) {
    clearSelected();
    element.parentElement.classList.add("selected");
  }
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
  addProjectInput.value = "";
  addTaskContainer.classList.add("hidden");
  addTaskBtn.classList.remove("hidden");
});

confirmTaskBtn.addEventListener("click", () => {
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.taskProcess)(taskTitle.value, taskDetails.value, dueDate.value);
  addProjectInput.value = "";
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
  let element = e.target;
  if (element.classList.contains("expand-btn")) {
    element.classList.toggle("expand-up");
    element.parentElement.parentElement.nextSibling.classList.toggle("hidden");
  }
}

const resetDomDataId = () => {
  let domData = document.querySelectorAll("[data-id]");
  for (let data of domData) {
    data.dataset.id = Array.prototype.indexOf.call(domData, data);
  }
};

function deleteTask(e) {
  let element = e.target;
  let dataNum = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.selected)();
  let taskNum = e.composedPath()[2].dataset.id;
  if (element.classList.contains("delete-btn")) {
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectList[dataNum].tasks.splice(taskNum, 1);
    e.target.parentElement.parentElement.parentElement.remove();
    resetDomDataId();
    (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.resetDataId)();
  }
}



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdExpc3QsIHByb2plY3RQcm9jZXNzLCByZXNldERhdGFOdW0gfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHsgdGFza1Byb2Nlc3MsIHNlbGVjdGVkLCByZXNldERhdGFJZCB9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbi8vIHByb2plY3RzXG5jb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNvbnRhaW5lclwiKTtcbmNvbnN0IHByb2plY3RzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1idG5cIik7XG5jb25zdCBwcm9qZWN0c0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWZvcm1cIik7XG5jb25zdCBhZGRQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWlucHV0XCIpO1xuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtYnRuXCIpO1xuY29uc3QgY2FuY2VsUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXByb2plY3QtYnRuXCIpO1xuXG5wcm9qZWN0c0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBwcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgcHJvamVjdHNCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn0pO1xuXG5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHByb2plY3RQcm9jZXNzKGFkZFByb2plY3RJbnB1dC52YWx1ZSk7XG4gIGFkZFByb2plY3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIHByb2plY3RzRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICBwcm9qZWN0c0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkUHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgcHJvamVjdHNGb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIHByb2plY3RzQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGRlbGV0ZVByb2plY3QoZSk7XG4gIHNlbGVjdFByb2plY3QoZSk7XG4gIGV4cGFuZFRhc2soZSk7XG4gIGRlbGV0ZVRhc2soZSk7XG59KTtcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xuICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICBsZXQgZGF0YU51bSA9IGUuY29tcG9zZWRQYXRoKClbMV0uZGF0YXNldC5udW07XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImtpbGwtcHJvamVjdFwiKSkge1xuICAgIHByb2plY3RMaXN0LnNwbGljZShkYXRhTnVtLCAxKTtcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHJlc2V0RG9tRGF0YU51bSgpO1xuICAgIHJlc2V0RGF0YU51bSgpO1xuICB9XG59XG4vLyBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAocHJvamVjdExpc3QpID0+IHtcbi8vICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0TGlzdCkge1xuLy8gICAgIHByb2plY3RUb0RPTShwcm9qZWN0LmRhdGFOdW0sIHByb2plY3QucHJvamVjdE5hbWUpO1xuLy8gICB9XG4vLyB9O1xuXG5jb25zdCBwcm9qZWN0VG9ET00gPSAoZGF0YU51bSwgTmFtZSkgPT4ge1xuICBsZXQgcHJvamVjdE9iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBwcm9qZWN0SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICBjbGVhclNlbGVjdGVkKCk7XG5cbiAgcHJvamVjdE9iai5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1vYmpcIik7XG4gIHByb2plY3RPYmouY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICBwcm9qZWN0T2JqLmRhdGFzZXQubnVtID0gZGF0YU51bTtcbiAgcHJvamVjdEltZy5zcmMgPSBcIi4vaW1hZ2VzL2Zvcm1hdC1saXN0LWJ1bGxldGVkLXNxdWFyZS5wbmdcIjtcbiAgcHJvamVjdEltZy5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IE5hbWU7XG4gIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImtpbGwtcHJvamVjdFwiKTtcblxuICBwcm9qZWN0T2JqLmFwcGVuZENoaWxkKHByb2plY3RJbWcpO1xuICBwcm9qZWN0T2JqLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcbiAgcHJvamVjdE9iai5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcblxuICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RPYmopO1xufTtcblxuY29uc3QgcmVzZXREb21EYXRhTnVtID0gKCkgPT4ge1xuICBsZXQgZG9tRGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1udW1dXCIpO1xuICBmb3IgKGxldCBkYXRhIG9mIGRvbURhdGEpIHtcbiAgICBkYXRhLmRhdGFzZXQubnVtID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChkb21EYXRhLCBkYXRhKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2xlYXJTZWxlY3RlZCgpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtbmFtZVwiKTtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGlmIChwcm9qZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHByb2plY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSkge1xuICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LW5hbWVcIikpIHtcbiAgICBjbGVhclNlbGVjdGVkKCk7XG4gICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgfVxufVxuXG4vLyB0YXNrc1xuY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stYnRuXCIpO1xuY29uc3QgQWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsbC10YXNrcy1jb250YWluZXJcIik7XG5jb25zdCBhZGRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1jb250YWluZXJcIik7XG5jb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXRpdGxlXCIpO1xuY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWR1ZS1kYXRlXCIpO1xuY29uc3QgdGFza0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWRldGFpbHNcIik7XG5jb25zdCBjb25maXJtVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS10YXNrLWJ0blwiKTtcbmNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrLWJ0blwiKTtcblxuYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIGFkZFRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn0pO1xuXG5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFByb2plY3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgYWRkVGFza0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmNvbmZpcm1UYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHRhc2tQcm9jZXNzKHRhc2tUaXRsZS52YWx1ZSwgdGFza0RldGFpbHMudmFsdWUsIGR1ZURhdGUudmFsdWUpO1xuICBhZGRQcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICBhZGRUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIGFkZFRhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn0pO1xuXG5jb25zdCB0YXNrVG9Eb20gPSAobmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKSA9PiB7XG4gIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgY2hlY2tUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IGJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBleHBhbmRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBsZXQgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbGV0IGRldGFpbHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcbiAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgdGFzay5kYXRhc2V0LmlkID0gbmV3SWQ7XG4gIGNoZWNrVGFzay5jbGFzc0xpc3QuYWRkKFwiY2hlY2stdGFza1wiKTtcbiAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZHVlLWRhdGVcIik7XG4gIGJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1idG5zLWNvbnRhaW5lclwiKTtcbiAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmQtYnRuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRldGFpbHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stZGV0YWlsc1wiKTtcbiAgZGV0YWlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtdGFzay1idG5cIik7XG5cbiAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRldGFpbHM7XG4gIHRhc2tEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcblxuICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZXhwYW5kQnRuKTtcbiAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gIHRhc2suYXBwZW5kQ2hpbGQoY2hlY2tUYXNrKTtcbiAgdGFzay5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICB0YXNrLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgdGFzay5hcHBlbmRDaGlsZChidG5Db250YWluZXIpO1xuICBkZXRhaWxzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gIGRldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFzayk7XG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGV0YWlsc0NvbnRhaW5lcik7XG4gIEFsbFRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xufTtcblxuZnVuY3Rpb24gZXhwYW5kVGFzayhlKSB7XG4gIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImV4cGFuZC1idG5cIikpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmQtdXBcIik7XG4gICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgfVxufVxuXG5jb25zdCByZXNldERvbURhdGFJZCA9ICgpID0+IHtcbiAgbGV0IGRvbURhdGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtaWRdXCIpO1xuICBmb3IgKGxldCBkYXRhIG9mIGRvbURhdGEpIHtcbiAgICBkYXRhLmRhdGFzZXQuaWQgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGRvbURhdGEsIGRhdGEpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGUpIHtcbiAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgbGV0IGRhdGFOdW0gPSBzZWxlY3RlZCgpO1xuICBsZXQgdGFza051bSA9IGUuY29tcG9zZWRQYXRoKClbMl0uZGF0YXNldC5pZDtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWJ0blwiKSkge1xuICAgIHByb2plY3RMaXN0W2RhdGFOdW1dLnRhc2tzLnNwbGljZSh0YXNrTnVtLCAxKTtcbiAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICByZXNldERvbURhdGFJZCgpO1xuICAgIHJlc2V0RGF0YUlkKCk7XG4gIH1cbn1cbmV4cG9ydCB7IHByb2plY3RUb0RPTSwgdGFza1RvRG9tIH07XG4iLCJpbXBvcnQgeyBwcm9qZWN0VG9ET00gfSBmcm9tIFwiLi9kb20tZXZlbnRzXCI7XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gW107XG5cbi8vcHJvamVjdCBmYWN0b3J5XG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChkYXRhTnVtLCBwcm9qZWN0TmFtZSwgdGFza3MpID0+IHtcbiAgcmV0dXJuIHsgZGF0YU51bSwgcHJvamVjdE5hbWUsIHRhc2tzIH07XG59O1xuXG5jb25zdCBwcm9qZWN0UHJvY2VzcyA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAvLyAgIGxldCBuYW1lID0gcHJvamVjdE5hbWU7XG4gIGxldCBkYXRhTnVtID0gc2V0RGF0YU51bSgpO1xuICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KGRhdGFOdW0sIHByb2plY3ROYW1lLCBbXSk7XG4gIHByb2plY3RMaXN0LnB1c2gobmV3UHJvamVjdCk7XG4gIHByb2plY3RUb0RPTShkYXRhTnVtLCBwcm9qZWN0TmFtZSk7XG4gIC8vIGNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcbn07XG5cbmNvbnN0IHNldERhdGFOdW0gPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGFudW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbnVtXVwiKTtcbiAgcmV0dXJuIGRhdGFudW0ubGVuZ3RoO1xufTtcblxuZnVuY3Rpb24gcmVzZXREYXRhTnVtKCkge1xuICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaXN0KSB7XG4gICAgcHJvamVjdC5kYXRhTnVtID0gcHJvamVjdExpc3QuaW5kZXhPZihwcm9qZWN0KTtcbiAgfVxufVxuXG5leHBvcnQgeyBwcm9qZWN0TGlzdCwgcHJvamVjdFByb2Nlc3MsIHJlc2V0RGF0YU51bSB9O1xuIiwiaW1wb3J0IHsgcHJvamVjdExpc3QgfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHsgdGFza1RvRG9tIH0gZnJvbSBcIi4vZG9tLWV2ZW50c1wiO1xuXG4vL3Rhc2sgZmFjdG9yeVxuY29uc3QgdGFza0ZhY3RvcnkgPSAoZGF0YU51bSwgaWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQpID0+IHtcbiAgcmV0dXJuIHsgZGF0YU51bSwgaWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBjb21wbGV0ZWQgfTtcbn07XG5cbmxldCBpZCA9ICgpID0+IHtcbiAgcmV0dXJuIHByb2plY3RMaXN0W3NlbGVjdGVkKCldLnRhc2tzLmxlbmd0aDtcbn07XG5cbmZ1bmN0aW9uIHRhc2tQcm9jZXNzKHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKSB7XG4gIGxldCBuZXdJZCA9IGlkKCk7XG4gIGxldCBkYXRhTnVtID0gc2VsZWN0ZWQoKTtcbiAgbGV0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeShkYXRhTnVtLCBuZXdJZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGZhbHNlKTtcbiAgcHJvamVjdExpc3RbZGF0YU51bV0udGFza3MucHVzaChuZXdUYXNrKTtcblxuICB0YXNrVG9Eb20obmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0ZWQoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LW9ialwiKTtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGlmIChwcm9qZWN0LmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICByZXR1cm4gcHJvamVjdC5kYXRhc2V0Lm51bTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXREYXRhSWQoKSB7XG4gIGxldCB0YXNrTGlzdCA9IHByb2plY3RMaXN0W3NlbGVjdGVkKCldLnRhc2tzO1xuICBmb3IgKGxldCB0YXNrIG9mIHRhc2tMaXN0KSB7XG4gICAgdGFzay5pZCA9IHRhc2tMaXN0LmluZGV4T2YodGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IHsgdGFza1Byb2Nlc3MsIHNlbGVjdGVkLCByZXNldERhdGFJZCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9kb20tZXZlbnRzLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9