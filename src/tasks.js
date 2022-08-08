import { projectList } from "./projects";
import { taskToDom, displayTasks } from "./dom-events";

//task factory
const taskFactory = (dataNum, id, title, details, dueDate, completed) => {
  return { dataNum, id, title, details, dueDate, completed };
};

let id = () => {
  return projectList[selected()].tasks.length;
};

function taskProcess(title, details, dueDate) {
  let newId = id();
  let dataNum = selected();
  let newTask = taskFactory(dataNum, newId, title, details, dueDate, false);
  projectList[dataNum].tasks.push(newTask);

  taskToDom(newId, title, details, dueDate);
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
  let taskList = projectList[selected()].tasks;
  for (let task of taskList) {
    task.id = taskList.indexOf(task);
  }
}

function confirmEditTask(e) {
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

let completeTask = (e) => {
  console.log(e);
  e.target.classList.toggle("checked");
  e.composedPath()[1].classList.toggle("completed");
  projectList[selected()].tasks[
    e.composedPath()[2].firstChild.dataset.id
  ].completed = true;
};

export {
  taskProcess,
  selected,
  resetDataId,
  confirmEditTask,
  cancelEditTask,
  completeTask,
};
