const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);

const firstName = id("first-name"),
  lastName = id("last-name"),
  userName = id("email"),
  password = id("password"),
  confirmPassword = id("confirm"),
  failureIcon = classes("failure-icon"),
  instruction = classes("instruction"),
  errorMsg = classes("error"),
  checkBox = id("checkbox"),
  btn = id("next"),
  form = id("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput(firstName, 0, "Enter first and last names");
  checkInput(lastName, 0, "Enter first and last names");
  checkInput(userName, 1, "Choose a Gmail address");
  checkInput(password, 2, "Enter password");
  checkInput(confirmPassword, 2, "Confirm password");
});

let checkInput = function (inputElement, index, message) {
  if (inputElement.value.trim() === "") {
    errorMsg[index].innerText = message;
    errorMsg[index].style.color = "red";
    inputElement.style.border = "1px solid red";
    errorMsg[index].style.opacity = "1";
    failureIcon[index].style.opacity = "1";
    instruction[index].style.opacity = "0";
  } else if (
    inputElement.value.trim() !== "" &&
    password.value !== confirmPassword.value
  ) {
    errorMsg[2].innerText = "Passwords are not matching";
    password.style.border = "1px solid red";
    confirmPassword.style.border = "1px solid red";
    failureIcon[2].style.opacity = "1";
    errorMsg[2].style.opacity = "1";
  } else {
    errorMsg[index].innerText = "";
    inputElement.style.border = "1px solid green";
    failureIcon[index].style.opacity = "0";
    errorMsg[index].style.opacity = "0";
  }
};

firstName.value = localStorage.getItem("firstName");
firstName.oninput = () => {
  localStorage.setItem("firstName", firstName.value);
};
lastName.value = localStorage.getItem("lastName");
lastName.oninput = () => {
  localStorage.setItem("lastName", lastName.value);
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
confirmPassword.value = localStorage.getItem("confirmPassword");
confirmPassword.oninput = () => {
  localStorage.setItem("confirmPassword", confirmPassword.value);
  localStorage.removeItem("confirmPassword", confirmPassword.value);
};

checkBox.addEventListener("click", function () {
  if (password.type === "password" && confirmPassword.type === "password") {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
});
