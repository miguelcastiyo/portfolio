function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize popup functionality
    document.getElementById('contact-form').addEventListener('submit', handleSubmit);
    
    // Initialize EmailJS
    emailjs.init("1yvh_EC4CQh-wuE-z");

    // Add event listener for email link
    document.querySelector('.contact-info-container a[href="#"]').addEventListener('click', function(event) {
        event.preventDefault();
        togglePopup();
    });
});

function togglePopup() {
    const popup = document.getElementById('contact-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function handleSubmit(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'sending...';
    btn.disabled = true;
  
    // Send the form with EmailJS
    emailjs.sendForm('service_q0a47cm', 'template_o5l7vlq', this)
      .then(() => {
        // 1) Reset form fields
        event.target.reset();
  
        // 2) Create a success message and display it in the popup
        const successMsg = document.createElement('p');
        successMsg.innerText = 'Message sent successfully!';
        successMsg.style.color = 'green';
        successMsg.style.textAlign = 'center';
        event.target.appendChild(successMsg);
  
        // 3) Close the popup after a short delay
        setTimeout(() => {
          // remove the success message
          successMsg.remove();
          // close the popup
          togglePopup();
        }, 2000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        
        // Show a styled error message instead of alert
        const errorMsg = document.createElement('p');
        errorMsg.innerText = 'Failed to send. Please try again.';
        errorMsg.style.color = 'red';
        errorMsg.style.textAlign = 'center';
        event.target.appendChild(errorMsg);
  
        // Optionally remove the error message after a few seconds
        setTimeout(() => {
          errorMsg.remove();
        }, 3000);
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  }
