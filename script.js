
/* =================================
   A LITTLE WORLD OF LOVE
   SCRIPT.JS
================================= */

// PASSWORD
const SECRET_PASSWORD = "2011";

const wrongMessages = [
  "উফ! আবার চেষ্টা করো, Momo! 🥺",
  "একটু আর ভাবো… তুমি পারবে! 💗",
  "হিন্টটা কিন্তু তোমার কাছেই আছে! 🌷",
  "Nope! আরেকবার চেষ্টা করো, Detective Momo! 🕵️‍♀️",
  "এই ছোট্ট পৃথিবীটা খুলতে আরেকটু চেষ্টা করো! ✨"
];

let wrongCount = 0;


// PAGE NAVIGATION
function goTo(pageId) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// PASSWORD CHECK
function checkPassword() {

  const password = document
    .getElementById("pass")
    .value
    .trim();

  const message = document.getElementById("passMsg");

  if (password === SECRET_PASSWORD) {

    message.textContent =
      "Yay! Welcome, Momo! 💗";

    setTimeout(() => {
      goTo("welcome");
    }, 700);

  } else {

    message.textContent =
      wrongMessages[
        wrongCount % wrongMessages.length
      ];

    wrongCount++;
  }
}


// ENTER KEY PASSWORD
document
  .getElementById("pass")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      checkPassword();
    }

  });


// PHOTO PREVIEW
function previewPhoto(event, imageId) {

  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  const image = document.getElementById(imageId);

  if (image.dataset.objectUrl) {
    URL.revokeObjectURL(image.dataset.objectUrl);
  }

  const imageUrl = URL.createObjectURL(file);

  image.src = imageUrl;
  image.dataset.objectUrl = imageUrl;
  image.style.display = "block";
}


// SPECIAL DATE
function saveDate() {

  const dateValue =
    document.getElementById("meetDate").value;

  const result =
    document.getElementById("dateResult");

  const elapsed =
    document.getElementById("elapsed");

  if (!dateValue) {

    result.textContent =
      "আগে একটি তারিখ বেছে নাও, Momo! 🌸";

    elapsed.textContent = "";
    return;
  }

  const selectedDate =
    new Date(dateValue + "T00:00:00");

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {

    result.textContent =
      "আজকের বা তার আগের কোনো তারিখ বেছে নাও। 💗";

    elapsed.textContent = "";
    return;
  }

  const difference =
    today.getTime() - selectedDate.getTime();

  const totalDays =
    Math.floor(difference / (1000 * 60 * 60 * 24));

  result.textContent =
    "Our special date has been saved! 🌹✨";

  elapsed.textContent =
    "এই সুন্দর দিনটির পর কেটে গেছে " +
    totalDays.toLocaleString() +
    " দিন। 💞";

  createHearts(12);
}


// QUIZ ANSWER
function quizAnswer(correct) {

  const result =
    document.getElementById("quizResult");

  if (correct) {

    result.textContent =
      "একদম ঠিক! এই ছোট্ট পৃথিবীটা তোমার জন্যই! 💗";

    createHearts(15);

  } else {

    result.textContent =
      "আবার চেষ্টা করো, Momo! উত্তরটা তুমি জানো! 🌷";

  }
}


// GIFT BOX
function openGift() {

  const finalMessage =
    document.getElementById("finalMessage");

  if (!finalMessage.classList.contains("hidden")) {
    return;
  }

  finalMessage.classList.remove("hidden");

  createHearts(35);

}


// FLOATING HEARTS
function createHearts(amount) {

  const emojis = [
    "💗",
    "💖",
    "💕",
    "✨",
    "🌸",
    "❤️"
  ];

  for (let i = 0; i < amount; i++) {

    const heart =
      document.createElement("span");

    heart.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.position = "fixed";

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.top =
      Math.random() * 100 + "vh";

    heart.style.fontSize =
      (18 + Math.random() * 25) + "px";

    heart.style.zIndex = "100";

    heart.style.pointerEvents = "none";

    heart.style.transition =
      "all 1.8s ease-out";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

      heart.style.transform =
        "translateY(-120px) scale(1.5)";

      heart.style.opacity = "0";

    });

    setTimeout(() => {
      heart.remove();
    }, 1900);

  }
}


// BACKGROUND FLOATING HEARTS
function startBackgroundHearts() {

  const container =
    document.getElementById("hearts");

  for (let i = 0; i < 25; i++) {

    const heart =
      document.createElement("span");

    heart.className = "heart";

    heart.textContent =
      i % 4 === 0 ? "✦" : "♥";

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.fontSize =
      (12 + Math.random() * 22) + "px";

    heart.style.animationDuration =
      (8 + Math.random() * 12) + "s";

    heart.style.animationDelay =
      (-Math.random() * 15) + "s";

    container.appendChild(heart);

  }

}


// START WEBSITE
document.addEventListener("DOMContentLoaded", function() {

  startBackgroundHearts();

});
