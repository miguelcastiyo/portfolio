function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function togglePopup() {
    const popup = document.getElementById('contact-popup');
    if (!popup.style.display || popup.style.display === 'none') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'sending...';
    btn.disabled = true;

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
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
});