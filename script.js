function startSurprise() {
  document.querySelector(".black-screen").style.display = "none";
  document.getElementById("mainContent").style.display = "block";

  const audio = document.getElementById("birthdayAudio");
  audio.play();

  launchBalloons();
  launchConfetti();
  placeFloatingPhotos();
}


function launchBalloons() {
  const container = document.getElementById("balloonContainer");
  for (let i = 0; i < 25; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    balloon.style.color = balloon.style.backgroundColor;
    balloon.style.animationDelay = Math.random() * 3 + "s";
    container.appendChild(balloon);
  }
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    d: Math.random() * 100,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltIncrement: (Math.random() * 0.07) + .05
  }));

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      c.tiltAngle += c.tiltIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x + c.tilt + c.r / 2, c.y + c.r);
      ctx.stroke();
    });

    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();
}

function placeFloatingPhotos() {
  const usedZones = [];

  document.querySelectorAll(".float-photo").forEach(photo => {
    let x, y, tries = 0, safe = false;

    while (!safe && tries < 100) {
      x = Math.floor(Math.random() * 80); // 0–80 vw
      y = Math.floor(Math.random() * 80); // 0–80 vh
      tries++;

      // Avoid center area (Sruthi photo zone)
      const inCenter =
        x > 35 && x < 65 &&
        y > 5 && y < 55;

      // Check distance from other photos
      const tooClose = usedZones.some(pos => {
        return Math.abs(pos.x - x) < 15 && Math.abs(pos.y - y) < 15;
      });

      if (!inCenter && !tooClose) {
        safe = true;
        usedZones.push({ x, y });
      }
    }

    // Apply safe position
    photo.style.left = x + "vw";
    photo.style.top = y + "vh";
  });
}
// 🎵 Music pause/play toggle
const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("birthdayAudio");

musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = "⏸ Pause Music";
  } else {
    audio.pause();
    musicBtn.textContent = "▶ Play Music";
  }
});



