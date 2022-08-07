import projectToDOM from "./dom-events";

const projectList = [];

//project factory
const projectFactory = (dataNum, projectName, tasks) => {
  return { dataNum, projectName, tasks };
};

const projectProcess = (projectName) => {
  let name = projectName;
  let dataNum = setDataNum();
  let newProject = projectFactory(dataNum, name, []);
  projectList.push(newProject);
  projectToDOM(dataNum, name);
  console.log(projectList);
};

const setDataNum = () => {
  const datanum = document.querySelectorAll("[data-num]");
  return datanum.length;
};

export { projectList, projectProcess };
