function home () {
    const content = document.querySelector('.content');
    const navigator = document.querySelector('.nav');
    const navMenuTitle = document.createElement('h2');
    const navAddNewProjectDiv = document.createElement('div');

    navMenuTitle.textContent = 'Tasks';
    navigator.appendChild(navMenuTitle);
    navigator.appendChild(navAddNewProjectDiv);


}


export default home