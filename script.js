let btn = document.querySelector("#btn");
let container = document.querySelector(".container");
let repositories = document.querySelector(".repositories");
let about = document.querySelector(".about");
let closeBtn = document.querySelector("#closeModal");
let modal = document.querySelector(".custom-modal");
let modalFollowers = document.getElementById("modalFollowers");
let username = null;

async function getUserName() {
  username = document.querySelector("#sreach").value;
  let url = "https://api.github.com/users/" + username;
  try {
    const resUser = await axios.get(url);
    const resLink = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const resFollower = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const resFollowing = await axios.get(
      `https://api.github.com/users/${username}/following`
    );
    renderUserName(resUser.data);
    renderRepositories(resLink.data);
    renderFollower(resFollower.data);
    renderFollowing(resFollowing.data);
  } catch (error) {
    renderErorr(`Something went wrong ${error.message}. Try Again`);
  }
}

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
  data.forEach((el) => {
    let html = `
  <p class="language">Language: ${el.language}</p>
  <button class ="btns">${el.name}
  </button>
  `;
    repositories.insertAdjacentHTML("beforeend", html);
  });

  repositories.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("btns")) {
      window.location = `https://github.com/${username}/${e.target.innerText}`;
    }
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
