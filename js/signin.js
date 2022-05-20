const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);

const userName = id("email"),
  password = id("password"),
  failureIcon = classes("failure-icon"),
  errorMsg = classes("error"),
  checkBox = id("checkbox"),
  btn = id("next"),
  form = id("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput(userName, 0, "Enter email or phone");
  checkInput(password, 1, "Enter password");
});

let checkInput = function (inputElement, index, message) {
  if (inputElement.value.trim() === "") {
    errorMsg[index].innerText = message;
    errorMsg[index].style.color = "red";
    inputElement.style.border = "1px solid red";
    errorMsg[index].style.opacity = "1";
    failureIcon[index].style.opacity = "1";
  } else {
    errorMsg[index].innerText = "";
    inputElement.style.border = "1px solid green";
    failureIcon[index].style.opacity = "0";
    errorMsg[index].style.opacity = "0";
  }
};

userName.value = localStorage.getItem("userName");
userName.oninput = () => {
  localStorage.setItem("userName", userName.value);
};
password.value = localStorage.getItem("password");
password.oninput = () => {
  localStorage.setItem("password", password.value);
  localStorage.removeItem("password", password.value);
};

checkBox.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});
