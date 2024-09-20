import { format, parseISO, formatDistance, formatRelative, subDays, differenceInDays, parse } from 'date-fns'
let tasks = [];
let taskID = 0;
    function newTask(currentProject) {
        const body = document.querySelector('body');
        const newTaskModal = document.createElement('dialog');
        const newTaskP = document.createElement('p');
        const taskNameDiv = document.createElement('div');
        const taskNameLbl = document.createElement('label');
        const taskNameIpt = document.createElement('input');
        const taskDescriptionDiv = document.createElement('div');
        const taskDescriptionLbl = document.createElement('label');
        const taskDescriptionIpt = document.createElement('input');
        const taskDueDateDiv = document.createElement('div');
        const taskDueDateLbl = document.createElement('label');
        const taskDueDateIpt = document.createElement('input');
        const taskPriorityDiv = document.createElement('div');
        const taskPriorityLbl = document.createElement('label');
        const taskPrioritySel = document.createElement('select');
        const taskPriorityLowOp = document.createElement('option');
        const taskPriorityMedOp = document.createElement('option');
        const taskPriorityHighOp = document.createElement('option');
        const taskErrorDiv = document.createElement('div');
        const taskErrorLbl = document.createElement('label');
        const taskButtonsDiv = document.createElement('div');
        const taskAddBtn = document.createElement('button');
        const taskClearBtn = document.createElement('button');
        const taskCancelBtn = document.createElement('button');         

        newTaskModal.setAttribute('class', 'modal-new-task');

        newTaskP.textContent = 'New Task';

        taskNameLbl.textContent = 'Name:';
        taskNameLbl.setAttribute('for', 'Name');

        taskDescriptionLbl.textContent = 'Description:';
        taskDescriptionLbl.setAttribute('for','Description');

        taskDueDateLbl.textContent ='Due date:';
        taskDueDateLbl.setAttribute('for', 'DueDate');

        taskPriorityLbl.textContent = 'Priority:';
        taskPriorityLbl.setAttribute('for', 'Priority');

        taskNameIpt.setAttribute('id', 'Name');
        taskNameIpt.setAttribute('name', 'Name');

        taskDueDateIpt.setAttribute('id', 'DueDate');
        taskDueDateIpt.setAttribute('name', 'DueDate');
        taskDueDateIpt.setAttribute('type', 'date');


        //firstly, we add a normalizeDate function
        const normalizeDate = (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0); // Set time to midnight
            return d;
        };

        //here we define date input default date, set at the present
        // Get today's date
        let today = normalizeDate(new Date());

        // Format the date as yyyy-mm-dd
        let formattedDate = format(today, 'yyyy-MM-dd');

        // Set the default value of the date input field
        taskDueDateIpt.value = formattedDate;

        

        taskDescriptionIpt.setAttribute('id', 'Description');
        taskDescriptionIpt.setAttribute('name', 'Description');

        taskPrioritySel.setAttribute('id', 'Priority');
        taskPrioritySel.setAttribute('name', 'Priority');

        taskErrorDiv.setAttribute('class', 'error-container');

        taskAddBtn.textContent = 'Add';
        taskAddBtn.setAttribute('class', 'btn-add');

        taskClearBtn.textContent = 'Clear';
        taskClearBtn.setAttribute('class', 'btn-clear');

        taskCancelBtn.textContent = 'Cancel';
        taskCancelBtn.setAttribute('class', 'btn-cancel');

        //here we add the options to the task priority selection

        taskPriorityLowOp.textContent = 'Low';
        taskPriorityLowOp.value = 'low';
        taskPrioritySel.appendChild(taskPriorityLowOp);

        taskPriorityMedOp.textContent = 'Medium';
        taskPriorityMedOp.value = 'medium';
        taskPrioritySel.appendChild(taskPriorityMedOp);

        taskPriorityHighOp.textContent = 'High';
        taskPriorityHighOp.value = 'high';
        taskPrioritySel.appendChild(taskPriorityHighOp);


        //this sets the medium option from select as default

        taskPrioritySel.selectedIndex = 1;


        //here are the event listeners for the buttons

        taskAddBtn.addEventListener('click', () => {
            
            let nameValue = taskNameIpt.value;
            let descrValue = taskDescriptionIpt.value;
            let dateValue = taskDueDateIpt.value;
            let prioValue = taskPrioritySel.value;

            if (nameValue !== '' && descrValue !== '' && dateValue !== '' && prioValue !== '') {
                taskID = taskID + 1;
                alert(currentProject + taskID);

                var task = new Task(taskID, currentProject, nameValue, descrValue, dateValue, prioValue);
                tasks.push(task);
                loadTasksList(currentProject);
                console.log(tasks);

                newTaskModal.remove();

            }

            else {
                taskErrorLbl.setAttribute('class', 'error-msg');
                taskErrorLbl.textContent = 'Fields are required!';
            }
        });

        taskClearBtn.addEventListener('click', () => {
            taskNameIpt.value = '';
            taskDescriptionIpt.value = '';
            taskDueDateIpt.value = '';
            taskPrioritySel.selectedIndex = 1;
        });

        taskCancelBtn.addEventListener('click', () => {
            newTaskModal.remove();
        });


        // removes modal when pressin escape key

        document.addEventListener('keyup',function(e){
            if (e.key === "Escape") { 
                
                newTaskModal.remove();
            }
        });

        taskNameDiv.appendChild(taskNameLbl);
        taskNameDiv.appendChild(taskNameIpt);

        taskDescriptionDiv.appendChild(taskDescriptionLbl);
        taskDescriptionDiv.appendChild(taskDescriptionIpt);

        taskDueDateDiv.appendChild(taskDueDateLbl);
        taskDueDateDiv.appendChild(taskDueDateIpt);

        taskPriorityDiv.appendChild(taskPriorityLbl);
        taskPriorityDiv.appendChild(taskPrioritySel);

        taskErrorDiv.appendChild(taskErrorLbl);

        taskButtonsDiv.appendChild(taskAddBtn);
        taskButtonsDiv.appendChild(taskClearBtn);
        taskButtonsDiv.appendChild(taskCancelBtn);

        newTaskModal.appendChild(newTaskP);
        newTaskModal.appendChild(taskNameDiv);
        newTaskModal.appendChild(taskDescriptionDiv);
        newTaskModal.appendChild(taskDueDateDiv);
        newTaskModal.appendChild(taskPriorityDiv);
        newTaskModal.appendChild(taskErrorDiv);
        newTaskModal.appendChild(taskButtonsDiv);

        body.appendChild(newTaskModal);

        newTaskModal.showModal();
    }

    function loadTasksList(projectName) {

        const tasksList = document.querySelector('.tasks-list');
        let taskDivs = document.querySelectorAll('.task');

        const currentProjectTasks = tasks.filter(obj => obj.project === projectName);
        console.log(currentProjectTasks);

        taskDivs.forEach(div => {
            div.remove();
        });

        loadContentTitle(tasksList);

        for (let i=0; i<currentProjectTasks.length; i++) {

            let taskDiv = document.createElement('div');
            let taskNameP = document.createElement('p');
            let taskDescriptionP = document.createElement('p');
            let taskDateP = document.createElement('p');
            let taskPriorityP = document.createElement('p');
            let taskOptionsDiv = document.createElement('div');
            let taskDoneCheckbox = document.createElement('input');
            let taskEdit = document.createElement('ion-icon');
            let taskDelete = document.createElement('ion-icon');


            taskDiv.setAttribute('class', 'task');

            //set left border color depending on task priority using class tag

            if (currentProjectTasks[i].priority === 'low') {
                taskDiv.classList.add('low');
            }

            if (currentProjectTasks[i].priority === 'medium') {
                taskDiv.classList.add('med');
            }

            if (currentProjectTasks[i].priority === 'high') {
                taskDiv.classList.add('high');
            }


            taskNameP.textContent = currentProjectTasks[i].name;
            taskDescriptionP.textContent = currentProjectTasks[i].description;
            taskDateP.textContent = format(parseISO(currentProjectTasks[i].date), 'MM-dd-yy');
            taskPriorityP.textContent = currentProjectTasks[i].priority;
            
            taskDoneCheckbox.addEventListener('click', () => { 

                //check task status
                if (taskDoneCheckbox.checked === false) {
                    tasks[i].status = false;
                    taskDiv.classList.remove('completed');
                } else {
                    tasks[i].status = true;
                    taskDiv.classList.add('completed');
                };

            });

            //update checkbox status for user after reloading section
            if (tasks[i].status === false) {
                taskDoneCheckbox.checked = false;
                taskDiv.classList.remove('completed');                
            } else {
                taskDoneCheckbox.checked = true;
                taskDiv.classList.add('completed');
            }

            taskOptionsDiv.setAttribute('class', 'task-options');
            
            taskEdit.setAttribute('name','pencil-outline');
            taskEdit.setAttribute('class','edit-task');

            taskDelete.setAttribute('name', 'trash-outline');
            taskDelete.setAttribute('class', 'del-task');

            taskDoneCheckbox.setAttribute('type', 'checkbox');

            //task option event listeners

            taskDelete.addEventListener('click', () => {
                
                let id = currentProjectTasks[i].taskID;
                console.log(id);
                deleteTask(id);
                loadTasksList(projectName);
                

            });

            taskOptionsDiv.appendChild(taskDoneCheckbox);
            taskOptionsDiv.appendChild(taskEdit);
            taskOptionsDiv.appendChild(taskDelete);

            taskDiv.appendChild(taskNameP);
            taskDiv.appendChild(taskDescriptionP);
            taskDiv.appendChild(taskDateP);
            taskDiv.appendChild(taskPriorityP);
            taskDiv.appendChild(taskOptionsDiv);
            tasksList.appendChild(taskDiv);
        };



        

    }

    class Task {
        constructor (taskID, currentProject, nameValue, descrValue, dateValue, prioValue) {
            this.taskID = taskID;
            this.project = currentProject;
            this.name = nameValue;
            this.description = descrValue;
            this.date = dateValue;
            this.priority = prioValue;
            this.status = false;
        }
    }

    function loadContentTitle(tasksList) {
        //remove title first to avoid duplicates, 
        //first we declare the element and then we check if it exists already
        let title = document.querySelector('.content-title');

        if (title){
            
            title.remove();

        };

        let taskDivTitle = document.createElement('div');
        let taskMainName = document.createElement('p');
        let taskMainDescription = document.createElement('p');
        let taskMainDueDate = document.createElement('p');
        let taskMainPriority = document.createElement('p');
        let taskMainActions = document.createElement('p');

        taskDivTitle.setAttribute('class', 'content-title');
        
        taskMainName.textContent = ('Name');
        taskMainDescription.textContent = ('Description');
        taskMainDueDate.textContent = ('Due Date');
        taskMainPriority.textContent = ('Priority');
        taskMainActions.textContent = ('Actions');


        taskDivTitle.appendChild(taskMainName);
        taskDivTitle.appendChild(taskMainDescription);
        taskDivTitle.appendChild(taskMainDueDate);
        taskDivTitle.appendChild(taskMainPriority);
        taskDivTitle.appendChild(taskMainActions);
        tasksList.appendChild(taskDivTitle);

    }

    function loadContentTitleForTasksSections(tasksList) {
        //remove title first to avoid duplicates, 
        //first we declare the element and then we check if it exists already
        let title = document.querySelector('.content-title');

        if (title){
            
            title.remove();

        };

        let taskDivTitle = document.createElement('div');
        let taskMainName = document.createElement('p');
        let taskMainProject = document.createElement('p');
        let taskMainDescription = document.createElement('p');
        let taskMainDueDate = document.createElement('p');
        let taskMainPriority = document.createElement('p');
        let taskMainActions = document.createElement('p');

        taskDivTitle.setAttribute('class', 'content-title');
        
        taskMainName.textContent = ('Name');
        taskMainProject.textContent = ('Project');
        taskMainDescription.textContent = ('Description');
        taskMainDueDate.textContent = ('Due Date');
        taskMainPriority.textContent = ('Priority');
        taskMainActions.textContent = ('Actions');


        taskDivTitle.appendChild(taskMainName);
        taskDivTitle.appendChild(taskMainProject);
        taskDivTitle.appendChild(taskMainDescription);
        taskDivTitle.appendChild(taskMainDueDate);
        taskDivTitle.appendChild(taskMainPriority);
        taskDivTitle.appendChild(taskMainActions);
        tasksList.appendChild(taskDivTitle);

    }

    function deleteTask(id) {
        tasks = tasks.filter(item => item.taskID !== id);
        console.log('id is:',id);
    }

    function loadTasksByDate(dateSection) {
        //firstly the date is normalized with a default time
        const normalizeDate = (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0); // Set time to midnight
            return d;
        };
        //This function helps parsing the date that comes directly from obj.date as a string, example: '2024-12-25', filtered below in the relevantTasks variable
        function dateParse(objDate) {
            const dateStringFormat = 'yyyy-MM-dd';
            const parsedDate = parse(objDate, dateStringFormat, new Date());

            return parsedDate;
        }
        //dateLimit checks the name of dateSection, if it's today, then value is 1, else 7 
        const dateLimit = dateSection === 'Today' ? 1 : 7;
        const today = normalizeDate(new Date());
        

        //this will recruit every tasks depending on the selected days that the section should show, excluding the ones that have surpassed the time limit
        const relevantTasks = tasks.filter(obj => differenceInDays(normalizeDate(dateParse(obj.date)), today) < dateLimit && differenceInDays(normalizeDate(dateParse(obj.date)), today) >= 0);

        const content = document.querySelector('.content');
        const projectMain = document.createElement('div');
        const sectionTitle = document.createElement('h1');
        const projectTasks = document.createElement('div');

        sectionTitle.textContent = dateSection;

        projectTasks.setAttribute('class', 'tasks-list');



        projectMain.appendChild(sectionTitle);
        

        content.appendChild(projectMain);
        content.appendChild(projectTasks);

        loadContentTitleForTasksSections(projectTasks);

        for (let i=0; i<relevantTasks.length; i++) {

            let taskDiv = document.createElement('div');
            let taskNameP = document.createElement('p');
            let taskProjectP = document.createElement('p');
            let taskDescriptionP = document.createElement('p');
            let taskDateP = document.createElement('p');
            let taskPriorityP = document.createElement('p');
            let taskOptionsDiv = document.createElement('div');
            let taskDoneCheckbox = document.createElement('input');
            let taskEdit = document.createElement('ion-icon');
            let taskDelete = document.createElement('ion-icon');


            taskDiv.setAttribute('class', 'task');

            //set left border color depending on task priority using class tag

            if (relevantTasks[i].priority === 'low') {
                taskDiv.classList.add('low');
            }

            if (relevantTasks[i].priority === 'medium') {
                taskDiv.classList.add('med');
            }

            if (relevantTasks[i].priority === 'high') {
                taskDiv.classList.add('high');
            }


            taskNameP.textContent = relevantTasks[i].name;
            taskProjectP.textContent = relevantTasks[i].project;
            taskDescriptionP.textContent = relevantTasks[i].description;
            taskDateP.textContent = format(parseISO(relevantTasks[i].date), 'MM-dd-yy');
            taskPriorityP.textContent = relevantTasks[i].priority;
            
            taskDoneCheckbox.addEventListener('click', () => { 

                //check task status
                if (taskDoneCheckbox.checked === false) {
                    tasks[i].status = false;
                    taskDiv.classList.remove('completed');
                } else {
                    tasks[i].status = true;
                    taskDiv.classList.add('completed');
                };

            });

            //update checkbox status for user after reloading section
            if (tasks[i].status === false) {
                taskDoneCheckbox.checked = false;
                taskDiv.classList.remove('completed');                
            } else {
                taskDoneCheckbox.checked = true;
                taskDiv.classList.add('completed');
            }

            taskOptionsDiv.setAttribute('class', 'task-options');
            
            taskEdit.setAttribute('name','pencil-outline');
            taskEdit.setAttribute('class','edit-task');

            taskDelete.setAttribute('name', 'trash-outline');
            taskDelete.setAttribute('class', 'del-task');

            taskDoneCheckbox.setAttribute('type', 'checkbox');

            //task option event listeners

            taskDelete.addEventListener('click', () => {
                
                let id = relevantTasks[i].taskID;
                console.log(id);
                deleteTask(id);
                loadTasksList(projectName);
                

            });

            taskOptionsDiv.appendChild(taskDoneCheckbox);
            taskOptionsDiv.appendChild(taskEdit);
            taskOptionsDiv.appendChild(taskDelete);

            taskDiv.appendChild(taskNameP);
            taskDiv.appendChild(taskProjectP);
            taskDiv.appendChild(taskDescriptionP);
            taskDiv.appendChild(taskDateP);
            taskDiv.appendChild(taskPriorityP);
            taskDiv.appendChild(taskOptionsDiv);
            projectTasks.appendChild(taskDiv);

        };
    }

    function loadAllTasks() {

        const content = document.querySelector('.content');
        const projectMain = document.createElement('div');
        const sectionTitle = document.createElement('h1');
        const projectTasks = document.createElement('div');

        sectionTitle.textContent = 'All Tasks';

        projectTasks.setAttribute('class', 'tasks-list');



        projectMain.appendChild(sectionTitle);
        

        content.appendChild(projectMain);
        content.appendChild(projectTasks);

        loadContentTitleForTasksSections(projectTasks);

        for (let i=0; i<tasks.length; i++) {

            let taskDiv = document.createElement('div');
            let taskNameP = document.createElement('p');
            let taskProjectP = document.createElement('p');
            let taskDescriptionP = document.createElement('p');
            let taskDateP = document.createElement('p');
            let taskPriorityP = document.createElement('p');
            let taskOptionsDiv = document.createElement('div');
            let taskDoneCheckbox = document.createElement('input');
            let taskEdit = document.createElement('ion-icon');
            let taskDelete = document.createElement('ion-icon');


            taskDiv.setAttribute('class', 'task');

            //set left border color depending on task priority using class tag

            if (tasks[i].priority === 'low') {
                taskDiv.classList.add('low');
            }

            if (tasks[i].priority === 'medium') {
                taskDiv.classList.add('med');
            }

            if (tasks[i].priority === 'high') {
                taskDiv.classList.add('high');
            }


            taskNameP.textContent = tasks[i].name;
            taskProjectP.textContent = tasks[i].project;
            taskDescriptionP.textContent = tasks[i].description;
            taskDateP.textContent = format(parseISO(tasks[i].date), 'MM-dd-yy');
            taskPriorityP.textContent = tasks[i].priority;
            
            taskDoneCheckbox.addEventListener('click', () => { 

                //check task status
                if (taskDoneCheckbox.checked === false) {
                    tasks[i].status = false;
                    taskDiv.classList.remove('completed');
                } else {
                    tasks[i].status = true;
                    taskDiv.classList.add('completed');
                };

            });

            //update checkbox status for user after reloading section
            if (tasks[i].status === false) {
                taskDoneCheckbox.checked = false;
                taskDiv.classList.remove('completed');                
            } else {
                taskDoneCheckbox.checked = true;
                taskDiv.classList.add('completed');
            }

            taskOptionsDiv.setAttribute('class', 'task-options');
            
            taskEdit.setAttribute('name','pencil-outline');
            taskEdit.setAttribute('class','edit-task');

            taskDelete.setAttribute('name', 'trash-outline');
            taskDelete.setAttribute('class', 'del-task');

            taskDoneCheckbox.setAttribute('type', 'checkbox');

            //task option event listeners

            taskDelete.addEventListener('click', () => {
                
                let id = tasks[i].taskID;
                console.log(id);
                deleteTask(id);
                loadTasksList(projectName);
                

            });

            taskOptionsDiv.appendChild(taskDoneCheckbox);
            taskOptionsDiv.appendChild(taskEdit);
            taskOptionsDiv.appendChild(taskDelete);

            taskDiv.appendChild(taskNameP);
            taskDiv.appendChild(taskProjectP);
            taskDiv.appendChild(taskDescriptionP);
            taskDiv.appendChild(taskDateP);
            taskDiv.appendChild(taskPriorityP);
            taskDiv.appendChild(taskOptionsDiv);
            projectTasks.appendChild(taskDiv);

        };
    }

    function loadCompletedTasks() {

        const completedTasks = tasks.filter(obj => obj.status === true);

        const content = document.querySelector('.content');
        const projectMain = document.createElement('div');
        const sectionTitle = document.createElement('h1');
        const projectTasks = document.createElement('div');

        sectionTitle.textContent = 'Completed Tasks';

        projectTasks.setAttribute('class', 'tasks-list');



        projectMain.appendChild(sectionTitle);
        

        content.appendChild(projectMain);
        content.appendChild(projectTasks);

        loadContentTitleForTasksSections(projectTasks);

        for (let i=0; i<completedTasks.length; i++) {

            let taskDiv = document.createElement('div');
            let taskNameP = document.createElement('p');
            let taskProjectP = document.createElement('p');
            let taskDescriptionP = document.createElement('p');
            let taskDateP = document.createElement('p');
            let taskPriorityP = document.createElement('p');
            let taskOptionsDiv = document.createElement('div');
            let taskDoneCheckbox = document.createElement('input');
            let taskEdit = document.createElement('ion-icon');
            let taskDelete = document.createElement('ion-icon');


            taskDiv.setAttribute('class', 'task');

            //set left border color depending on task priority using class tag

            if (completedTasks[i].priority === 'low') {
                taskDiv.classList.add('low');
            }

            if (completedTasks[i].priority === 'medium') {
                taskDiv.classList.add('med');
            }

            if (completedTasks[i].priority === 'high') {
                taskDiv.classList.add('high');
            }


            taskNameP.textContent = completedTasks[i].name;
            taskProjectP.textContent = completedTasks[i].project;
            taskDescriptionP.textContent = completedTasks[i].description;
            taskDateP.textContent = format(parseISO(completedTasks[i].date), 'MM-dd-yy');
            taskPriorityP.textContent = completedTasks[i].priority;
            
            taskDoneCheckbox.addEventListener('click', () => { 

                //check task status
                if (taskDoneCheckbox.checked === false) {
                    tasks[i].status = false;
                    taskDiv.classList.remove('completed');
                } else {
                    tasks[i].status = true;
                    taskDiv.classList.add('completed');
                };

            });

            //update checkbox status for user after reloading section
            if (tasks[i].status === false) {
                taskDoneCheckbox.checked = false;
                taskDiv.classList.remove('completed');                
            } else {
                taskDoneCheckbox.checked = true;
                taskDiv.classList.add('completed');
            }

            taskOptionsDiv.setAttribute('class', 'task-options');
            
            taskEdit.setAttribute('name','pencil-outline');
            taskEdit.setAttribute('class','edit-task');

            taskDelete.setAttribute('name', 'trash-outline');
            taskDelete.setAttribute('class', 'del-task');

            taskDoneCheckbox.setAttribute('type', 'checkbox');

            //task option event listeners

            taskDelete.addEventListener('click', () => {
                
                let id = completedTasks[i].taskID;
                console.log(id);
                deleteTask(id);
                loadTasksList(projectName);
                

            });

            taskOptionsDiv.appendChild(taskDoneCheckbox);
            taskOptionsDiv.appendChild(taskEdit);
            taskOptionsDiv.appendChild(taskDelete);

            taskDiv.appendChild(taskNameP);
            taskDiv.appendChild(taskProjectP);
            taskDiv.appendChild(taskDescriptionP);
            taskDiv.appendChild(taskDateP);
            taskDiv.appendChild(taskPriorityP);
            taskDiv.appendChild(taskOptionsDiv);
            projectTasks.appendChild(taskDiv);

        };



   }

   function tasksProjectNameChanger(name, newName) {
        const updateTasksProjectName = tasks.forEach(obj => {
            if (obj.project === name) {
                obj.project = newName;
            }
        });
   };

   function tasksDeletion(name) {
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].project === name) {
            tasks.splice(i, 1);
        }
    }
   };

    


export default {newTask, loadTasksList, loadCompletedTasks, loadTasksByDate, loadAllTasks, tasksProjectNameChanger, tasksDeletion};