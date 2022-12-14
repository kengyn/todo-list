import { projectToDOM } from "./dom-events";

const projectList = [];

//project factory
const projectFactory = (dataNum, projectName, tasks) => {
  return { dataNum, projectName, tasks };
};

const projectProcess = (projectName) => {
  let dataNum = setDataNum();
  let newProject = projectFactory(dataNum, projectName, []);
  projectList.push(newProject);
  projectToDOM(dataNum, projectName);
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

export { projectList, projectProcess, resetDataNum };
