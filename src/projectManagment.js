function newProject() {
    const body = document.querySelector('body');
    const newProjectModal = document.createElement('dialog');
    const newProjectP = document.createElement('p');
    const newProjectLbl = document.createElement('label');
    const newProjectIpt = document.createElement('input');

    newProjectP.textContent = 'New Project';
    newProjectLbl.textContent = 'Name: ';

    newProjectLbl.setAttribute('for', 'Name');

    newProjectIpt.setAttribute('type', 'text');
    newProjectIpt.setAttribute('id', 'Name');
    newProjectIpt.setAttribute('name', 'Name');

    newProjectModal.setAttribute('class', 'modal');

    newProjectModal.appendChild(newProjectP);
    newProjectModal.appendChild(newProjectLbl);
    newProjectModal.appendChild(newProjectIpt);

    body.appendChild(newProjectModal);

    newProjectModal.showModal();

    alert('hola');
}

export default newProject;