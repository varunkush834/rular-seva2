// 🔹 PASTE YOUR FIREBASE CONFIG HERE,
firebase.initializeApp({
  apiKey: "AIzaSyAIxPIcwezGuPHUjEGPvvfOSBBC7_AqOV0",
  authDomain: "rular-seva1.firebaseapp.com",
  projectId: "rular-seva1",
  storageBucket: "rular-seva1.firebasestorage.app",
  messagingSenderId: "702628851250",
  appId: "1:702628851250:web:58bd17537e09230574962b"
});

// AUTH
const auth = firebase.auth();
let confirmationResult;

// reCAPTCHA
window.onload = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    { size: "normal" }
  );
};

// SEND OTP
function sendOTP() {
  const phone = document.getElementById("phone").value;

  auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(result => {
      confirmationResult = result;
      alert("OTP Sent");
    })
    .catch(err => alert(err.message));
}

// VERIFY OTP
function verifyOTP() {
  const otp = document.getElementById("otp").value;

  confirmationResult.confirm(otp)
    .then(() => {
      alert("Login Successful");
      showScreen("home");
    })
    .catch(() => alert("Wrong OTP"));
}
