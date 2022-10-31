let btn = document.querySelector("#btn");
let container = document.querySelector(".container");
let repositories = document.querySelector(".repositories");
let about = document.querySelector(".about");
let closeBtn = document.querySelector("#closeModal");
let modal = document.querySelector(".custom-modal");
let modalFollowers = document.getElementById("modalFollowers");
let resData,
  resLink,
  username,
  resFollower = null;

const renderErorr = function (poruka) {
  container.insertAdjacentText("beforeend", poruka);
};

function renderUserName(data) {
  let html = `
  <img class="logo" src="${data.avatar_url}" />
  <h1 class="naziv">${data.login}</h1>
  <p1 class="bio">${data.bio ? data.bio : "No descrpitons"}</p1>
  <p1 class="naziv followers">Followers: ${data.followers}</p1>
  <p1 class="following">Following: ${data.following}</p1>
  <p1 class="naziv">Location: ${
    data.location ? data.location : "No location"
  }</p1>
  `;
  let follower = document.querySelector(".followers");
  about.innerHTML = "";

  document.querySelector(".h1-res").style.opacity = "1";
  repositories.innerHTML = "";
  about.insertAdjacentHTML("beforeend", html);
}

function renderRepositories(data) {
  let html = `
  <p class="language">Language: ${data.language}</p>
  <button class ="btns">${data.name}
  </button>
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
        console.log(link);
        resLink = link;
        renderRepositories(link);
      });

      return fetch(`https://api.github.com/users/${username}/followers`);
    })
    .then((res) => res.json())
    .then((follower) => {
      resFollower = follower;
      renderFollower(follower);
      return fetch(`https://api.github.com/users/${username}/following`);
    })
    .then((res) => res.json())
    .then((following) => {
      renderFollowing(following);
      console.log(following);
    })
    .catch((err) => {
      renderErorr(`Something went wrong ${err.message}. Try Again`);
    });
}

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

function renderFollowing(follower) {
  let followingP = document.querySelector(".following");
  followingP.addEventListener("click", function (e) {
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
btn.addEventListener("click", getUserName);
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "none";
  modalFollowers.innerHTML = "";
});
