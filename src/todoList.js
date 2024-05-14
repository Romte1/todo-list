function home () {
    const content = document.querySelector('.content');
    const navigator = document.querySelector('.nav');
    const navMenuTitle1 = document.createElement('h2');
    const navTodayDiv = document.createElement('div');
    const navTodayP = document.createElement('p');
    const navAddNewProjectDiv = document.createElement('div');
    const navAddNewPorjectP = document.createElement('p');

    navMenuTitle1.textContent = 'Tasks';

    navTodayP.textContent = 'Today';

    navAddNewPorjectP.textContent = 'Add New Project';

    navTodayDiv.appendChild(navTodayP);
    navAddNewProjectDiv.appendChild(navAddNewPorjectP);

    navigator.appendChild(navMenuTitle1);
    navigator.appendChild(navTodayDiv);
    navigator.appendChild(navAddNewProjectDiv);


}


export default home