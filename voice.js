const voiceBtn = document.getElementById("voiceBtn");

voiceBtn.onclick = () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "hi-IN"; // Hindi (change as needed)

  recognition.onresult = (event) => {
    document.getElementById("search").value =
      event.results[0][0].transcript;
  };

  recognition.start();
};
recognition.onresult = function(event) {
  const command = event.results[0][0].transcript.toLowerCase();

  if (command.includes("medical")) {
    findStores();
  } else if (command.includes("help")) {
    openHelp();
  } else if (command.includes("ambulance")) {
    window.location.href = "tel:108";
  }
};
