
function updateLocalStorageProjects(Projects) {

    localStorage.setItem('projects', JSON.stringify(Projects));
    return JSON.parse(localStorage.getItem('projects'));

}

function getLocalStorageProjects() {
    return JSON.parse(localStorage.getItem('projects'));
}



export default {updateLocalStorageProjects, getLocalStorageProjects};