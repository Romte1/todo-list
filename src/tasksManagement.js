let tasks = [];
    function newTask() {
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

        taskButtonsDiv.appendChild(taskAddBtn);
        taskButtonsDiv.appendChild(taskClearBtn);
        taskButtonsDiv.appendChild(taskCancelBtn);

        newTaskModal.appendChild(newTaskP);
        newTaskModal.appendChild(taskNameDiv);
        newTaskModal.appendChild(taskDescriptionDiv);
        newTaskModal.appendChild(taskDueDateDiv);
        newTaskModal.appendChild(taskPriorityDiv);
        newTaskModal.appendChild(taskButtonsDiv);

        body.appendChild(newTaskModal);

        newTaskModal.showModal();
    }

export default newTask;