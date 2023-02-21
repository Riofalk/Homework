const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-z])/;

function validation() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    

    if (!email.match(validRegex)) 
      return alert("Wrong email")

    if (password.length < 2) 
      return alert("Worng password")   
    
      const dbPasswrod = localStorage.getItem(email);
      if (password != dbPasswrod) {
        alert("Wrong email/password")
        return
      }
      localStorage.setItem("currentUser", email)
      window.location.replace("http://127.0.0.1:5500/src/home.html");
  }

function showForm() {
  let registerBtn = document.getElementById("register-show-button")
  let registerForm = document.getElementById("register-container")

  registerBtn.classList.add("hidden")
  registerForm.classList.remove("hidden")
}

function validateForm() {
  let name =  document.getElementById("name").value
  let sname = document.getElementById("sname").value
  let email = document.getElementById("regEmail").value
  let reEmail = document.getElementById("emailRepeat").value
  let regPassword = document.getElementById("regPassword").value
  let rePassword = document.getElementById("passwordRepeat").value
  
  console.log(regPassword < 8)
  if(name.length < 2) return
  if(!(sname.length >= 2 || sname.length == 0)) return
  if(!email.match(validRegex)) return
  if(email != reEmail) return
  
  if(regPassword < 8) return
  if(rePassword != rePassword) return
  if (localStorage.getItem(email) !== null) {
    alert("User with this email is already registered")
    return
  }
  localStorage.setItem(email, regPassword);
  localStorage.setItem("currentUser", email)
  window.location.replace("http://127.0.0.1:5500/src/home.html");
}