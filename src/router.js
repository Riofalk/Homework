function redirection() {
    if (localStorage.getItem("currentUser") === null) window.location.replace("http://127.0.0.1:5500/src/login.html")
}

function logOut() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("myMovies")
    redirection()
}

redirection()