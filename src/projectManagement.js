import tasks from './tasksManagement';
import storage from './localStorage';

    let Projects = [];
    
    function newProject() {
        const body = document.querySelector('body');
        const newProjectModal = document.createElement('dialog');
        const newProjectP = document.createElement('p');
        const newProjectLbl = document.createElement('label');
        const newProjectIpt = document.createElement('input');
        const newProjectMsg = document.createElement('label');
        const newProjectBtn = document.createElement('button');

        newProjectP.textContent = 'New Project';
        newProjectLbl.textContent = 'Name: ';
        newProjectBtn.textContent = 'Create!';

        newProjectLbl.setAttribute('for', 'Name');

        newProjectIpt.setAttribute('type', 'text');
        newProjectIpt.setAttribute('id', 'Name');
        newProjectIpt.setAttribute('name', 'Name');
        newProjectIpt.setAttribute('maxlength', '15');

        addEventListener ('click' , ({target}) => {

            if (target === newProjectBtn && newProjectIpt.value !== '' ) {

                for (let i=0; i<Projects.length; i++) {
                    if (Projects[i].name.toLowerCase() === newProjectIpt.value.toLowerCase()) {
                        newProjectMsg.setAttribute('class', 'error');
                        newProjectMsg.textContent = 'Projects must have an unique name!';
                        console.log(Projects.length);
                        return;
                    }
                }
                var project = new Project(newProjectIpt.value);
                Projects.push(project);
                storage.updateLocalStorageProjects(Projects);
                console.log(Projects.length);
                newProjectModal.remove();
                updateProjectsList();
            }
        });


        // removes modal when pressin escape key
        document.addEventListener('keyup',function(e){
            if (e.key === "Escape") { 
                
                newProjectModal.remove();
            }
        });

        newProjectModal.setAttribute('class', 'modal');

        newProjectModal.appendChild(newProjectP);
        newProjectModal.appendChild(newProjectLbl);
        newProjectModal.appendChild(newProjectIpt);
        newProjectModal.appendChild(newProjectMsg);
        newProjectModal.appendChild(newProjectBtn);

        body.appendChild(newProjectModal);

        newProjectModal.showModal();

    }

    function updateProjectsList() {

        const navProjects = document.querySelector('.projects');

        navProjects.querySelectorAll('div').forEach(div => {
            navProjects.removeChild(div);
        });


        for (let i = 0; i<Projects.length; i++) {
            let projectDiv = document.createElement('div');
            let projectP = document.createElement('p');
            let projectEdit = document.createElement('ion-icon');
            let projectDel = document.createElement('ion-icon');

            projectP.textContent = Projects[i].name;

            projectP.addEventListener('click', () => {
                let name = Projects[i].name;

                //this is to remove everything from content before loading the section, else it will duplicate injected data
                removeContent();

                projectContent(name);
            })

            projectEdit.setAttribute('name','pencil-outline');
            projectEdit.setAttribute('class','edit-project');

            projectDel.setAttribute('name', 'trash-outline');
            projectDel.setAttribute('class', 'del-project');

            projectEdit.addEventListener('click', () => {
                let name = Projects[i].name;
                console.log(name);
                editProject(name);
            });

            projectDel.addEventListener('click', () => {
                let name = Projects[i].name;
                console.log(name);
                deleteProject(name);

            });
            
            projectDiv.appendChild(projectP);
            projectDiv.appendChild(projectEdit);
            projectDiv.appendChild(projectDel);

            navProjects.appendChild(projectDiv);
        }

    }

    function editProject(name) {
        const body = document.querySelector('body');
        const editProjectModal = document.createElement('dialog');
        const editProjectP = document.createElement('p');
        const renameProjectIpt = document.createElement('input');
        const editProjectMsg = document.createElement('label');
        const editProjectConfirmButton = document.createElement('button');
        const editProjectCancelButton = document.createElement('button');


        editProjectModal.setAttribute('class', 'modal-edit-project');
        editProjectP.textContent = 'Rename project';

        renameProjectIpt.value = name;
        renameProjectIpt.select();

        editProjectConfirmButton.textContent = 'Confirm';
        editProjectCancelButton.textContent = 'Cancel';

        editProjectConfirmButton.setAttribute('class', 'btn-confirm');
        editProjectCancelButton.setAttribute('class', 'btn-cancel');

        editProjectConfirmButton.addEventListener('click', () => {
            let newName = renameProjectIpt.value;

            if (newName == '') {
                editProjectMsg.setAttribute('class', 'error');
                editProjectMsg.textContent = 'Invalid name!';
                alert('Invalid name!');
                return;
            } else {
                editProjectMsg.classList.remove('error');
                editProjectMsg.textContent = '';
            }

            for (let i=0; i<Projects.length; i++) {
                if (Projects[i].name.toLowerCase() === newName.toLowerCase() && renameProjectIpt.value.toLowerCase() !== name.toLowerCase()) {
                    editProjectMsg.setAttribute('class', 'error');
                    editProjectMsg.textContent = "You cannot rename a project to an existing project's name";
                    console.log(Projects.length);
                    return;
                }
            }
            let index = Projects.findIndex(project => project.name === name);
            Projects[index].name = newName.charAt(0).toUpperCase() + newName.slice(1);
            updateProjectsList();
            storage.updateLocalStorageProjects(Projects);

            //Edits every task that is under this projects name, so every task changes projects name to the new one
            tasks.tasksProjectNameChanger(name, Projects[index].name);


            editProjectModal.remove();
            document.querySelector('.content').innerHTML = '';


        });

        editProjectCancelButton.addEventListener('click', () => {
            editProjectModal.remove();
        });

        editProjectModal.appendChild(editProjectP);
        editProjectModal.appendChild(renameProjectIpt);
        editProjectModal.appendChild(editProjectMsg);
        editProjectModal.appendChild(editProjectConfirmButton);
        editProjectModal.appendChild(editProjectCancelButton);

        body.appendChild(editProjectModal);
        editProjectModal.showModal();

        // removes modal when pressin escape key
        document.addEventListener('keyup',function(e){
            if (e.key === "Escape") { 
                
                editProjectModal.remove();
            }
        });       


    }

    function deleteProject(name) {
        const body = document.querySelector('body');
        const deleteProjectModal = document.createElement('dialog');
        const deleteProjectP = document.createElement('p');
        const deleteProjectConfirmButton = document.createElement('button');
        const deleteProjectCancelButton = document.createElement('button');

        deleteProjectModal.setAttribute('class', 'modal-delete-project');
        deleteProjectP.innerHTML = 'Delete project?';

        deleteProjectConfirmButton.textContent = 'Delete';
        deleteProjectCancelButton.textContent = 'Cancel';

        deleteProjectConfirmButton.setAttribute('class', 'btn-confirm');
        deleteProjectCancelButton.setAttribute('class', 'btn-cancel');



        deleteProjectModal.appendChild(deleteProjectP);
        deleteProjectModal.appendChild(deleteProjectConfirmButton);
        deleteProjectModal.appendChild(deleteProjectCancelButton);

        deleteProjectConfirmButton.addEventListener('click', () => {

            Projects = Projects.filter(item => item.name !== name);
            storage.updateLocalStorageProjects(Projects);
            deleteProjectModal.remove();
            updateProjectsList();
            tasks.tasksDeletion(name);
            document.querySelector('.content').innerHTML = '';
            
        });

        deleteProjectCancelButton.addEventListener('click',() => {
            
            deleteProjectModal.remove();

        });



        body.appendChild(deleteProjectModal);

        deleteProjectModal.showModal();

        //to avoid focusing a button right after opening the dialog
        deleteProjectModal.focus();

        // removes modal when pressin escape key
        document.addEventListener('keyup',function(e){
            if (e.key === "Escape") { 
                
                deleteProjectModal.remove();
            }
        });
    }

    class Project {
        constructor (name) {
            this.name = name.charAt(0).toUpperCase() + name.slice(1);
        }
    }

    function defaultProject() {

        let defaultPage = JSON.parse(localStorage.getItem('defaultP'));
        console.log(defaultPage);

        if (defaultPage === null) {
            const defaultProject = new Project('Default Project');
            Projects.push(defaultProject);
            storage.updateLocalStorageProjects(Projects);
        } else {
            Projects = storage.getLocalStorageProjects();
        }
        updateProjectsList();
        console.log(Projects);
        defaultPage = false;
        localStorage.setItem('defaultP', JSON.stringify(defaultPage));
        

    };

    document.addEventListener('DOMContentLoaded', function() {
        defaultProject();
    });

    function projectContent(name) {
        const content = document.querySelector('.content');
        const projectMain = document.createElement('div');
        const projectName = document.createElement('h1');
        const taskAdd = document.createElement('ion-icon');
        const projectTasks = document.createElement('div');

        projectName.textContent = name;

        taskAdd.setAttribute('name', 'add-circle-outline');
        taskAdd.setAttribute('class', 'add-task');
        
        projectTasks.setAttribute('class', 'tasks-list');

        taskAdd.addEventListener('click', () => {
            tasks.newTask(name);
        })


        projectMain.appendChild(projectName);
        projectMain.appendChild(taskAdd);
        

        content.appendChild(projectMain);
        content.appendChild(projectTasks);

        tasks.loadTasksList(name);
        console.log('project name is :', name)
    }

    function removeContent() {
        document.querySelector('.content').innerHTML = '';
    }



export default newProject;