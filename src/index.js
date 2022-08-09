import {
  projectEventListeners,
  buttonEventListeners,
  taskEventListeners,
} from "./dom-events";

import { projectProcess } from "./projects";
import { taskProcess } from "./tasks";

projectEventListeners();
buttonEventListeners();
taskEventListeners();

projectProcess("project 1");
taskProcess("take finn out", "he need to doodoo reaal bad", "2022-08-08");
