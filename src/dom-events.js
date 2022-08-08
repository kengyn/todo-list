import { projectList, projectProcess, resetDataNum } from "./projects";
import { taskProcess, selected, resetDataId } from "./tasks";

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
  projectProcess(addProjectInput.value);
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
    confirmEditTask(e);
  }
  if (element.classList.contains("edit-cancel-btn")) {
    cancelEditTask(e);
  }
});
function deleteProject(e) {
  // let element = e.target;
  let dataNum = e.composedPath()[1].dataset.num;
  // if (element.classList.contains("kill-project")) {
  projectList.splice(dataNum, 1);
  e.target.parentElement.remove();
  resetDomDataNum();
  resetDataNum();
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
  taskProcess(taskTitle.value, taskDetails.value, dueDate.value);
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
  let dataNum = selected();
  let taskNum = e.composedPath()[2].dataset.id;
  // if (element.classList.contains("delete-btn")) {
  projectList[dataNum].tasks.splice(taskNum, 1);
  e.target.parentElement.parentElement.parentElement.remove();
  resetDomDataId();
  resetDataId();
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

function confirmEditTask(e) {
  console.log(e);
  let tasks =
    projectList[selected()].tasks[e.composedPath()[2].firstChild.dataset.id];
  let newTitle = e.composedPath()[2].firstChild.children[1].value;
  let newDate = e.composedPath()[2].firstChild.children[2].value;
  let newDetails = e.composedPath()[2].children[1].firstChild.value;

  tasks.title = newTitle;
  tasks.details = newDetails;
  tasks.dueDate = newDate;

  displayTasks(selected());
}

function cancelEditTask() {
  displayTasks(selected());
}

let displayTasks = (project) => {
  AllTasksContainer.replaceChildren();
  let selectedProject = projectList[project].tasks;
  for (let task of selectedProject) {
    taskToDom(task.id, task.title, task.details, task.dueDate);
  }
};

export { projectToDOM, taskToDom };
