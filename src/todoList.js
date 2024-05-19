function home () {
    const content = document.querySelector('.content');
    const navigator = document.querySelector('.nav');
    const navMenuTitle1 = document.createElement('h2');
    const navMenuTitle2 = document.createElement('h2');
    const navTodayDiv = document.createElement('div');
    const navThisWeekDiv = document.createElement('div');
    const navAllTasksDiv = document.createElement('div');
    const navCompletedTasksDiv = document.createElement('div');
    const navTodayP = document.createElement('p');
    const navThisWeekP = document.createElement('p');
    const navAllTasksP = document.createElement('p');
    const navCompletedTasksP = document.createElement('p');
    const navAddNewProjectDiv = document.createElement('div');
    const navAddNewPorjectP = document.createElement('p');

    navMenuTitle1.textContent = 'Tasks';
    navMenuTitle2.textContent = 'Projects';

    navTodayP.textContent = 'Today';
    navThisWeekP.textContent = 'This Week';
    navAllTasksP.textContent = 'All Tasks';
    navCompletedTasksP.textContent = 'Completed Tasks';

    navAddNewPorjectP.textContent = 'Add New Project';

    navTodayDiv.appendChild(navTodayP);
    navThisWeekDiv.appendChild(navThisWeekP);
    navAllTasksDiv.appendChild(navAllTasksP);
    navCompletedTasksDiv.appendChild(navCompletedTasksP);

    navAddNewProjectDiv.appendChild(navAddNewPorjectP);
    

    navigator.appendChild(navMenuTitle1);
    
    navigator.appendChild(navTodayDiv);
    navigator.appendChild(navThisWeekDiv);
    navigator.appendChild(navAllTasksDiv);
    navigator.appendChild(navCompletedTasksDiv);

    navigator.appendChild(navMenuTitle2);

    navigator.appendChild(navAddNewProjectDiv);


}


export default home