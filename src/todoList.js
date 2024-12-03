import newProject from './projectManagement';
import tasks from './tasksManagement';

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
    const navAddNewProjectP = document.createElement('p');
    const navProjects = document.createElement('div');

    navMenuTitle1.textContent = 'Tasks';
    navMenuTitle2.textContent = 'Projects';

    navTodayP.textContent = 'Today';
    navThisWeekP.textContent = '7 Days';
    navAllTasksP.textContent = 'All Tasks';
    navCompletedTasksP.textContent = 'Completed';

    navAddNewProjectP.textContent = 'Add New Project';
    navAddNewProjectP.setAttribute('class','newProject');

    navProjects.setAttribute('class','projects');

    navTodayDiv.appendChild(navTodayP);
    navThisWeekDiv.appendChild(navThisWeekP);
    navAllTasksDiv.appendChild(navAllTasksP);
    navCompletedTasksDiv.appendChild(navCompletedTasksP);

    navAddNewProjectDiv.appendChild(navAddNewProjectP);
    

    navigator.appendChild(navMenuTitle1);
    
    navigator.appendChild(navTodayDiv);
    navigator.appendChild(navThisWeekDiv);
    navigator.appendChild(navAllTasksDiv);
    navigator.appendChild(navCompletedTasksDiv);

    navigator.appendChild(navMenuTitle2);

    navigator.appendChild(navAddNewProjectDiv);
    navigator.appendChild(navProjects);

    navTodayP.addEventListener('click', () => {

        //this is to remove everything from content before loading the section, else it will duplicate injected data
        removeContent();

        tasks.loadTasksByDate('Today');

    });

    navThisWeekDiv.addEventListener('click', () => {

        //this is to remove everything from content before loading the section, else it will duplicate injected data
        removeContent();

        tasks.loadTasksByDate('7 Days');

    });

    navAllTasksDiv.addEventListener('click', () => {

        
        tasks.loadAllTasks();

    });

    navCompletedTasksP.addEventListener('click', () => {

        //this is to remove everything from content before loading the section, else it will duplicate injected data
        removeContent();

        tasks.loadCompletedTasks();

    });


    navAddNewProjectP.addEventListener('click', () => {
        newProject();
    });
    
    function removeContent() {
        document.querySelector('.content').innerHTML = '';
    }

    tasks.loadTasksByDate('Today');

}


export default home