import { projectList } from "./projects";
import { taskToDom } from "./dom-events";

//task factory
const taskFactory = (dataNum, title, details, dueDate, completed) => {
  return { dataNum, title, details, dueDate, completed };
};

function taskProcess(title, details, dueDate) {
  let dataNum = selected();
  let newTask = taskFactory(dataNum, title, details, dueDate, false);
  projectList[dataNum].tasks.push(newTask);

  taskToDom(title, details, dueDate);
}

function selected() {
  const projects = document.querySelectorAll(".project-obj");
  for (let project of projects) {
    if (project.classList.contains("selected")) {
      return project.dataset.num;
    }
  }
}

export { taskProcess };
