let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");
const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
  "input[placeholder='https://example.com/photo.jpg']"
);
const fullNameInput = form.querySelector("input[placeholder='Enter full name']");
const homeTownInput = form.querySelector("input[placeholder='Enter home town']");
const purposeInput = form.querySelector(
  "input[placeholder='e.g., Quick appointment note']"
);

const categoryRadios = form.querySelectorAll("input[name='category']");

const submitButton = form.querySelector(".submit-btn");

const pageHeading = document.querySelector("#page-heading"); 

function saveToLocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
  pageHeading.style.display = "none"; // heading hide karo jab form khole
});

closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
  pageHeading.style.display = "block"; // heading dobara dikhao form band karne pe
});

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  let selected = false;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  if (imageUrl === "") {
    alert("Please enter an Image URL.");
    return;
  }

  if (fullName === "") {
    alert("Please enter your Full Name.");
    return;
  }

  if (homeTown === "") {
    alert("Please enter your Home Town.");
    return;
  }

  if (purpose === "") {
    alert("Please enter the Purpose.");
    return;
  }

  if (!selected) {
    alert("Please select a category");
    return;
  }

  saveToLocalStorage({
    imageUrl,
    fullName,
    purpose,
    homeTown,
    selected,
  });

  form.reset();
  formContainer.style.display = "none";
  pageHeading.style.display = "block"; 
  showCards();
});

function getCategoryColor(category) {
  switch(category) {
    case "emergency": return "#ff4a4a"; // red
    case "important": return "#a855f7"; // purple
    case "urgent": return "#fb923c"; // orange
    case "no-rush": return "#14b8a6"; // teal
    default: return "#ccc";
  }
}

function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks"));

  if (!allTasks || allTasks.length === 0) {
    // Show dummy card if no data
    const dummyCard = document.createElement("div");
    dummyCard.classList.add("card");

    const avatar = document.createElement("img");
    avatar.src = "https://images.unsplash.com/photo-1593757147298-e064ed1419e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFuZHNvbWUlMjBtYW58ZW58MHx8MHx8fDA%3D";  // koi placeholder image
    avatar.alt = "dummy profile";
    avatar.classList.add("avatar");
    dummyCard.appendChild(avatar);

    const name = document.createElement("h2");
    name.textContent = "Rahul Gautam";
    dummyCard.appendChild(name);

    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = "Satna";

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    dummyCard.appendChild(hometownInfo);

    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = "Seeing Job";

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    dummyCard.appendChild(bookingsInfo);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';
    callBtn.disabled = true;

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";
    msgBtn.disabled = true;

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);
    dummyCard.appendChild(buttonsDiv);

    stack.appendChild(dummyCard);
    return;
  }

  // Agar data hai to normal cards show karo
  allTasks.forEach(function (task) {
    const card = document.createElement("div");
    card.classList.add("card");

    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    const name = document.createElement("h2");
    name.textContent = task.fullName;
    card.appendChild(name);

    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = task.purpose;

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    card.appendChild(bookingsInfo);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    card.style.border = `3px solid ${getCategoryColor(task.selected)}`;

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);
    card.appendChild(buttonsDiv);

    stack.appendChild(card);
  });
}

showCards();

function updateStack() {
  const cards = document.querySelectorAll(".stack .card");
  for (let i = 0; i < 3; i++) {
    let card = cards[i];
    if (!card) continue;
    card.style.zIndex = 3 - i;
    card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
    card.style.opacity = `${1 - i * 0.02}`;
  }
}

upBtn.addEventListener("click", function () {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    updateStack();
  }
});

downBtn.addEventListener("click", function () {
  const firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    updateStack();
  }
});
