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

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission to control the flow

  const form = event.target;

  // Perform form validation (optional)
  const formData = new FormData(form);
  const email = formData.get("email");
  const message = formData.get("message");

  if (!email || !message) {
    alert("Please fill in all the fields.");
    return;
  }

  // Submit form using Fetch API for Netlify handling
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) {
        // Reset the form fields
        form.reset();

        // Hide the form and show success message
        document.getElementById("formContainer").classList.add("hidden");
        document.getElementById("formSuccessMessage").classList.remove("hidden");

        // Display new form or do further actions after a delay
        setTimeout(() => {
          document.getElementById("formSuccessMessage").classList.add("hidden");
          document.getElementById("newFormContainer").classList.remove("hidden");
        }, 2000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      alert("Form submission failed. Please check your connection and try again.");
    });
});
