import { AppHandler } from "./AppHandler.js";
import { Todo } from "./Todo.js";
import { Project } from "./Project.js";

const App = new AppHandler(Project, Todo);
App.initialize();