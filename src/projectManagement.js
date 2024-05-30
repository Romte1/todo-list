    const Projects = [];

    function defaultProject() {
        const defaultProject = new Project('Default Project');
        Projects.push(defaultProject);
    }
    
    function newProject() {
    const body = document.querySelector('body');
    const newProjectModal = document.createElement('dialog');
    const newProjectP = document.createElement('p');
    const newProjectLbl = document.createElement('label');
    const newProjectIpt = document.createElement('input');
    const newProjectBtn = document.createElement('button');

    newProjectP.textContent = 'New Project';
    newProjectLbl.textContent = 'Name: ';
    newProjectBtn.textContent = 'Create!';

    newProjectLbl.setAttribute('for', 'Name');

    newProjectIpt.setAttribute('type', 'text');
    newProjectIpt.setAttribute('id', 'Name');
    newProjectIpt.setAttribute('name', 'Name');

    addEventListener ('click' , ({target}) => {

        if (target === newProjectBtn && newProjectIpt.value !== '' ) {

            for (let i=0; i<Projects.length; i++) {
                if (Projects[i].name === newProjectIpt.value) {
                    console.log('You cannot have two projects with the exact same name!');
                    console.log(Projects.length);
                    newProjectModal.remove();
                    return;
                }
            }
            var project = new Project(newProjectIpt.value);
            Projects.push(project);
            console.log(Projects.length);
            newProjectModal.remove();
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
    newProjectModal.appendChild(newProjectBtn);

    body.appendChild(newProjectModal);

    newProjectModal.showModal();

    }

    class Project {
        constructor (name) {
            this.name = name;
        }
    }

    defaultProject();



export default newProject;