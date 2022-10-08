const date = new Date();
const projectList = [];
const projContainer = document.querySelector(".projectsContainer");
const popUp = document.querySelector(".editFormPopup");

document.querySelector("#addButton").addEventListener("click", function () {
  utils.addButtonClicked();
});

  document.querySelector("#cancelButton").addEventListener("click", function () {
    popUp.style.display = "none";
  });

document.querySelector("#editButton").addEventListener("click", function (event) {

    
    let taskID = event.target.getAttribute("data-task");
    let projectID = event.target.getAttribute("data-project");


    utils.log(`Edit button clicked for task id: ${taskID} project id: ${projectID}`);

    utils.editTask(taskID,projectID);

});



const task = function (
  title,
  description,
  dueDate,
  priority,
  project = "",
  taskID = ""
) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.project = project;
  this.taskID = this.taskID;

  this.taskID = utils.randstr("task-");

  utils.log(`Created task title: ${this.title} ID: ${this.taskID}`);
};

const project = function (title, toDoList, projectID = "") {
  this.title = title.toLowerCase();
  this.toDoList = toDoList;
  /*this.projectID = projectID;*/

  this.projectID = utils.randstr("project-");

  this.addToList = function () {
    projectList.push(this);
  };

  utils.log(`Created project: ${this.title} ID: ${this.projectID}`);
};

