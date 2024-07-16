let tasks = [];
    function newTask() {
        const body = document.querySelector('body');
        const newTaskModal = document.createElement('dialog');
        const newTaskP = document.createElement('p');
        const taskNameDiv = document.createElement('div');
        const taskNameLbl = document.createElement('label');
        const taskNameIpt = document.createElement('input');

        newTaskModal.setAttribute('class', 'modal-new-task');

        newTaskP.textContent = 'New Task';

        taskNameLbl.textContent = 'Name:';

        // removes modal when pressin escape key
        document.addEventListener('keyup',function(e){
            if (e.key === "Escape") { 
                
                newTaskModal.remove();
            }
        });

        taskNameDiv.appendChild(taskNameLbl);
        taskNameDiv.appendChild(taskNameIpt);

        newTaskModal.appendChild(newTaskP);
        newTaskModal.appendChild(taskNameDiv);

        body.appendChild(newTaskModal);

        newTaskModal.showModal();
    }

export default newTask;