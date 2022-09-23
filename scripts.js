
const date = new Date();
const projectList = [];
const projContainer = document.querySelector(".projectsContainer");

const task = function (title, description,dueDate, priority, project = "example") {

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    utils.log(`Created task title: ${this.title}`);

};


const project = function(title, toDoList,){
    
    this.title = title;
    this.toDoList = toDoList;

    this.addToList = function(){

        projectList.push(this);
    }


    utils.log(`Created project: ${this.title}`);

};




const utils = (() => {

    const log = (msg) => console.log(`${date.toLocaleTimeString()} - ${msg}`);



    const createTaskDiv = function (taskList){
       
        var taskContainer = document.createElement("div");
        taskContainer.classList.add("taskContainer");
       
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


    const displayProjects = function (projectList) {

        /*projContainer.innerHTML = "";*/


        projectList.forEach(project => {
            
            utils.log(`Displaying project ${project.title}`);

            var projectDiv = document.createElement("div");
            projectDiv.classList.add("projectDiv");


            var projName = document.createElement("h2");
            projName.innerText = project.title;
            

            projectDiv.appendChild(projName);


            var taskContainer = utils.createTaskDiv(project.toDoList);

            projectDiv.appendChild(taskContainer);


            projContainer.appendChild(projectDiv);

        });

    }

    const addButtonClicked = function () {
        
    }



    return {

        addButtonClicked,
        log,
        displayProjects,
        createTaskDiv,
    };

})();


exampleTask = new task("take out trash", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");
exampleTaskTwo = new task("take out trash #2", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");
exampleTaskThree = new task("take out trash #3", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");

exampleTaskList = [];

exampleTaskList.push(exampleTask);
exampleTaskList.push(exampleTaskTwo);
exampleTaskList.push(exampleTaskThree);



exampleProj = new project("example",exampleTaskList);

projectList.push(exampleProj);

utils.displayProjects(projectList);















