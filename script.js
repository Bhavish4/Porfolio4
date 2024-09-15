function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}

function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-100%)";
}

// Typewriter Effect
const texts = [
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
  "GAMER",
  "DEVELOPER",
];

let speed = 100;

const textElement = document.querySelector(".typewriter-text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
  if (characterIndex < texts[textIndex].length) {
    textElement.textContent += texts[textIndex].charAt(characterIndex);
    characterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 1000); // Delay before erasing
  }
}

function eraseText() {
  if (characterIndex > 0) {
    textElement.textContent = textElement.textContent.slice(0, -1); // Efficiently remove last character
    characterIndex--;
    setTimeout(eraseText, 50); // Halve speed for erasing effect
  } else {
    textIndex++; // Move to next text after complete erase
    characterIndex = 0;
    if (textIndex < texts.length) {
      setTimeout(typeWriter, 500); // Restart typing if not at the end
    }
  }
}

window.onload = typeWriter;

//smooth scroling sections

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//----------------------contact form--------------------//

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform the form submission using Fetch API
    fetch(this.action, {
      method: this.method,
      body: new FormData(this),
    })
      .then((response) => {
        if (response.ok) {
          // Reset the form fields
          this.reset();

          // Hide the form and display the success message
          document.getElementById("formContainer").classList.add("hidden");
          document
            .getElementById("formSuccessMessage")
            .classList.remove("hidden");

          // After 2 seconds, hide the success message and show the new form
          setTimeout(() => {
            document
              .getElementById("formSuccessMessage")
              .classList.add("hidden");
            document
              .getElementById("newFormContainer")
              .classList.remove("hidden");
          }, 2000); // 2 seconds delay
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      });
  });

//--------------reCAPTCHA------------------//

function renderRecaptcha() {
  grecaptcha.render("recaptchaContainer", {
    sitekey: "6Lcf_zIqAAAAAK4opU_tzaphNx9ufUNlkHaJlMCd",
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  renderRecaptcha();
});

function checkMessage() {
  const message = document.getElementById("message").value.trim();
  const recaptchaContainer = document.getElementById("recaptchaContainer");

  if (message.length > 0) {
    recaptchaContainer.removeAttribute("hidden");
  } else {
    recaptchaContainer.setAttribute("hidden", "true");
  }
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  grecaptcha.ready(function () {
    grecaptcha
      .execute("6Lf4vUQqAAAAACcPnqZYOkx1grrZV2y7AoUj--ci", { action: "submit" })
      .then(function (token) {
        document.getElementById("contactForm").submit();
      });
  });
});
