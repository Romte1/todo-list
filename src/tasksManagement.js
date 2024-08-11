import { format, parseISO, formatDistance, formatRelative, subDays } from 'date-fns'
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

        for (let i=0; i<currentProjectTasks.length; i++) {

            let taskDiv = document.createElement('div');
            let taskNameP = document.createElement('p');
            let taskDescriptionP = document.createElement('p');
            let taskDateP = document.createElement('p');
            let taskPriorityP = document.createElement('p');
            let taskOptionsDiv = document.createElement('div');
            let taskDoneCheckbox = document.createElement('input');


            taskDiv.setAttribute('class', 'task');

            taskNameP.textContent = currentProjectTasks[i].name;
            taskDescriptionP.textContent = currentProjectTasks[i].description;
            taskDateP.textContent = format(parseISO(currentProjectTasks[i].date), 'MM-dd-yy');
            taskPriorityP.textContent = currentProjectTasks[i].priority;

            taskDoneCheckbox.setAttribute('type', 'checkbox');

            taskOptionsDiv.appendChild(taskDoneCheckbox);

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
        }
    }

export default {newTask, loadTasksList};