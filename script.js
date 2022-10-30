let btn = document.querySelector("#btn");
let container = document.querySelector(".container");
let repositories = document.querySelector(".repositories");
let about = document.querySelector(".about");
let resData = null;
let resLink = null;
let username = null;
const renderErorr = function (poruka) {
  container.insertAdjacentText("beforeend", poruka);
};

function renderUserName(data) {
  let html = `
  <img class="logo" src="${data.avatar_url}" />
  <h1 class="naziv">${data.name}</h1>
  <p1 class="bio">${data.bio ? data.bio : "No descrpitons"}</p1>
  <p1 onclick="following()" class="naziv followers">${
    data.followers
  } followers - ${data.following} following</p1>
  <p1 class="naziv">Location: ${
    data.location ? data.location : "No location"
  }</p1>
  `;
  about.innerHTML = "";
  repositories.innerHTML = "";
  about.insertAdjacentHTML("beforeend", html);
}

function renderRepositories(data) {
  // console.log(data);
  let html = `
  <button class ="btns">${data.name}</button>
  `;
  repositories.insertAdjacentHTML("beforeend", html);

  repositories.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("btns")) {
      window.location = `https://github.com/${username}/${e.target.innerText}`;
    }
  });
}

function getUserName() {
  username = document.querySelector("#sreach").value;
  let url = "https://api.github.com/users/" + username;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resData = data;
      renderUserName(data);
      return fetch(`https://api.github.com/users/${username}/repos`);
    })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((link) => {
        resLink = link;
        // console.log(resLink.html_url);
        renderRepositories(link);
      });
    })
    .catch((err) => {
      renderErorr(`Something went wrong ${err.message}. Try Again`);
    });
}
btn.addEventListener("click", getUserName);

// function following() {
//   url = resData.repos_url;
//   console.log(url);
//   getUserName();
// }
