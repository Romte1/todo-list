function home () {
    const content = document.querySelector('.content');
    const navigator = document.querySelector('.nav');
    const navMenuTitle = document.createElement('h2');

    navMenuTitle.textContent = 'Tasks';
    navigator.appendChild(navMenuTitle);


}


export default home