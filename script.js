const SECRET_PASSWORD = "2011";

const wrongMessages = [
  "আবার চেষ্টা করো, Momo! 🥺",
  "একটু আর ভাবো! 💗",
  "হিন্টটা কিন্তু তোমার কাছেই আছে! 🌷",
  "Detective Momo, try again! 🕵️",
  "তুমি পারবে! ✨"
];

let wrongCount = 0;
let selectedMeeting = null;
let countdownTimer = null;

function goTo(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function checkPassword() {
  const value = document.getElementById("pass").value.trim();
  const message = document.getElementById("passMsg");

  if (value === SECRET_PASSWORD) {
    message.textContent = "Welcome, Momo! 💗";
    setTimeout(() => goTo("welcome"), 700);
  } else {
    message.textContent =
      wrongMessages[wrongCount % wrongMessages.length];
    wrongCount++;
  }
}

document.getElementById("pass").addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

function previewPhoto(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");
    return;
  }

  const img = document.getElementById(id);

  if (img.dataset.url) URL.revokeObjectURL(img.dataset.url);

  img.dataset.url = URL.createObjectURL(file);
  img.src = img.dataset.url;
  img.style.display = "block";
}

function saveFirstDate() {
  const value = document.getElementById("firstMeetDate").value;
  const result = document.getElementById("firstDateResult");
  const elapsed = document.getElementById("firstElapsed");

  if (!value) {
    result.textContent = "একটি তারিখ বেছে নাও! 🌸";
    elapsed.textContent = "";
    return;
  }

  const date = new Date(value + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date > today) {
    result.textContent = "আগের কোনো তারিখ বেছে নাও।";
    elapsed.textContent = "";
    return;
  }

  const days = Math.floor((today - date) / 86400000);

  result.textContent = "Our first meeting date is saved! 🌹";
  elapsed.textContent = days + " beautiful days have passed. 💞";
  createHearts(15);
}

function previewMeeting() {
  const date = document.getElementById("nextMeetDate").value;
  const time = document.getElementById("meetTime").value;
  const message = document.getElementById("meetMessage").value.trim();

  if (!date || !time) {
    alert("Please select your meeting date and time.");
    return;
  }

  const chosen = new Date(date + "T" + time);

  if (chosen <= new Date()) {
    alert("Please choose a future date and time.");
    return;
  }

  selectedMeeting = { date, time, message };

  document.getElementById("previewDate").textContent =
    "Date: " + new Date(date + "T00:00:00").toLocaleDateString();

  document.getElementById("previewTime").textContent =
    "Time: " + time;

  document.getElementById("previewMessage").textContent =
    message || "A beautiful day awaits us! 💗";

  document.getElementById("meetingPreview").classList.remove("hidden");
  document.getElementById("meetingConfirmed").classList.add("hidden");
}

function confirmMeeting() {
  if (!selectedMeeting) return;

  const dateTime = selectedMeeting.date + "T" + selectedMeeting.time;
  const target = new Date(dateTime);

  document.getElementById("meetingConfirmed").classList.remove("hidden");

  document.getElementById("confirmedText").textContent =
    "Our planned meeting: " + target.toLocaleString();

  if (countdownTimer) clearInterval(countdownTimer);

  function updateCountdown() {
    const remaining = target.getTime() - Date.now();

    if (remaining <= 0) {
      document.getElementById("countdown").textContent =
        "Today is your planned meeting day! 💗";
      clearInterval(countdownTimer);
      return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    document.getElementById("countdown").textContent =
      `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left 💞`;
  }

  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
  createHearts(35);
}

function quizAnswer(correct) {
  document.getElementById("quizResult").textContent = correct
    ? "একদম ঠিক! This little world is for you, Momo! 💗"
    : "আবার চেষ্টা করো! 🌸";

  if (correct) createHearts(15);
}

function openGift() {
  const message = document.getElementById("finalMessage");

  if (message.classList.contains("hidden")) {
    message.classList.remove("hidden");
    createHearts(40);
  }
}

function createHearts(amount) {
  const emojis = ["💗", "💖", "💕", "✨", "🌸", "❤️"];

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = 20 + Math.random() * 25 + "px";
    heart.style.zIndex = "100";
    heart.style.pointerEvents = "none";
    heart.style.transition = "all 1.8s ease";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = "translateY(-120px) scale(1.5)";
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 1900);
  }
}

function startBackgroundHearts() {
  const container = document.getElementById("hearts");

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = i % 4 === 0 ? "✦" : "♥";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 12 + Math.random() * 22 + "px";
    heart.style.animationDuration = 8 + Math.random() * 12 + "s";
    heart.style.animationDelay = -Math.random() * 15 + "s";

    container.appendChild(heart);
  }
}

startBackgroundHearts();
