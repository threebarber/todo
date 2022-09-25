
const date = new Date();
const projectList = [];
const projContainer = document.querySelector(".projectsContainer");


document.querySelector("#addButton").addEventListener('click', function () {
    utils.addButtonClicked();
})

const task = function (title, description,dueDate, priority, project = "example") {

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;

    utils.log(`Created task title: ${this.title}`);

};


const project = function(title, toDoList,){
    
    this.title = title.toLowerCase();
    this.toDoList = toDoList;

    this.addToList = function(){

        projectList.push(this);
    }


    utils.log(`Created project: ${this.title}`);

};


const utils = (() => {

    const log = (msg) => console.log(`${date.toLocaleTimeString()} - ${msg}`);



    const createTaskDiv = function (project, taskList){
       
        var taskContainer = document.createElement("div");
        taskContainer.classList.add("taskContainer");
        taskContainer.setAttribute("id",`${project.title}-taskDiv`);

       
        taskList.forEach(task => {

            var taskDiv = document.createElement("div");
            taskDiv.classList.add("taskDiv");

            var taskName = document.createElement("h4");
            taskName.innerText = task.title;

            var taskDescription = document.createElement("p");
            taskDescription.innerText = task.description;


            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDescription);

            taskContainer.appendChild(taskDiv);
        });


        return taskContainer;
    }


    const createSingleTaskDiv = function (task) {

            var taskDiv = document.createElement("div");
            taskDiv.classList.add("taskDiv");

            var taskName = document.createElement("h4");
            taskName.innerText = task.title;

            var taskDescription = document.createElement("p");
            taskDescription.innerText = task.description;


            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDescription);

            return taskDiv;

    }


    const displayProjects = function (projectList) {

        /*projContainer.innerHTML = "";*/


        projectList.forEach(project => {
            
            utils.log(`Displaying project ${project.title}`);

            var projectDiv = document.createElement("div");
            projectDiv.classList.add("projectDiv");
            projectDiv.setAttribute("id",`${project.title}-projectDiv`);


            var projName = document.createElement("h2");
            projName.innerText = project.title;
            

            projectDiv.appendChild(projName);


            var taskContainer = utils.createTaskDiv(project,project.toDoList);

            projectDiv.appendChild(taskContainer);


            projContainer.appendChild(projectDiv);

        });

    }   


    const displaySingleProject = function (project) {

        /*projContainer.innerHTML = "";*/


            utils.log(`Displaying project ${project.title}`);

            var projectDiv = document.createElement("div");
            projectDiv.classList.add("projectDiv");
            projectDiv.setAttribute("id",`${project.title}-projectDiv`);


            var projName = document.createElement("h2");
            projName.innerText = project.title;
            

            projectDiv.appendChild(projName);


            var taskContainer = utils.createTaskDiv(project,project.toDoList);

            projectDiv.appendChild(taskContainer);


            projContainer.appendChild(projectDiv);

            

    }



    const addButtonClicked = function () {

        let taskName = document.querySelector("#taskNameInput").value;
        let projectName = document.querySelector("#projectInput").value.toLowerCase();
        let taskDescription = document.querySelector("#taskDescriptionInput").value;
        let taskDate = document.querySelector("#taskDescriptionInput").value;
        let taskPriority = document.querySelector("#taskPriorityInput").value;

        const newTask = new task(taskName,taskDescription,taskDate,taskPriority,projectName);

        if (projectList.find(p => p.title === projectName) != undefined){
            utils.log(`project ${projectName} already exists, adding task to selected project`);
            utils.addTaskToProject(newTask);
        }else{
            utils.log(`creating new project: ${projectName}`);
            addNewProject(newTask);
        }

    }   




    const addTaskToProject = function (newTask) {

        projectList.find(p => p.title == newTask.project).toDoList.push(newTask);

       let project = projectList.find(p => p.title == newTask.project);


       let existingTaskContainer = document.querySelector(`#${project.title}-taskDiv`);

       let newTaskDiv = utils.createSingleTaskDiv(newTask);

        existingTaskContainer.appendChild(newTaskDiv);

    }


    const addNewProject = function (newTask) {

        newTodoList = [];

        newTodoList.push(newTask);

        newProj = new project(newTask.project,newTodoList);

        projectList.push(newProj);

        utils.log(`created new project ${newProj.title}`);


        displaySingleProject(newProj);
    }



    return {

        displaySingleProject,
        addNewProject,
        createSingleTaskDiv,
        addTaskToProject,
        addButtonClicked,
        log,
        displayProjects,
        createTaskDiv,
    };

})();


const exampleTask = new task("take out trash", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");
const exampleTaskTwo = new task("take out trash #2", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");
const exampleTaskThree = new task("take out trash #3", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");

exampleTaskList = [];

exampleTaskList.push(exampleTask);
exampleTaskList.push(exampleTaskTwo);
exampleTaskList.push(exampleTaskThree);



exampleProj = new project("example",exampleTaskList);

projectList.push(exampleProj);

utils.displayProjects(projectList);















