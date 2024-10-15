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
    event.preventDefault(); // Prevent default form submission to handle it via JavaScript

    const form = event.target;
    const formData = new FormData(form);

    // Send the form data using Fetch API for Netlify form handling
    fetch(form.action, {
      method: form.method,
      body: new URLSearchParams(formData).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
      if (response.ok) {
        // Reset the form
        form.reset();
        
        // Show the success message and hide the form
        document.getElementById("formContainer").classList.add("hidden");
        document.getElementById("formSuccessMessage").classList.remove("hidden");
        
        // Remove this part: no new form will appear, only the "Thank you" message
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      alert("Form submission failed. Please check your connection and try again.");
    });
  });

  // Function to show reCAPTCHA when the message field has more than 100 characters
  function checkMessage() {
    const message = document.getElementById("message").value;
    const recaptchaContainer = document.getElementById("recaptchaContainer");

    if (message.length > 100) {
      recaptchaContainer.hidden = false;
      if (!recaptchaContainer.hasChildNodes()) {
        grecaptcha.render("recaptchaContainer", {
          sitekey: "6Lf4vUQqAAAAACcPnqZYOkx1grrZV2y7AoUj--ci" // Replace with your actual reCAPTCHA site key
        });
      }
    } else {
      recaptchaContainer.hidden = true;
    }
  }
