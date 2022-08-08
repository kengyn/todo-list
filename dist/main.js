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
  let element = e.target;
  if (element.classList.contains("project-name")) {
    clearSelected();
    element.parentElement.classList.add("selected");
    displayTasks(element.parentElement.dataset.num);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20tZXZlbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RMaXN0LCBwcm9qZWN0UHJvY2VzcywgcmVzZXREYXRhTnVtIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7IHRhc2tQcm9jZXNzLCBzZWxlY3RlZCwgcmVzZXREYXRhSWQgfSBmcm9tIFwiLi90YXNrc1wiO1xuXG4vLyBwcm9qZWN0c1xuY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtYnRuXCIpO1xuY29uc3QgcHJvamVjdHNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1mb3JtXCIpO1xuY29uc3QgYWRkUHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1pbnB1dFwiKTtcbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWJ0blwiKTtcbmNvbnN0IGNhbmNlbFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1wcm9qZWN0LWJ0blwiKTtcblxucHJvamVjdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcHJvamVjdHNGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIHByb2plY3RzQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59KTtcblxuYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBwcm9qZWN0UHJvY2VzcyhhZGRQcm9qZWN0SW5wdXQudmFsdWUpO1xuICBhZGRQcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICBwcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgcHJvamVjdHNCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn0pO1xuXG5jYW5jZWxQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFByb2plY3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIHByb2plY3RzRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICBwcm9qZWN0c0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBkZWxldGVQcm9qZWN0KGUpO1xuICBzZWxlY3RQcm9qZWN0KGUpO1xuICBleHBhbmRUYXNrKGUpO1xuICBkZWxldGVUYXNrKGUpO1xufSk7XG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcbiAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgbGV0IGRhdGFOdW0gPSBlLmNvbXBvc2VkUGF0aCgpWzFdLmRhdGFzZXQubnVtO1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJraWxsLXByb2plY3RcIikpIHtcbiAgICBwcm9qZWN0TGlzdC5zcGxpY2UoZGF0YU51bSwgMSk7XG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICByZXNldERvbURhdGFOdW0oKTtcbiAgICByZXNldERhdGFOdW0oKTtcbiAgfVxufVxuLy8gY29uc3QgZGlzcGxheVByb2plY3RzID0gKHByb2plY3RMaXN0KSA9PiB7XG4vLyAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpc3QpIHtcbi8vICAgICBwcm9qZWN0VG9ET00ocHJvamVjdC5kYXRhTnVtLCBwcm9qZWN0LnByb2plY3ROYW1lKTtcbi8vICAgfVxuLy8gfTtcblxuY29uc3QgcHJvamVjdFRvRE9NID0gKGRhdGFOdW0sIE5hbWUpID0+IHtcbiAgbGV0IHByb2plY3RPYmogPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgcHJvamVjdEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGxldCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsZXQgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgY2xlYXJTZWxlY3RlZCgpO1xuXG4gIHByb2plY3RPYmouY2xhc3NMaXN0LmFkZChcInByb2plY3Qtb2JqXCIpO1xuICBwcm9qZWN0T2JqLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgcHJvamVjdE9iai5kYXRhc2V0Lm51bSA9IGRhdGFOdW07XG4gIHByb2plY3RJbWcuc3JjID0gXCIuL2ltYWdlcy9mb3JtYXQtbGlzdC1idWxsZXRlZC1zcXVhcmUucG5nXCI7XG4gIHByb2plY3RJbWcuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcbiAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBOYW1lO1xuICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJraWxsLXByb2plY3RcIik7XG5cbiAgcHJvamVjdE9iai5hcHBlbmRDaGlsZChwcm9qZWN0SW1nKTtcbiAgcHJvamVjdE9iai5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gIHByb2plY3RPYmouYXBwZW5kQ2hpbGQocHJvamVjdEJ0bik7XG5cbiAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0T2JqKTtcblxuICBkaXNwbGF5VGFza3MoZGF0YU51bSk7XG59O1xuXG5jb25zdCByZXNldERvbURhdGFOdW0gPSAoKSA9PiB7XG4gIGxldCBkb21EYXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW51bV1cIik7XG4gIGZvciAobGV0IGRhdGEgb2YgZG9tRGF0YSkge1xuICAgIGRhdGEuZGF0YXNldC5udW0gPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGRvbURhdGEsIGRhdGEpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGVhclNlbGVjdGVkKCkge1xuICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1uYW1lXCIpO1xuICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgaWYgKHByb2plY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgcHJvamVjdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0UHJvamVjdChlKSB7XG4gIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3QtbmFtZVwiKSkge1xuICAgIGNsZWFyU2VsZWN0ZWQoKTtcbiAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIGRpc3BsYXlUYXNrcyhlbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5udW0pO1xuICB9XG59XG5cbi8vIHRhc2tzXG5jb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1idG5cIik7XG5jb25zdCBBbGxUYXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxsLXRhc2tzLWNvbnRhaW5lclwiKTtcbmNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWNvbnRhaW5lclwiKTtcbmNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stdGl0bGVcIik7XG5jb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZHVlLWRhdGVcIik7XG5jb25zdCB0YXNrRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZGV0YWlsc1wiKTtcbmNvbnN0IGNvbmZpcm1UYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb25maXJtLXRhc2stYnRuXCIpO1xuY29uc3QgY2FuY2VsVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXRhc2stYnRuXCIpO1xuXG5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgYWRkVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufSk7XG5cbmNhbmNlbFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgdGFza0RldGFpbHMudmFsdWUgPSBcIlwiO1xuICBkdWVEYXRlLnZhbHVlID0gXCJcIjtcbiAgYWRkVGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59KTtcblxuY29uZmlybVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdGFza1Byb2Nlc3ModGFza1RpdGxlLnZhbHVlLCB0YXNrRGV0YWlscy52YWx1ZSwgZHVlRGF0ZS52YWx1ZSk7XG4gIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gIHRhc2tEZXRhaWxzLnZhbHVlID0gXCJcIjtcbiAgZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG4gIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgYWRkVGFza0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmNvbnN0IHRhc2tUb0RvbSA9IChuZXdJZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUpID0+IHtcbiAgbGV0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBjaGVja1Rhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsZXQgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IGV4cGFuZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGxldCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBsZXQgZGV0YWlsc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stY29udGFpbmVyXCIpO1xuICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICB0YXNrLmRhdGFzZXQuaWQgPSBuZXdJZDtcbiAgY2hlY2tUYXNrLmNsYXNzTGlzdC5hZGQoXCJjaGVjay10YXNrXCIpO1xuICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZChcInRhc2stdGl0bGVcIik7XG4gIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoXCJkdWUtZGF0ZVwiKTtcbiAgYnRuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWJ0bnMtY29udGFpbmVyXCIpO1xuICBleHBhbmRCdG4uY2xhc3NMaXN0LmFkZChcImV4cGFuZC1idG5cIik7XG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ0blwiKTtcbiAgZGV0YWlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1kZXRhaWxzXCIpO1xuICBkZXRhaWxzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIHRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1kZXNjcmlwdGlvblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC10YXNrLWJ0blwiKTtcblxuICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGV0YWlscztcbiAgdGFza0RhdGUudGV4dENvbnRlbnQgPSBkdWVEYXRlO1xuXG4gIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChleHBhbmRCdG4pO1xuICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcbiAgdGFzay5hcHBlbmRDaGlsZChjaGVja1Rhc2spO1xuICB0YXNrLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG4gIHRhc2suYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICB0YXNrLmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lcik7XG4gIGRldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgZGV0YWlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnRuKTtcbiAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbiAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXRhaWxzQ29udGFpbmVyKTtcbiAgQWxsVGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG59O1xuXG5mdW5jdGlvbiBleHBhbmRUYXNrKGUpIHtcbiAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZXhwYW5kLWJ0blwiKSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZC11cFwiKTtcbiAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5uZXh0U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbmNvbnN0IHJlc2V0RG9tRGF0YUlkID0gKCkgPT4ge1xuICBsZXQgZG9tRGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1pZF1cIik7XG4gIGZvciAobGV0IGRhdGEgb2YgZG9tRGF0YSkge1xuICAgIGRhdGEuZGF0YXNldC5pZCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZG9tRGF0YSwgZGF0YSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSkge1xuICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuICBsZXQgZGF0YU51bSA9IHNlbGVjdGVkKCk7XG4gIGxldCB0YXNrTnVtID0gZS5jb21wb3NlZFBhdGgoKVsyXS5kYXRhc2V0LmlkO1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtYnRuXCIpKSB7XG4gICAgcHJvamVjdExpc3RbZGF0YU51bV0udGFza3Muc3BsaWNlKHRhc2tOdW0sIDEpO1xuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHJlc2V0RG9tRGF0YUlkKCk7XG4gICAgcmVzZXREYXRhSWQoKTtcbiAgfVxufVxuXG5sZXQgZGlzcGxheVRhc2tzID0gKHByb2plY3QpID0+IHtcbiAgQWxsVGFza3NDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGxldCBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0TGlzdFtwcm9qZWN0XS50YXNrcztcbiAgZm9yIChsZXQgdGFzayBvZiBzZWxlY3RlZFByb2plY3QpIHtcbiAgICB0YXNrVG9Eb20odGFzay5pZCwgdGFzay50aXRsZSwgdGFzay5kZXRhaWxzLCB0YXNrLmR1ZURhdGUpO1xuICB9XG59O1xuXG5leHBvcnQgeyBwcm9qZWN0VG9ET00sIHRhc2tUb0RvbSB9O1xuIiwiaW1wb3J0IHsgcHJvamVjdFRvRE9NIH0gZnJvbSBcIi4vZG9tLWV2ZW50c1wiO1xuXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xuXG4vL3Byb2plY3QgZmFjdG9yeVxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoZGF0YU51bSwgcHJvamVjdE5hbWUsIHRhc2tzKSA9PiB7XG4gIHJldHVybiB7IGRhdGFOdW0sIHByb2plY3ROYW1lLCB0YXNrcyB9O1xufTtcblxuY29uc3QgcHJvamVjdFByb2Nlc3MgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgLy8gICBsZXQgbmFtZSA9IHByb2plY3ROYW1lO1xuICBsZXQgZGF0YU51bSA9IHNldERhdGFOdW0oKTtcbiAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0RmFjdG9yeShkYXRhTnVtLCBwcm9qZWN0TmFtZSwgW10pO1xuICBwcm9qZWN0TGlzdC5wdXNoKG5ld1Byb2plY3QpO1xuICBwcm9qZWN0VG9ET00oZGF0YU51bSwgcHJvamVjdE5hbWUpO1xuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG59O1xuXG5jb25zdCBzZXREYXRhTnVtID0gKCkgPT4ge1xuICBjb25zdCBkYXRhbnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW51bV1cIik7XG4gIHJldHVybiBkYXRhbnVtLmxlbmd0aDtcbn07XG5cbmZ1bmN0aW9uIHJlc2V0RGF0YU51bSgpIHtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0TGlzdCkge1xuICAgIHByb2plY3QuZGF0YU51bSA9IHByb2plY3RMaXN0LmluZGV4T2YocHJvamVjdCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgcHJvamVjdExpc3QsIHByb2plY3RQcm9jZXNzLCByZXNldERhdGFOdW0gfTtcbiIsImltcG9ydCB7IHByb2plY3RMaXN0IH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7IHRhc2tUb0RvbSB9IGZyb20gXCIuL2RvbS1ldmVudHNcIjtcblxuLy90YXNrIGZhY3RvcnlcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKGRhdGFOdW0sIGlkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgY29tcGxldGVkKSA9PiB7XG4gIHJldHVybiB7IGRhdGFOdW0sIGlkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgY29tcGxldGVkIH07XG59O1xuXG5sZXQgaWQgPSAoKSA9PiB7XG4gIHJldHVybiBwcm9qZWN0TGlzdFtzZWxlY3RlZCgpXS50YXNrcy5sZW5ndGg7XG59O1xuXG5mdW5jdGlvbiB0YXNrUHJvY2Vzcyh0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSkge1xuICBsZXQgbmV3SWQgPSBpZCgpO1xuICBsZXQgZGF0YU51bSA9IHNlbGVjdGVkKCk7XG4gIGxldCBuZXdUYXNrID0gdGFza0ZhY3RvcnkoZGF0YU51bSwgbmV3SWQsIHRpdGxlLCBkZXRhaWxzLCBkdWVEYXRlLCBmYWxzZSk7XG4gIHByb2plY3RMaXN0W2RhdGFOdW1dLnRhc2tzLnB1c2gobmV3VGFzayk7XG5cbiAgdGFza1RvRG9tKG5ld0lkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkKCkge1xuICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1vYmpcIik7XG4gIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBpZiAocHJvamVjdC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgcmV0dXJuIHByb2plY3QuZGF0YXNldC5udW07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0RGF0YUlkKCkge1xuICBsZXQgdGFza0xpc3QgPSBwcm9qZWN0TGlzdFtzZWxlY3RlZCgpXS50YXNrcztcbiAgZm9yIChsZXQgdGFzayBvZiB0YXNrTGlzdCkge1xuICAgIHRhc2suaWQgPSB0YXNrTGlzdC5pbmRleE9mKHRhc2spO1xuICB9XG59XG5cbmV4cG9ydCB7IHRhc2tQcm9jZXNzLCBzZWxlY3RlZCwgcmVzZXREYXRhSWQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZG9tLWV2ZW50cy5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==