const typewriterText =
  "💌 Every moment with you is like a beautiful dream. You are my sunshine, my joy, and my everything. I have a very important question for you...";
const typewriterElement = document.getElementById("typewriter");
const proposalBox = document.getElementById("proposal-box");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainContent = document.getElementById("main-content");
const celebration = document.getElementById("celebration");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const reasonText = document.getElementById("reason-text");

// Personalized Reasons Array
const reasons = [
  "Your beautiful smile",
    "The way you care for everyone",
  "Your amazing laugh",
  "How you make me a better person",
  "Just being YOU!",
];

// Cycle through reasons
let reasonIndex = 0;
function changeReason() {
  reasonText.style.opacity = 0;
  setTimeout(() => {
    reasonIndex = (reasonIndex + 1) % reasons.length;
    reasonText.innerText = "💕 " + reasons[reasonIndex];
    reasonText.style.opacity = 1;
  }, 500);
}

setInterval(changeReason, 3000);

// Music Toggle
let isPlaying = false;
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.innerText = "▶️ Play Music";
  } else {
    bgMusic
      .play()
      .catch((e) =>
        alert("Please add a music file to the audio tag in index.html!"),
      );
    musicBtn.innerText = "⏸️ Pause Music";
  }
  isPlaying = !isPlaying;
});

let i = 0;
function typeWriter() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  } else {
    setTimeout(() => {
      proposalBox.classList.remove("hidden");
      proposalBox.style.animation = "fadeIn 1s ease-in";
    }, 500);
  }
}

// Start typewriter on load
window.onload = typeWriter;

// Floating "No" button
noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton); // For mobile

function moveButton() {
  const containerRect = document
    .querySelector(".container")
    .getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate boundaries within the window, but let's keep it somewhat near
  const maxX = window.innerWidth - btnRect.width - 20;
  const maxY = window.innerHeight - btnRect.height - 20;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Make sure it doesn't just disappear off screen, keep it fixed to viewport logic
  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

yesBtn.addEventListener("click", () => {
  proposalBox.classList.add("hidden");
  typewriterElement.classList.add("hidden");
  celebration.classList.remove("hidden");
  startConfetti();
});

/* Confetti Logic */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cx = window.innerWidth;
let cy = window.innerHeight;
let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front: "#ff4d6d", back: "#c9184a" },
  { front: "#ff8fa3", back: "#ff758f" },
  { front: "#fff0f3", back: "#ffccd5" },
];

resizeCanvas();

window.addEventListener("resize", () => {
  resizeCanvas();
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width;
  cy = ctx.canvas.height;
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function initConfetti() {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1,
      },
      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Draw confetti
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(
      confetto.velocity.y + gravity,
      terminalVelocity,
    );
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  if (confetti.length > 0) {
    window.requestAnimationFrame(render);
  }
}

function startConfetti() {
  initConfetti();
  render();
}
