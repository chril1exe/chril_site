const line1Text = "* The page not found . . .";
const line2Text = "* Stay determined !";

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const frame = document.querySelector(".frame");
const hint = document.getElementById("hint");
const heartContainer = document.querySelector('.heart-container');
const heartLink = document.querySelector('.heart-link');
const heart = document.querySelector('.heart');
const heartBgEffect = document.querySelector('.heart-bg-effect');
const heartSound = new Audio("/404/heart-sound.mp3");

const typeSound = new Audio("/404/tlk-snd.mp3");
let soundEnabled = false;
let step = 0;

function playBeep() {
  if (!soundEnabled) return;
  typeSound.currentTime = 0;
  typeSound.play().catch(() => {});
}

function typeText(element, text, callback) {
  let i = 0;
  element.textContent = '';
  function typing() {
    if (i < text.length) {
      element.textContent += text[i];
      playBeep();
      i++;
      setTimeout(typing, 80);
    } else if (callback) callback();
  }
  typing();
}

function handleClick() {
  if (step === 0) {
    soundEnabled = true;
    typeText(line1, line1Text);
    
    hint.style.opacity = 0;
    setTimeout(() => hint.style.display = "none", 100);
    
    step++;
  } else if (step === 1) {
    typeText(line2, line2Text);
    step++;
  } else if (step === 2) {
    frame.classList.add("move");
    
    heartBgEffect.classList.add('animate');
    
    setTimeout(() => {
      heartContainer.classList.add('visible');
      heartSound.currentTime = 0;
      heartSound.play().catch(() => {});
    }, 800);
    
    step++;
  }
}

heartLink.addEventListener('click', function(e) {
  e.stopPropagation();
  heartContainer.classList.add('exploding');
  setTimeout(() => {
    window.location.href = 'https://youtu.be/dQw4w9WgXcQ';
  }, 800);
});


document.body.addEventListener("pointerdown", handleClick);

