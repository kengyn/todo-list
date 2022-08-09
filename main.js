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
(0,_tasks__WEBPACK_IMPORTED_MODULE_2__.taskProcess)("take finn out", "he need to doodoo reaal bad", "2022-08-08");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksa0RBQVc7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUseURBQVk7QUFDZDs7QUFFQTtBQUNBLEVBQUUseURBQVk7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsa0RBQVc7QUFDYjtBQUNBO0FBQ0E7O0FBU0U7Ozs7Ozs7VUN2RUY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDRnNCOztBQUVzQjtBQUNOOztBQUV0QyxrRUFBcUI7QUFDckIsaUVBQW9CO0FBQ3BCLCtEQUFrQjs7QUFFbEIseURBQWM7QUFDZCxtREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20tZXZlbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RMaXN0LCBwcm9qZWN0UHJvY2VzcywgcmVzZXREYXRhTnVtIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7XG4gIHRhc2tQcm9jZXNzLFxuICBzZWxlY3RlZCxcbiAgcmVzZXREYXRhSWQsXG4gIGNvbmZpcm1FZGl0VGFzayxcbiAgY2FuY2VsRWRpdFRhc2ssXG4gIGNvbXBsZXRlVGFzayxcbn0gZnJvbSBcIi4vdGFza3NcIjtcblxuLy8gcHJvamVjdHNcblxuZnVuY3Rpb24gcHJvamVjdEV2ZW50TGlzdGVuZXJzKCkge1xuICBjb25zdCBwcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtYnRuXCIpO1xuICBjb25zdCBwcm9qZWN0c0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWZvcm1cIik7XG4gIGNvbnN0IGFkZFByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtaW5wdXRcIik7XG4gIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LWJ0blwiKTtcbiAgY29uc3QgY2FuY2VsUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXByb2plY3QtYnRuXCIpO1xuXG4gIHByb2plY3RzQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdHNGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgcHJvamVjdHNCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RQcm9jZXNzKGFkZFByb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgYWRkUHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICBwcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBwcm9qZWN0c0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9KTtcblxuICBjYW5jZWxQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWRkUHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICBwcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBwcm9qZWN0c0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYnV0dG9uRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwia2lsbC1wcm9qZWN0XCIpKSB7XG4gICAgICBkZWxldGVQcm9qZWN0KGUpO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LW5hbWVcIikpIHtcbiAgICAgIHNlbGVjdFByb2plY3QoZWxlbWVudCk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImV4cGFuZC1idG5cIikpIHtcbiAgICAgIGV4cGFuZFRhc2soZWxlbWVudCk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZS1idG5cIikpIHtcbiAgICAgIGRlbGV0ZVRhc2soZSk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtdGFzay1idG5cIikpIHtcbiAgICAgIGFkZEVkaXRGb3JtKGUpO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWNvbmZpcm0tYnRuXCIpKSB7XG4gICAgICBjb25maXJtRWRpdFRhc2soZSk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtY2FuY2VsLWJ0blwiKSkge1xuICAgICAgY2FuY2VsRWRpdFRhc2soZSk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNoZWNrLXRhc2tcIikpIHtcbiAgICAgIGNvbXBsZXRlVGFzayhlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcbiAgbGV0IGRhdGFOdW0gPSBlLmNvbXBvc2VkUGF0aCgpWzFdLmRhdGFzZXQubnVtO1xuICBwcm9qZWN0TGlzdC5zcGxpY2UoZGF0YU51bSwgMSk7XG4gIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIHJlc2V0RG9tRGF0YU51bSgpO1xuICByZXNldERhdGFOdW0oKTtcbn1cblxuY29uc3QgcHJvamVjdFRvRE9NID0gKGRhdGFOdW0sIE5hbWUpID0+IHtcbiAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1jb250YWluZXJcIik7XG4gIGxldCBwcm9qZWN0T2JqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHByb2plY3RJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBsZXQgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIGNsZWFyU2VsZWN0ZWQoKTtcblxuICBwcm9qZWN0T2JqLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW9ialwiKTtcbiAgcHJvamVjdE9iai5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gIHByb2plY3RPYmouZGF0YXNldC5udW0gPSBkYXRhTnVtO1xuICBwcm9qZWN0SW1nLnNyYyA9IFwiLi9pbWFnZXMvZm9ybWF0LWxpc3QtYnVsbGV0ZWQtc3F1YXJlLnBuZ1wiO1xuICBwcm9qZWN0SW1nLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gTmFtZTtcbiAgcHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcbiAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwia2lsbC1wcm9qZWN0XCIpO1xuXG4gIHByb2plY3RPYmouYXBwZW5kQ2hpbGQocHJvamVjdEltZyk7XG4gIHByb2plY3RPYmouYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICBwcm9qZWN0T2JqLmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xuXG4gIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdE9iaik7XG5cbiAgZGlzcGxheVRhc2tzKGRhdGFOdW0pO1xufTtcblxuY29uc3QgcmVzZXREb21EYXRhTnVtID0gKCkgPT4ge1xuICBsZXQgZG9tRGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1udW1dXCIpO1xuICBmb3IgKGxldCBkYXRhIG9mIGRvbURhdGEpIHtcbiAgICBkYXRhLmRhdGFzZXQubnVtID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChkb21EYXRhLCBkYXRhKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2xlYXJTZWxlY3RlZCgpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtbmFtZVwiKTtcbiAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGlmIChwcm9qZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHByb2plY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSkge1xuICBjbGVhclNlbGVjdGVkKCk7XG4gIGUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gIGRpc3BsYXlUYXNrcyhlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5udW0pO1xufVxuXG4vLyB0YXNrc1xuZnVuY3Rpb24gdGFza0V2ZW50TGlzdGVuZXJzKCkge1xuICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1idG5cIik7XG4gIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay10aXRsZVwiKTtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWR1ZS1kYXRlXCIpO1xuICBjb25zdCB0YXNrRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stZGV0YWlsc1wiKTtcbiAgY29uc3QgY29uZmlybVRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tdGFzay1idG5cIik7XG4gIGNvbnN0IGNhbmNlbFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC10YXNrLWJ0blwiKTtcblxuICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWRkVGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG5cbiAgY2FuY2VsVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0RldGFpbHMudmFsdWUgPSBcIlwiO1xuICAgIGR1ZURhdGUudmFsdWUgPSBcIlwiO1xuICAgIGFkZFRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBhZGRUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0pO1xuXG4gIGNvbmZpcm1UYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICBhbGVydChcIm1ha2UgcHJvamVjdCBmaXJzdFwiKTtcbiAgICB9XG4gICAgdGFza1Byb2Nlc3ModGFza1RpdGxlLnZhbHVlLCB0YXNrRGV0YWlscy52YWx1ZSwgZHVlRGF0ZS52YWx1ZSk7XG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgICB0YXNrRGV0YWlscy52YWx1ZSA9IFwiXCI7XG4gICAgZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG4gICAgYWRkVGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGFkZFRhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSk7XG59XG5cbmNvbnN0IHRhc2tUb0RvbSA9IChuZXdJZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUpID0+IHtcbiAgY29uc3QgQWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsbC10YXNrcy1jb250YWluZXJcIik7XG4gIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgY2hlY2tUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGV0IGJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCBleHBhbmRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBsZXQgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbGV0IGRldGFpbHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxldCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRhaW5lclwiKTtcbiAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgdGFzay5kYXRhc2V0LmlkID0gbmV3SWQ7XG4gIGNoZWNrVGFzay5jbGFzc0xpc3QuYWRkKFwiY2hlY2stdGFza1wiKTtcbiAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXRpdGxlXCIpO1xuICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZHVlLWRhdGVcIik7XG4gIGJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1idG5zLWNvbnRhaW5lclwiKTtcbiAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmQtYnRuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRldGFpbHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stZGV0YWlsc1wiKTtcbiAgZGV0YWlsc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtdGFzay1idG5cIik7XG5cbiAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRldGFpbHM7XG4gIHRhc2tEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcblxuICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZXhwYW5kQnRuKTtcbiAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gIHRhc2suYXBwZW5kQ2hpbGQoY2hlY2tUYXNrKTtcbiAgdGFzay5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICB0YXNrLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgdGFzay5hcHBlbmRDaGlsZChidG5Db250YWluZXIpO1xuICBkZXRhaWxzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gIGRldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFzayk7XG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZGV0YWlsc0NvbnRhaW5lcik7XG4gIEFsbFRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xufTtcblxuZnVuY3Rpb24gZXhwYW5kVGFzayhlKSB7XG4gIGUuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZC11cFwiKTtcbiAgZS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbn1cblxuY29uc3QgcmVzZXREb21EYXRhSWQgPSAoKSA9PiB7XG4gIGxldCBkb21EYXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWlkXVwiKTtcbiAgZm9yIChsZXQgZGF0YSBvZiBkb21EYXRhKSB7XG4gICAgZGF0YS5kYXRhc2V0LmlkID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChkb21EYXRhLCBkYXRhKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZGVsZXRlVGFzayhlKSB7XG4gIGxldCBkYXRhTnVtID0gc2VsZWN0ZWQoKTtcbiAgbGV0IHRhc2tOdW0gPSBlLmNvbXBvc2VkUGF0aCgpWzJdLmRhdGFzZXQuaWQ7XG4gIHByb2plY3RMaXN0W2RhdGFOdW1dLnRhc2tzLnNwbGljZSh0YXNrTnVtLCAxKTtcbiAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIHJlc2V0RG9tRGF0YUlkKCk7XG4gIHJlc2V0RGF0YUlkKCk7XG4gIC8vIH1cbn1cblxuZnVuY3Rpb24gYWRkRWRpdEZvcm0oZSkge1xuICBsZXQgZWRpdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGxldCBlZGl0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgZWRpdERhdGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gIGxldCBlZGl0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgbGV0IGVkaXRCdG5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgZWRpdENvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBsZXQgZWRpdENhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgZWRpdE5hbWUuY2xhc3NMaXN0LmFkZChcImVkaXQtbmFtZS1pbnB1dFwiKTtcbiAgZWRpdERhdGUuY2xhc3NMaXN0LmFkZChcImVkaXQtZGF0ZS1pbnB1dFwiKTtcbiAgZWRpdERldGFpbHMuY2xhc3NMaXN0LmFkZChcImVkaXQtZGV0YWlscy1pbnB1dFwiKTtcbiAgZWRpdEJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG4tY29udGFpbmVyXCIpO1xuICBlZGl0Q29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1jb25maXJtLWJ0blwiKTtcbiAgZWRpdENhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1jYW5jZWwtYnRuXCIpO1xuXG4gIGVkaXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gXCJDb25maXJtXCI7XG4gIGVkaXRDYW5jZWxCdG4udGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG4gIGVkaXROYW1lLnZhbHVlID0gZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmNoaWxkcmVuWzFdLmlubmVyVGV4dDtcbiAgZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmNoaWxkcmVuWzFdLnJlcGxhY2VXaXRoKGVkaXROYW1lKTtcblxuICBlZGl0RGF0ZS52YWx1ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsyXS5pbm5lclRleHQ7XG4gIGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsyXS5yZXBsYWNlV2l0aChlZGl0RGF0ZSk7XG5cbiAgZWRpdERldGFpbHMudmFsdWUgPSBlLmNvbXBvc2VkUGF0aCgpWzFdLmZpcnN0Q2hpbGQuaW5uZXJUZXh0O1xuICBlLmNvbXBvc2VkUGF0aCgpWzFdLmZpcnN0Q2hpbGQucmVwbGFjZVdpdGgoZWRpdERldGFpbHMpO1xuXG4gIGVkaXRCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdENvbmZpcm1CdG4pO1xuICBlZGl0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRDYW5jZWxCdG4pO1xuXG4gIGUuY29tcG9zZWRQYXRoKClbMl0uYXBwZW5kQ2hpbGQoZWRpdEJ0bkNvbnRhaW5lcik7XG59XG5cbmxldCBkaXNwbGF5VGFza3MgPSAocHJvamVjdCkgPT4ge1xuICBjb25zdCBBbGxUYXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxsLXRhc2tzLWNvbnRhaW5lclwiKTtcbiAgQWxsVGFza3NDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGxldCBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0TGlzdFtwcm9qZWN0XS50YXNrcztcbiAgZm9yIChsZXQgdGFzayBvZiBzZWxlY3RlZFByb2plY3QpIHtcbiAgICB0YXNrVG9Eb20odGFzay5pZCwgdGFzay50aXRsZSwgdGFzay5kZXRhaWxzLCB0YXNrLmR1ZURhdGUpO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBwcm9qZWN0RXZlbnRMaXN0ZW5lcnMsXG4gIGJ1dHRvbkV2ZW50TGlzdGVuZXJzLFxuICB0YXNrRXZlbnRMaXN0ZW5lcnMsXG4gIHByb2plY3RUb0RPTSxcbiAgdGFza1RvRG9tLFxuICBkaXNwbGF5VGFza3MsXG59O1xuIiwiaW1wb3J0IHsgcHJvamVjdFRvRE9NIH0gZnJvbSBcIi4vZG9tLWV2ZW50c1wiO1xuXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xuXG4vL3Byb2plY3QgZmFjdG9yeVxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoZGF0YU51bSwgcHJvamVjdE5hbWUsIHRhc2tzKSA9PiB7XG4gIHJldHVybiB7IGRhdGFOdW0sIHByb2plY3ROYW1lLCB0YXNrcyB9O1xufTtcblxuY29uc3QgcHJvamVjdFByb2Nlc3MgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgbGV0IGRhdGFOdW0gPSBzZXREYXRhTnVtKCk7XG4gIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkoZGF0YU51bSwgcHJvamVjdE5hbWUsIFtdKTtcbiAgcHJvamVjdExpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgcHJvamVjdFRvRE9NKGRhdGFOdW0sIHByb2plY3ROYW1lKTtcbn07XG5cbmNvbnN0IHNldERhdGFOdW0gPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGFudW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbnVtXVwiKTtcbiAgcmV0dXJuIGRhdGFudW0ubGVuZ3RoO1xufTtcblxuZnVuY3Rpb24gcmVzZXREYXRhTnVtKCkge1xuICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaXN0KSB7XG4gICAgcHJvamVjdC5kYXRhTnVtID0gcHJvamVjdExpc3QuaW5kZXhPZihwcm9qZWN0KTtcbiAgfVxufVxuXG5leHBvcnQgeyBwcm9qZWN0TGlzdCwgcHJvamVjdFByb2Nlc3MsIHJlc2V0RGF0YU51bSB9O1xuIiwiaW1wb3J0IHsgcHJvamVjdExpc3QgfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHsgdGFza1RvRG9tLCBkaXNwbGF5VGFza3MgfSBmcm9tIFwiLi9kb20tZXZlbnRzXCI7XG5cbi8vdGFzayBmYWN0b3J5XG5jb25zdCB0YXNrRmFjdG9yeSA9IChkYXRhTnVtLCBpZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGNvbXBsZXRlZCkgPT4ge1xuICByZXR1cm4geyBkYXRhTnVtLCBpZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUsIGNvbXBsZXRlZCB9O1xufTtcblxubGV0IGlkID0gKCkgPT4ge1xuICByZXR1cm4gcHJvamVjdExpc3Rbc2VsZWN0ZWQoKV0udGFza3MubGVuZ3RoO1xufTtcblxuZnVuY3Rpb24gdGFza1Byb2Nlc3ModGl0bGUsIGRldGFpbHMsIGR1ZURhdGUpIHtcbiAgbGV0IG5ld0lkID0gaWQoKTtcbiAgbGV0IGRhdGFOdW0gPSBzZWxlY3RlZCgpO1xuICBsZXQgbmV3VGFzayA9IHRhc2tGYWN0b3J5KGRhdGFOdW0sIG5ld0lkLCB0aXRsZSwgZGV0YWlscywgZHVlRGF0ZSwgZmFsc2UpO1xuICBwcm9qZWN0TGlzdFtkYXRhTnVtXS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuXG4gIHRhc2tUb0RvbShuZXdJZCwgdGl0bGUsIGRldGFpbHMsIGR1ZURhdGUpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RlZCgpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3Qtb2JqXCIpO1xuICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgaWYgKHByb2plY3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHJldHVybiBwcm9qZWN0LmRhdGFzZXQubnVtO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldERhdGFJZCgpIHtcbiAgbGV0IHRhc2tMaXN0ID0gcHJvamVjdExpc3Rbc2VsZWN0ZWQoKV0udGFza3M7XG4gIGZvciAobGV0IHRhc2sgb2YgdGFza0xpc3QpIHtcbiAgICB0YXNrLmlkID0gdGFza0xpc3QuaW5kZXhPZih0YXNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb25maXJtRWRpdFRhc2soZSkge1xuICBsZXQgdGFza3MgPVxuICAgIHByb2plY3RMaXN0W3NlbGVjdGVkKCldLnRhc2tzW2UuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5kYXRhc2V0LmlkXTtcbiAgbGV0IG5ld1RpdGxlID0gZS5jb21wb3NlZFBhdGgoKVsyXS5maXJzdENoaWxkLmNoaWxkcmVuWzFdLnZhbHVlO1xuICBsZXQgbmV3RGF0ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uZmlyc3RDaGlsZC5jaGlsZHJlblsyXS52YWx1ZTtcbiAgbGV0IG5ld0RldGFpbHMgPSBlLmNvbXBvc2VkUGF0aCgpWzJdLmNoaWxkcmVuWzFdLmZpcnN0Q2hpbGQudmFsdWU7XG5cbiAgdGFza3MudGl0bGUgPSBuZXdUaXRsZTtcbiAgdGFza3MuZGV0YWlscyA9IG5ld0RldGFpbHM7XG4gIHRhc2tzLmR1ZURhdGUgPSBuZXdEYXRlO1xuXG4gIGRpc3BsYXlUYXNrcyhzZWxlY3RlZCgpKTtcbn1cblxuZnVuY3Rpb24gY2FuY2VsRWRpdFRhc2soKSB7XG4gIGRpc3BsYXlUYXNrcyhzZWxlY3RlZCgpKTtcbn1cblxubGV0IGNvbXBsZXRlVGFzayA9IChlKSA9PiB7XG4gIGNvbnNvbGUubG9nKGUpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiY2hlY2tlZFwiKTtcbiAgZS5jb21wb3NlZFBhdGgoKVsxXS5jbGFzc0xpc3QudG9nZ2xlKFwiY29tcGxldGVkXCIpO1xuICBwcm9qZWN0TGlzdFtzZWxlY3RlZCgpXS50YXNrc1tcbiAgICBlLmNvbXBvc2VkUGF0aCgpWzJdLmZpcnN0Q2hpbGQuZGF0YXNldC5pZFxuICBdLmNvbXBsZXRlZCA9IHRydWU7XG59O1xuXG5leHBvcnQge1xuICB0YXNrUHJvY2VzcyxcbiAgc2VsZWN0ZWQsXG4gIHJlc2V0RGF0YUlkLFxuICBjb25maXJtRWRpdFRhc2ssXG4gIGNhbmNlbEVkaXRUYXNrLFxuICBjb21wbGV0ZVRhc2ssXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBwcm9qZWN0RXZlbnRMaXN0ZW5lcnMsXG4gIGJ1dHRvbkV2ZW50TGlzdGVuZXJzLFxuICB0YXNrRXZlbnRMaXN0ZW5lcnMsXG59IGZyb20gXCIuL2RvbS1ldmVudHNcIjtcblxuaW1wb3J0IHsgcHJvamVjdFByb2Nlc3MgfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHsgdGFza1Byb2Nlc3MgfSBmcm9tIFwiLi90YXNrc1wiO1xuXG5wcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbmJ1dHRvbkV2ZW50TGlzdGVuZXJzKCk7XG50YXNrRXZlbnRMaXN0ZW5lcnMoKTtcblxucHJvamVjdFByb2Nlc3MoXCJwcm9qZWN0IDFcIik7XG50YXNrUHJvY2VzcyhcInRha2UgZmlubiBvdXRcIiwgXCJoZSBuZWVkIHRvIGRvb2RvbyByZWFhbCBiYWRcIiwgXCIyMDIyLTA4LTA4XCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9