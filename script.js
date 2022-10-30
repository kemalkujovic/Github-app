let btn = document.querySelector("#btn");
let container = document.querySelector(".container");
let repositories = document.querySelector(".repositories");
let about = document.querySelector(".about");
let resData = null;
let resLink = null;
let username = null;
let resFollower = null;
let follower = null;
let closeBtn = document.querySelector("#closeModal");
let modal = document.querySelector(".custom-modal");
let modalFollowers = document.getElementById("modalFollowers");
const renderErorr = function (poruka) {
  container.insertAdjacentText("beforeend", poruka);
};

function renderUserName(data) {
  let html = `
  <img class="logo" src="${data.avatar_url}" />
  <h1 class="naziv">${data.login}</h1>
  <p1 class="bio">${data.bio ? data.bio : "No descrpitons"}</p1>
  <p1 class="naziv followers">${data.followers} followers - ${
    data.following
  } following</p1>
  <p1 class="naziv">Location: ${
    data.location ? data.location : "No location"
  }</p1>
  `;
  follower = document.querySelector(".followers");
  about.innerHTML = "";

  document.querySelector(".h1-res").style.opacity = "1";
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
        renderRepositories(link);
      });

      return fetch(`https://api.github.com/users/${username}/followers`);
    })
    .then((res) => res.json())
    .then((follower) => {
      console.log(follower);
      resFollower = follower;
      renderFollower(follower);
    })
    .catch((err) => {
      renderErorr(`Something went wrong ${err.message}. Try Again`);
    });
}
btn.addEventListener("click", getUserName);

function renderFollower(follower) {
  let followerP = document.querySelector(".followers");
  followerP.addEventListener("click", function (e) {
    e.preventDefault();
    follower.forEach((data) => {
      let html = `
    <img class="logo" src="${data.avatar_url}" />
      <h1 class="naziv">${data.login}</h1>
    `;
      modal.style.display = "flex";
      modalFollowers.insertAdjacentHTML("beforeend", html);
    });
  });
}

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "none";
  modalFollowers.innerHTML = "";
});

// function following() {
//   url = resData.repos_url;
//   console.log(url);
//   getUserName();
// }
