function askAI() {
  const input = document.getElementById("chatInput").value;
  const output = document.getElementById("chatOutput");

  output.innerHTML = "🤖 Thinking...";

  setTimeout(() => {
    output.innerHTML = `
      AI Answer:<br>
      For common illness, visit nearest PHC.
      If emergency call 108.
    `;
  }, 1000);
}
