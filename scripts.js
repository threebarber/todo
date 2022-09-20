
const date = new Date();
const projectList = [];
const projContainer = document.querySelector(".projectsContainer");

const task = function (title, description,dueDate, priority, project = "example", notes = "n/a") {

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;


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

    const log = (msg) => console.log(`${date.toLocaleTimeString()} - ${msg}`)



    const displayProjects = function (projectList) {

        /*projContainer.innerHTML = "";*/


        projectList.forEach(project => {
            
            utils.log(`Displaying project ${project.title}`)

            var projectDiv = document.createElement("div");
            projectDiv.classList.add("projectDiv");
            projectDiv.classList.add("card");


            var projName = document.createElement("h2");
            projName.classList.add("card-title");
            projName.innerText = project.title;
            

            projectDiv.appendChild(projName);

            projContainer.appendChild(projectDiv);

        });

    }

    return {

        log,
        displayProjects
    };

})();


exampleTask = new task("take out trash", "make sure trash is taken out","9-20-22","low","example","notes: it is really smelly right now");

exampleTaskList = [];

exampleTaskList.push(exampleTask);


exampleProj = new project("example",exampleTaskList);

projectList.push(exampleProj);

utils.displayProjects(projectList);















