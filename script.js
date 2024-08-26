function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
  }
  
  function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
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
    "DEVELOPER"
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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  

//----------------------contact form--------------------//

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Perform the form submission using Fetch API
  fetch(this.action, {
    method: this.method,
    body: new FormData(this)
  })
  .then(response => {
    if (response.ok) {
      // Reset the form fields
      this.reset();

      // Hide the form and display the success message
      document.getElementById('formContainer').classList.add('hidden');
      document.getElementById('formSuccessMessage').classList.remove('hidden');
    } else {
      alert('Something went wrong. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  });
});
