function updateLocalStorageProjects(Projects) {
  localStorage.setItem("projects", JSON.stringify(Projects));
  return JSON.parse(localStorage.getItem("projects"));
}

function getLocalStorageProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

function updateLocalStorageTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return JSON.parse(localStorage.getItem("tasks"));
}

function getLocalStorageTasks() {
  let updatedTasks = JSON.parse(localStorage.getItem("tasks"));
  return updatedTasks === null ? [] : updatedTasks;
}

export default {
  updateLocalStorageProjects,
  getLocalStorageProjects,
  updateLocalStorageTasks,
  getLocalStorageTasks,
};
