const target = new Date("2026-11-29T14:00:00+03:00");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzxZH5yFs_Zr5q64BbmvVBFMjBonEk22vS7KRvC-vrkeMatZg1Fe2237GFjJwXW3Uk5LQ/exec";

function pad(n){ return String(n).padStart(2,"0"); }

function updateCountdown(){
  let diff = target - new Date();
  if(diff < 0) diff = 0;
  document.getElementById("days").textContent = Math.floor(diff/(1000*60*60*24));
  document.getElementById("hours").textContent = pad(Math.floor((diff/(1000*60*60))%24));
  document.getElementById("minutes").textContent = pad(Math.floor((diff/(1000*60))%60));
  document.getElementById("seconds").textContent = pad(Math.floor((diff/1000)%60));
}

updateCountdown();
setInterval(updateCountdown, 1000);

function sendRSVP(event){
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const answer = document.getElementById("guestAnswer").value;
  const result = document.getElementById("formResult");

  result.textContent = "Отправляем...";

 fetch(WEB_APP_URL, {
  method: "POST",
  mode: "no-cors",
  body: new URLSearchParams({
    name: name,
    answer: answer
  })
});

  result.textContent = name + ", спасибо! Ваш ответ отправлен.";
  event.target.reset();
}

document.querySelectorAll(".gallery img").forEach(img =>
  img.addEventListener("click", () => window.open(img.src, "_blank"))
);
// Анимация при прокрутке
(() => {
  function initWeddingAnimations() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const elements = document.querySelectorAll(
      ".invite > *, " +
      ".date-section > *, " +
      ".story-text > *, " +
      ".story-grid img, " +
      ".place > *, " +
      ".gallery-section > .overline, " +
      ".gallery-section > h2, " +
      ".gallery img, " +
      ".rsvp > *, " +
      "footer > *"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    elements.forEach((element, index) => {
      // Уже видимые элементы не прячем.
      if (
        element.getBoundingClientRect().top <
        window.innerHeight
      ) {
        return;
      }

      element.style.setProperty(
        "--appear-delay",
        `${(index % 3) * 80}ms`
      );

      element.classList.add("wedding-reveal");
      observer.observe(element);
    });

    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        observer.disconnect();
        elements.forEach((element) => {
          element.classList.add("visible");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initWeddingAnimations,
      { once: true }
    );
  } else {
    initWeddingAnimations();
  }
})();
