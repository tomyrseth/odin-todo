import { AppHandler } from "./modules/AppHandler.js";
import { Project } from "./modules/Project.js";
import { Todo } from "./modules/Todo.js";
import { EventAttacher } from "./modules/EventAttacher.js";
import { DOMBuilder } from "./modules/DOMBuilder.js";
import { LSBuilder } from "./modules/LocalStorageBuilder.js";

const App = new AppHandler(Project, Todo, EventAttacher, DOMBuilder, LSBuilder); //Dependency Injections