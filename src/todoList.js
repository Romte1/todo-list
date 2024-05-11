function home () {
    const content = document.querySelector('.content');
    const navigator = document.querySelector('.nav');
    const navMenuTitle = document.createElement('h2');
    const navAddNewProjectDiv = document.createElement('div');
    const navAddNewPorjectP = document.createElement('p');

    navMenuTitle.textContent = 'Tasks';
    navAddNewPorjectP.textContent = 'Add New Project';

    navAddNewProjectDiv.appendChild(navAddNewPorjectP);
    navigator.appendChild(navMenuTitle);
    navigator.appendChild(navAddNewProjectDiv);


}


export default home