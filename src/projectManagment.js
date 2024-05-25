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
        if (target === newProjectBtn ) {
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

export default newProject;