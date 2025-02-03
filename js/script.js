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

    emailjs.sendForm('service_q0a47cm', 'template_o5l7vlq', this)
        .then(() => {
            alert('Message sent successfully!');
            event.target.reset();
            togglePopup();
        })
        .catch((error) => {
            alert('Failed to send message. Please try again.');
            console.log('EmailJS Error:', error);
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
}