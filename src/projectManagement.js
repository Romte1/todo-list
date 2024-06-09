    const Projects = [];
    
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

        if (Projects.length > 1) {
        navProjects.querySelectorAll('div').forEach(div => {
            navProjects.removeChild(div);
        });
        }

        for (let i = 0; i<Projects.length; i++) {
            let projectDiv = document.createElement('div');
            let projectP = document.createElement('p');
            let projectDel = document.createElement('ion-icon');

            projectP.textContent = Projects[i].name;
            projectDel.setAttribute('name', 'trash-outline');
            
            projectDiv.appendChild(projectP);
            projectDiv.appendChild(projectDel);

            navProjects.appendChild(projectDiv);
        }

    }

    class Project {
        constructor (name) {
            this.name = name.charAt(0).toUpperCase() + name.slice(1);
        }
    }

    function defaultProject() {
        const defaultProject = new Project('Default Project');
        Projects.push(defaultProject);
        updateProjectsList();

    }

    document.addEventListener('DOMContentLoaded', function() {
        defaultProject();
    });



export default newProject;