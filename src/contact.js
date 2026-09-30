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
    
    // Initialize EmailJS
    emailjs.init('qRBe4fLcF0QmDBYW2');

    // Handle Custom Select Dropdown
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    if (customSelectWrapper) {
        const trigger = customSelectWrapper.querySelector('.custom-select-trigger');
        const textSpan = customSelectWrapper.querySelector('.custom-select-text');
        const nativeSelect = customSelectWrapper.querySelector('select');
        const options = customSelectWrapper.querySelectorAll('.custom-option');
        const placeholderText = 'Select what you need help with';

        function closeSelect() {
            customSelectWrapper.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        function toggleSelect() {
            const isOpen = customSelectWrapper.classList.toggle('open');
            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSelect();
        });

        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSelect();
            } else if (e.key === 'Escape') {
                closeSelect();
            }
        });

        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const value = this.getAttribute('data-value');
                const label = this.textContent.trim();

                nativeSelect.value = value;
                textSpan.textContent = label;
                textSpan.classList.remove('is-placeholder');

                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                closeSelect();
                nativeSelect.dispatchEvent(new Event('change'));
            });
        });

        document.addEventListener('click', function(e) {
            if (!customSelectWrapper.contains(e.target)) {
                closeSelect();
            }
        });
    }
    
    // Handle form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
            emailjs.send('service_j3cu2qe', 'template_qe97b2w', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    showFormSuccess();
                })
                .catch(function(error) {
                    console.error('Email failed to send:', error);
                    showFormError();
                })
                .finally(function() {
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
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
            if (customSelectWrapper) {
                const textSpan = customSelectWrapper.querySelector('.custom-select-text');
                const options = customSelectWrapper.querySelectorAll('.custom-option');
                textSpan.textContent = 'Select what you need help with';
                textSpan.classList.add('is-placeholder');
                options.forEach(opt => opt.classList.remove('selected'));
            }
        });
    }
    
    // Show form error message
    function showFormError() {
        const formContainer = document.querySelector('.contact-form');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <h3>Message Could Not Be Sent</h3>
            <p>There was an error sending your message. Please try again later or contact me directly at <a href="mailto:dveras2310@gmail.com">dveras2310@gmail.com</a>.</p>
            <button class="btn primary" id="try-again-btn">Try Again</button>
        `;
        
        // Replace form with error message
        formContainer.style.display = 'none';
        formContainer.parentNode.appendChild(errorDiv);
        errorDiv.style.display = 'block';
        
        // Handle "Try Again" button
        document.getElementById('try-again-btn').addEventListener('click', function() {
            formContainer.style.display = 'block';
            errorDiv.style.display = 'none';
        });
    }
});