function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goLogin() {
  showScreen("login");
}

function login() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  document.getElementById("userName").innerText = name;
  document.getElementById("pName").innerText = name;
  document.getElementById("pPhone").innerText = phone;

  showScreen("home");
}

function showHome() { showScreen("home"); }
function showChat() { showScreen("chat"); }
function showProfile() { showScreen("profile"); }

function logout() {
  showScreen("login");
}
function findStores() {
  showScreen("location");
  getCurrentLocation();
}