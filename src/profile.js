function setEmail() {
    document.getElementsByClassName("email")[0].innerHTML = localStorage.getItem("currentUser")
}

function resetEmail() {
    let email = document.getElementsByClassName("email")
    let person = prompt("Please enter your name", email[0].innerHTML);

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-z])/;

    if (!person.match(validRegex)) {
        alert("Wrong email format")
        resetEmail()     
    }
    localStorage.setItem("currentUser", person)
    document.getElementsByClassName("email")[0].innerHTML = person;
}