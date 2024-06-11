document.getElementById('colorButton').addEventListener('click', function () {
    const selectedColor = document.getElementById('colorPicker').value;
    document.body.style.backgroundColor = selectedColor;
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      let isValid = true;
  
      // Validate Name
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
      } else {
        showSuccess(nameInput);
      }
  
      // Validate Email
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Email is not valid.');
        isValid = false;
      } else {
        showSuccess(emailInput);
      }
  
      // Validate Message
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
        isValid = false;
      } else {
        showSuccess(messageInput);
      }
  
      // If the form is valid, store data in localStorage and send to the API
      if (isValid) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        };
  
        // Store data in localStorage with a path
        const storagePath = "J:\virtual internship\Cognifyz Technologies 1m\Data.txt";
        localStorage.setItem(storagePath, JSON.stringify(formData));
  
        fetch('https://jsonplaceholder.typicode.com/posts', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert('Message sent successfully!');
          form.reset(); // Clear the form
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error sending your message.');
        });
      }
    });
  
    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorMessage = formGroup.querySelector('.error-message');
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      input.style.borderColor = 'red';
    }
  
    function showSuccess(input) {
      const formGroup = input.parentElement;
      const errorMessage = formGroup.querySelector('.error-message');
      errorMessage.style.display = 'none';
      input.style.borderColor = 'green';
    }
  
    function isValidEmail(email) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(email);
    }
  });
  