let btn = document.querySelector("#btn");
let container = document.querySelector(".container");
btn.addEventListener("click", getUserName);
let resData = null;
function renderUserName(data) {
  let html = `
          <img class="logo" src="${data.avatar_url}" />
          <h1 class="naziv">${data.name}</h1>
          <p1 class="bio">${data.bio}</p1>
          <p1 onclick="following()" class="naziv followers">${data.followers} followers - ${data.following} following</p1>
          <p1 class="naziv">Location: ${data.location}</p1>

          `;
  container.innerHTML = "";
  container.insertAdjacentHTML("beforeend", html);
}

function getUserName() {
  let username = document.querySelector("#sreach").value;
  let url = "https://api.github.com/users/" + username;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resData = data;
      console.log(resData.repos_url);
      renderUserName(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function following() {
  url = resData.repos_url;
  console.log(url);
  getUserName();
}
