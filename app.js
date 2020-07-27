const getTextButton = document.querySelector("#getText");
const userButton = document.querySelector("#getUsers");
const postButton = document.querySelector("#getPost");
const outputDiv = document.querySelector(".output");
const form = document.querySelector("#addPost");

function getText() {
  fetch("sample.txt")
    .then((res) => res.text())
    .then((data) => displayText(data))
    .catch((err) => console.log(err));
}

function getUsers() {
  fetch("users.json")
    .then((res) => res.json())
    .then((data) => {
      displayUsers(data);
    });
}

function getPost() {
  fetch("http://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      displayPost(data);
    });
}

function addPost(e) {
  e.preventDefault();

  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;

  console.log(title);
  fetch("http://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "application/json",
    },
    body: JSON.stringify({ title: title, body: body }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function displayText(message) {
  outputDiv.innerHTML = message;
}

function displayUsers(users) {
  let output = `<h2 class="mb-4"> Users</h2>`;
  users.forEach((user) => {
    output += `
            <ul class="list-group mb-4">
                <li class="list-group-item">ID: ${user.id}</li>
                <li class="list-group-item">Name: ${user.name}</li>
                <li class="list-group-item">Email: ${user.email}</li>
            </ul>`;
  });
  outputDiv.innerHTML = output;
}

function displayPost(posts) {
  let output = `<h2 class="mb-4"> Posts</h2>`;
  posts.forEach((post) => {
    output += `
        <div class="card card-body mb-3">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>`;
  });
  outputDiv.innerHTML = output;
}

getTextButton.addEventListener("click", getText);
userButton.addEventListener("click", getUsers);
postButton.addEventListener("click", getPost);
form.addEventListener("submit", addPost);
