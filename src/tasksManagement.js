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

        newTaskModal.setAttribute('class', 'modal-new-task');

        newTaskP.textContent = 'New Task';

        taskNameLbl.textContent = 'Name:';
        taskNameLbl.setAttribute('for', 'Name');

        taskDescriptionLbl.textContent = 'Description:';
        taskDescriptionLbl.setAttribute('for','Description');

        taskNameIpt.setAttribute('id', 'Name');
        taskNameIpt.setAttribute('name', 'Name');

        taskDescriptionIpt.setAttribute('id', 'Description');
        taskDescriptionIpt.setAttribute('name', 'Description');



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

        newTaskModal.appendChild(newTaskP);
        newTaskModal.appendChild(taskNameDiv);
        newTaskModal.appendChild(taskDescriptionDiv);

        body.appendChild(newTaskModal);

        newTaskModal.showModal();
    }

export default newTask;