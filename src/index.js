import { AppHandler } from "./AppHandler.js";
import { Todo } from "./Todo.js";
import { Project } from "./Project.js";
import { Builder } from "./buildFromLocalStorage.js";

const App = new AppHandler(Project, Todo, Builder); //Dependency Injections
App.initialize();