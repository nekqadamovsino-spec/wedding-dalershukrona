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
