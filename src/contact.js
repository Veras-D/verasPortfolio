// Handle FAQ toggles
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // For demo purposes, show success message
            // In a real scenario, you'd show this after successful form submission
            showFormSuccess();
        });
    }
    
    // Show form success message
    function showFormSuccess() {
        const formContainer = document.querySelector('.contact-form');
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button class="btn primary" id="new-message-btn">Send Another Message</button>
        `;
        
        // Replace form with success message
        formContainer.style.display = 'none';
        formContainer.parentNode.appendChild(successDiv);
        successDiv.style.display = 'block';
        
        // Handle "Send Another Message" button
        document.getElementById('new-message-btn').addEventListener('click', function() {
            formContainer.style.display = 'block';
            successDiv.style.display = 'none';
            contactForm.reset();
        });
    }
});