const utils = (() => {
  const log = (msg) => console.log(`${date.toLocaleTimeString()} - ${msg}`);

  const randstr = function (prefix) {
    return Math.random()
      .toString(36)
      .replace("0.", prefix || "");
  };

  const createTaskContainer = function (project, taskList) {
    var taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");
    taskContainer.setAttribute("id", `${project.title}-taskDiv`);

    taskList.forEach((task) => {
      var taskDiv = utils.createSingleTaskDiv(task);

      taskContainer.appendChild(taskDiv);
    });

    return taskContainer;
  };

  const createSingleTaskDiv = function (task,project) {
    var taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    taskDiv.setAttribute("id", task.taskID);

    var taskIconDiv = document.createElement("div");
    taskIconDiv.classList.add("taskIconDiv");

    var taskCheckIcon = document.createElement("i");
    taskCheckIcon.classList.add("fa");
    taskCheckIcon.classList.add("fa-check");

    taskCheckIcon.onclick = function () {
      document.getElementById(task.taskID).classList.add("completed");
    };

    var taskUndoIcon = document.createElement("i");
    taskUndoIcon.classList.add("fa");
    taskUndoIcon.classList.add("fa-share");

    taskUndoIcon.onclick = function () {
      document.getElementById(task.taskID).classList.remove("completed");
    };

    var taskEditIcon = document.createElement("i");
    taskEditIcon.classList.add("fa");
    taskEditIcon.classList.add("fa-pen");

    taskEditIcon.onclick = function () {
      utils.displayEditForm(task);
    };

    var taskDelIcon = document.createElement("i");
    taskDelIcon.classList.add("fa");
    taskDelIcon.classList.add("fa-trash");

    taskDelIcon.onclick = function () {
      document.getElementById(task.taskID).remove();
      
    };

    var taskName = document.createElement("h4");
    taskName.innerText = task.title;

    var taskDescription = document.createElement("p");
    taskDescription.innerText = task.description;

    var taskDuePriority = document.createElement("p");
    taskDuePriority.classList.add(`pri-${task.priority}`);
    taskDuePriority.innerText = `${task.dueDate} | ${task.priority}`;

    /* ICONS */
    taskIconDiv.appendChild(taskCheckIcon);
    taskIconDiv.appendChild(taskUndoIcon);
    taskIconDiv.appendChild(taskEditIcon);
    taskIconDiv.appendChild(taskDelIcon);

    taskDiv.appendChild(taskIconDiv);

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskDuePriority);

    return taskDiv;
  };

  const displaySingleProject = function (project) {
    /*projContainer.innerHTML = "";*/

    utils.log(`Displaying project ${project.title}`);

    var projectDiv = document.createElement("div");
    projectDiv.classList.add("projectDiv");
    projectDiv.setAttribute("id", project.projectID);

    var projIcon = document.createElement("i");
    projIcon.classList.add("fa");
    projIcon.classList.add("fa-clipboard");

    var projName = document.createElement("h2");
    projName.innerText = project.title;

    var projectTitleDiv = document.createElement("div");
    projectTitleDiv.classList.add("projTitleDiv");


    projectTitleDiv.appendChild(projIcon);
    projectTitleDiv.appendChild(projName);

    projectDiv.appendChild(projectTitleDiv);

    var taskContainer = utils.createTaskContainer(project, project.toDoList);

    projectDiv.appendChild(taskContainer);

    projContainer.appendChild(projectDiv);
  };

  const addButtonClicked = function () {
    let taskName = document.querySelector("#taskNameInput").value;
    let projectName = document
      .querySelector("#projectInput")
      .value.toLowerCase();
    let taskDescription = document.querySelector("#taskDescriptionInput").value;
    let taskDate = document.querySelector("#taskDateInput").value;
    let taskPriority = document.querySelector("#taskPriorityInput").value;

    const newTask = new task(
      taskName,
      taskDescription,
      taskDate,
      taskPriority,
      projectName
    );

    if (projectList.find((p) => p.title === projectName) != undefined) {
      utils.log(`project ${projectName} already exists, adding task to selected project`);
      utils.addTaskToProject(newTask);
    } else {
      utils.log(`creating new project: ${projectName}`);
      addNewProject(newTask);
    }
  };

  const addTaskToProject = function (newTask) {
    projectList.find((p) => p.title == newTask.project).toDoList.push(newTask);

    let project = projectList.find((p) => p.title == newTask.project);

    let existingTaskContainer = document.querySelector(
      `#${project.title}-taskDiv`
    );

    let newTaskDiv = utils.createSingleTaskDiv(newTask, project);

    existingTaskContainer.appendChild(newTaskDiv);

    utils.log(`Current tasks for project ${project.title}: ${project.toDoList.length} - Current Total Projects: ${projectList.length} `);
  };

  const addNewProject = function (newTask) {
    newTodoList = [];

    newTodoList.push(newTask);

    newProj = new project(newTask.project, newTodoList);

    projectList.push(newProj);

    utils.log(`created new project ${newProj.title} - project ID: ${newProj.projectID}`);

    utils.log(`Current tasks for project ${newProj.title}: ${newProj.toDoList.length} - Current Total Projects: ${newProj.length} `);


    displaySingleProject(newProj);
  };

  const displayEditForm = function (task) {
    document
      .querySelector("#editButton")
      .setAttribute("data-task", task.taskID);

      let projectID = projectList.find((p) => p.title == task.project).projectID;

      document.querySelector("#editButton").setAttribute("data-project", projectID);
        
      popUp.style.display = "flex";

      popUp.scrollIntoView();


      utils.populateEditForm(task);
  };


  const populateEditForm = function (task) {

    document.querySelector("#editTaskNameInput").value = task.title;
    document.querySelector("#editTaskDescriptionInput").value = task.description;
    document.querySelector("#editTaskDateInput").value = task.dueDate;
    document.querySelector("#editTaskDateInput").setAttribute("placeholder", task.dueDate);
    document.querySelector("#editTaskPriorityInput").value = task.priority;
    document.querySelector("#editTaskHeading").innerText = `Editing task: ${task.title} from project: ${task.project}`;
  }


  const editTask = function (taskID, projectID) {

    var oldTaskDiv = document.querySelector(`#${taskID}`);

    /*get inputs from pop up*/

    let taskName = document.querySelector("#editTaskNameInput").value;
    let taskDescription = document.querySelector("#editTaskDescriptionInput").value;
    let taskDate = document.querySelector("#editTaskDateInput").value;
    let taskPriority = document.querySelector("#editTaskPriorityInput").value;

    let taskProject = projectList.find((p) => p.projectID == projectID)

    utils.log(`Found matching project: ${taskProject.title}`);

    const newTask = new task(
        taskName,
        taskDescription,
        taskDate,
        taskPriority,
        taskProject.title
      );
    

    let newTaskDiv = utils.createSingleTaskDiv(newTask,taskProject); 
    
    oldTaskDiv.replaceWith(newTaskDiv);

    popUp.style.display = "none";


  }

  return {
    editTask,
    populateEditForm,
    displayEditForm,
    randstr,
    displaySingleProject,
    addNewProject,
    createSingleTaskDiv,
    addTaskToProject,
    addButtonClicked,
    log,
    createTaskContainer,
  };
})();

const exampleTask = new task(
  "take out trash",
  "make sure trash is taken out",
  "9-20-22",
  "low",
  "example",
  "notes: it is really smelly right now"
);
const exampleTaskTwo = new task(
  "take out trash #2",
  "make sure trash is taken out",
  "9-20-22",
  "low",
  "example",
  "notes: it is really smelly right now"
);
const exampleTaskThree = new task(
  "take out trash #3",
  "make sure trash is taken out",
  "9-20-22",
  "low",
  "example",
  "notes: it is really smelly right now"
);

exampleTaskList = [];

exampleTaskList.push(exampleTask);
exampleTaskList.push(exampleTaskTwo);
exampleTaskList.push(exampleTaskThree);

exampleProj = new project("example", exampleTaskList);

projectList.push(exampleProj);

projectList.forEach((project) => {
  utils.log(`Displaying project ${project.title}`);

  utils.displaySingleProject(project);
});
