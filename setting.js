function openSettings() {
  document.getElementById("settingsPanel").classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settingsPanel").classList.add("hidden");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function changeLanguage(lang) {
  alert("Language changed to " + lang);
}
