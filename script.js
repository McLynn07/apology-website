const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");
const musicIcon = document.querySelector(".music-icon");

const openButton = document.getElementById("openButton");
const forgiveButton = document.getElementById("forgiveButton");
const thankYou = document.getElementById("thankYou");
const transition = document.getElementById("transition");
const typingNote = document.getElementById("typingNote");
const paperPlane = document.querySelector(".paper-plane");

let musicPlaying = false;

/* ---------------- MUSIC ---------------- */

musicButton.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await music.play();
      musicPlaying = true;
      musicIcon.textContent = "Ⅱ";
      musicText.textContent = "our song is playing";
    } else {
      music.pause();
      musicPlaying = false;
      musicIcon.textContent = "♪";
      musicText.textContent = "play our song";
    }
  } catch (error) {
    musicText.textContent = "add song to assets";
    console.log("Music could not be played:", error);
  }
});

music.addEventListener("ended", () => {
  musicPlaying = false;
  musicIcon.textContent = "♪";
  musicText.textContent = "play our song";
});

/* ---------------- OPEN TRANSITION ---------------- */

openButton.addEventListener("click", () => {
  transition.classList.add("active");

  setTimeout(() => {
    document.getElementById("opening").nextElementSibling.scrollIntoView({
      behavior: "instant"
    });
  }, 450);

  setTimeout(() => {
    transition.classList.remove("active");
  }, 900);

  /* Try music only after a real user interaction. */
  if (!musicPlaying) {
    music.play()
      .then(() => {
        musicPlaying = true;
        musicIcon.textContent = "Ⅱ";
        musicText.textContent = "our song is playing";
      })
      .catch(() => {
        /* Browser may still block playback; the music button remains available. */
      });
  }
});

/* ---------------- SCROLL REVEALS ---------------- */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => observer.observe(element));

/* ---------------- MESSAGE NOTE ---------------- */

const noteObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          typingNote.classList.add("visible");
        }, 500);

        noteObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.4
  }
);

noteObserver.observe(typingNote);

/* ---------------- PAPER PLANE ---------------- */

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

  const x = -80 + progress * (window.innerWidth + 160);
  const y = 30 + Math.sin(progress * Math.PI * 5) * 8;

  paperPlane.style.left = `${x}px`;
  paperPlane.style.top = `${y}%`;
  paperPlane.style.transform =
    `rotate(${-12 + Math.sin(progress * Math.PI * 6) * 8}deg)`;
});

/* ---------------- FORGIVE BUTTON ---------------- */

forgiveButton.addEventListener("click", () => {
  const finalSection = document.querySelector(".final-section");

  finalSection.style.transition = "opacity 1s ease";
  finalSection.style.opacity = "0";

  setTimeout(() => {
    finalSection.style.display = "none";
    thankYou.classList.add("show");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }, 1000);
});

/* ---------------- IMAGE FALLBACK ---------------- */

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    img.parentElement.classList.add("missing-image");
  });
});
