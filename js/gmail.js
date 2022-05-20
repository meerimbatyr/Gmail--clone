import { primary } from "./datagmail.js";
import { months } from "./datagmail.js";

//Render data to UI
const emailList = document.querySelector(".email-list");
const pageInfo = document.querySelector(".pageinfo");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const input = document.querySelector("#search");

let itemNumber = 0;
let limit = 20;

//Create function for creating email lists
function createEmailList(emails) {
  if (itemNumber <= 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  const lastPage = emails.length / limit;
  if (itemNumber + 1 >= lastPage) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  let start = limit * itemNumber;
  let end = (itemNumber + 1) * limit;
  let partDisplayed = emails.slice(start, end);
  if (end > emails.length) {
    end = emails.length;
  }

  //Dislpay range of emails
  pageInfo.innerText = `${start + 1}-${end} of ${emails.length}`;

  partDisplayed.forEach((email) => {
    const oneEmail = `
      <li class="email-item">
      <div class='email-item-left'>
          <input type="checkbox" name ="${email.id}" data-id="${email.id}">
          <i class="fa fa-star"></i>
          <i class="fa fa-arrow-right"></i>
      </div>
      <div class="sender">
        <span>${email.senderName}</span>
      </div>
      <div class="message">
        <span class="email-title">${email.messageTitle}</span>
        <span class="email-message">${email.messages[0].message}</span>
      </div>
      <div class="date"> <span>${
        months[email.date.getMonth()]
      }-${email.date.getDate()}</span></div>
      </li>
    `;
    emailList.innerHTML += oneEmail;
  });
}
createEmailList(primary);

//Add event listeners for previous and next buttons
prevBtn.addEventListener("click", function () {
  emailList.innerHTML = "";
  itemNumber--;
  createEmailList(primary);
});

nextBtn.addEventListener("click", function () {
  emailList.innerHTML = "";
  itemNumber++;
  createEmailList(primary);
});

// Search emails by sender name
const searchBtn = document.querySelector(".fa-search");
const closeBtn = document.querySelector(".fa-xmark");
const dropdownEmails = document.querySelector(".search-list");

input.addEventListener("input", function (event) {
  const emailName = event.target.value;
  let filteredEmails = primary.filter((email) => {
    return email.senderName.toLowerCase().includes(emailName.toLowerCase());
  });
  showSearchedEmails(filteredEmails);

  searchBtn.addEventListener("click", function () {
    emailList.innerHTML = "";
    createEmailList(filteredEmails);
    dropdownEmails.innerHTML = "";
  });
});

closeBtn.addEventListener("click", function () {
  input.value = "";
  input.focus();
  dropdownEmails.innerHTML = "";
});

//create function that will display the result of searched emails
function showSearchedEmails(emails) {
  const allEmails = emails.map((email) => {
    return `
    <div class="search-list-item" data-id="${email.id}">
              <div class="search-item-icon">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div class="search-item-info">
                <div>
                  <h5>
                  ${email.messages[0].message}
                  </h5>
                  <p>${email.senderName}</p>
                </div>
                <div class="search-item-date">${email.date.getDate()}/${email.date.getMonth()}/${email.date.getFullYear()}</div>
              </div>
              
            </div>
    `;
  });

  dropdownEmails.innerHTML = allEmails.join("");

  //when clicked on each email, it should open the email
  const myArray = document.getElementsByClassName("search-list-item");

  const listOfEmails = Array.from(myArray);

  listOfEmails.forEach((email) => {
    document
      .querySelector(`[data-id=${email.dataset.id}]`)
      .addEventListener("click", function () {
        openEmail(email.dataset.id);
      });
  });
}

//Meerim's part
// Sidebar left
const toggleBtn = document.querySelector(".header-icon");
const sidebarHide = document.querySelector(".menu");
const compose = document.querySelector(".compose");
const inbox = document.querySelector(".inbox");
const starred = document.querySelector(".starred");
const trash = document.querySelector(".trash");
const spam = document.querySelector(".spam");

// show and hide side bar on left
toggleBtn.addEventListener("click", function () {
  sidebarHide.classList.toggle("hidden");
});

//New email popup should come out
compose.addEventListener("click", function () {
  console.log("lala");
});

inbox.addEventListener("click", function () {
  emailList.innerHTML = "";
  createEmailList(primary);
});

starred.addEventListener("click", function () {
  emailList.innerHTML = "";
  const star = primary.filter((email) => {
    if (email.tags.isStarred === true) {
      return email;
    }
  });

  createEmailList(star);
});

trash.addEventListener("click", function () {
  emailList.innerHTML = "";
  const trashed = primary.filter((email) => {
    if (email.tags.isTrash === true) {
      return email;
      console.log(email);
    }
  });
  createEmailList(trashed);
});

spam.addEventListener("click", function () {
  emailList.innerHTML = "";
  const spammed = primary.filter((email) => {
    if (email.tags.isSpam === true) {
      return email;
      console.log(email);
    }
  });
  createEmailList(spammed);
});

//side bar right
const calendar = document.querySelector(".calendar");
const keep = document.querySelector(".keep");
const tasks = document.querySelector(".tasks");
const contacts = document.querySelector(".contacts");
const add = document.querySelector(".add");
const hideArrow = document.querySelector(".hide");
const showArrow = document.querySelector(".show");
const sidebarRight = document.querySelector(".aside-right");

//sidebar on right side
calendar.addEventListener("click", function () {
  console.log("here");
});

hideArrow.addEventListener("click", function () {
  sidebarRight.classList.toggle("show-aside");
  hideArrow.classList.toggle("hidden");
  showArrow.classList.toggle("hidden");
});

showArrow.addEventListener("click", function () {
  sidebarRight.classList.toggle("show-aside");
  hideArrow.classList.toggle("hidden");
  showArrow.classList.toggle("hidden");
});
