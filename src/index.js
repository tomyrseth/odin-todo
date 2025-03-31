import { AppHandler } from "./modules/AppHandler.js";
import { Todo } from "./modules/Todo.js";
import { Project } from "./modules/Project.js";
import { Builder } from "./modules/buildFromLocalStorage.js";

const App = new AppHandler(Project, Todo, Builder); //Dependency Injections
App.initialize();