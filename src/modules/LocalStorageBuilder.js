export class LSBuilder {
  constructor(Project, Todo, projList) {
    this.projectClass = Project;
    this.todoClass = Todo;
    this.projectListLocalstorage = projList;
    this.updatedList = [];
  }
  build() {
    this.projectListLocalstorage.forEach(obj => {
      const newProj = new this.projectClass({ name: obj.name, todo: this.todoClass, id: obj.id});
      newProj.buildTodosFromList(obj.todoList);
      this.updatedList.push(newProj);
    });
    return this.updatedList;
  }
}