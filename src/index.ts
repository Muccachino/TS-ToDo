import "./styles.scss";

function AutoBind(_: any, _2: any, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor = {
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Project {
  constructor(public title: string) {}
}

class ToDo {
  constructor(
    public title: string,
    public description: string,
    public date: string,
    public priority: string
  ) {}
}

class ProjectForm {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-form"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
    this.configure();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }

  protected configure() {
    const addNewProject = document.getElementById("add-project")!;
    addNewProject.addEventListener("click", (event) => {
      event.preventDefault();
      const formInput = document.getElementById(
        "form-input"
      )! as HTMLInputElement;
      const newProject = new Project(formInput.value);
      projectList.addedProjects.push(newProject);
      console.log(projectList.addedProjects);
      projectList.renderProjects();
      const formElement = document.getElementById("p-form")!;
      formElement.classList.add("hidden");
    });

    const closeProjectForm = document.getElementById("cancel-project")!;
    closeProjectForm.addEventListener("click", (event) => {
      event.preventDefault();
      const formElement = document.getElementById("p-form")!;
      formElement.classList.add("hidden");
    });
  }
}

class ProjectItem {
  allToDos: [] = [];

  templateElement: HTMLTemplateElement;
  hostElement: HTMLUListElement;
  element: HTMLElement;
  project: Project;

  constructor(project: Project) {
    this.templateElement = document.getElementById(
      "project-category"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(
      "all-projects"
    )! as HTMLUListElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.project = project;
    this.attach();
    this.renderContent();
    this.configure();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
  }

  protected configure() {
    this.element.addEventListener("click", () => {
      const allItems = document.querySelector(
        "#all-projects"
      )! as HTMLUListElement;

      for (let i = 0; i < allItems.children.length; i++) {
        allItems.children[i].classList.remove("active");
      }

      this.element.classList.add("active");
    });
  }
}

class ProjectList {
  addedProjects: Project[] = [];
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.renderContent();
    this.attach();
    this.configure();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = "All Projects";
    this.element.querySelector("ul")!.id = "all-projects";
  }

  renderProjects() {
    const listElement = this.element.querySelector("ul")!;
    listElement.innerHTML = "";
    this.addedProjects.forEach((project) => {
      new ProjectItem(project);
    });
  }

  protected configure() {
    const add_project_btn = document.getElementById("add-project-form")!;
    add_project_btn.addEventListener("click", () => {
      const formElement = document.getElementById("p-form")!;
      formElement.classList.remove("hidden");
    });
  }
}

class ToDoList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor() {
    this.templateElement = document.getElementById(
      "to-do-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.attach();
    this.configure();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
  protected configure() {
    const addToDoBtn = document.getElementById("add-to-do")!;
    addToDoBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const toDoForm = document.querySelector(".t-form")!;
      toDoForm.classList.remove("hidden");
    });
  }
}

class ToDoItem {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor() {
    this.templateElement = document.getElementById(
      "single-to-do"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(
      "to-do-section"
    )! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
  }
}

class ToDoForm {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor() {
    this.templateElement = document.getElementById(
      "to-do-form"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;

    this.attach();
    this.configure();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
  protected configure() {
    const cancelToDo = document.getElementById("cancel-to-do")!;
    cancelToDo.addEventListener("click", (event) => {
      event.preventDefault();
      const toDoForm = document.querySelector(".t-form")!;
      toDoForm.classList.add("hidden");
    });
  }
}

const projectList = new ProjectList();
const toDoList = new ToDoList();
const projectForm = new ProjectForm();
const toDoForm = new ToDoForm();
