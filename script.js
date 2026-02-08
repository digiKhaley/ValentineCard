const card = document.querySelector(".card");
const cont = document.querySelector(".container");
const yes = document.querySelector(".yesBtn");
const no = document.querySelector(".noBtn");
const over = document.querySelector(".overlay");
const msg = document.querySelector(".message");

yes.addEventListener("click", () => {
  // e.stopPropagation();
  msg.classList.remove("show");
  over.classList.remove("show");
  void msg.offsetWidth;
  over.classList.add("show");
  msg.classList.add("show");
  no.style.transform = `translate(0, 0)`;
  no.style.transition = "transform 0.4s ease";
});

const moveNoButton = (e) => {
  const mouseX = e.clientX ?? e.touches?.[0]?.clientX;
  const mouseY = e.clientY ?? e.touches?.[0]?.clientY;

  const rect = no.getBoundingClientRect();

  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const dx = mouseX - btnX;
  const dy = mouseY - btnY;

  const distance = Math.sqrt(dx * dx + dy * dy) || 1;

  if (distance < 120) {
    const unitX = dx / distance;
    const unitY = dy / distance;

    const strength = 100;

    no.style.transform = `translate(${-unitX * strength}px, ${-unitY * strength}px)`;
  } else {
    no.style.transform = "translate(0, 0)";
  }
};

cont.addEventListener("mousemove", moveNoButton);
cont.addEventListener("touchstart", moveNoButton, { passive: true });
cont.addEventListener("pointerdown", moveNoButton);

const closePopup = () => {
  msg.classList.remove("show");
  over.classList.remove("show");
  over.style.transition = "opacity 0.6s ease";
  msg.style.transition =
    "opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease";
};

over.addEventListener("click", closePopup);

document.addEventListener("click", (e) => {
  const isOpen = msg.classList.contains("show");
  const clickedInsideCard = card.contains(e.target);

  if (isOpen && !clickedInsideCard) {
    closePopup();
  }
});
