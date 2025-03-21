// Projects Page Functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the projects page
    initProjectsPage();
});

function initProjectsPage() {
    // Set up filter buttons
    setupFilterButtons();
    
    // Set up modal functionality
    setupProjectModal();
    
    // Animate project cards on scroll
    animateProjectCards();
}

// Project Filtering System
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get the filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    // Add animation effect when showing
                    card.style.opacity = 0;
                    setTimeout(() => {
                        card.style.opacity = 1;
                    }, 50);
                } else {
                    const categories = card.getAttribute('data-category').split(',');
                    if (categories.includes(filterValue)) {
                        card.classList.remove('hidden');
                        // Add animation effect when showing
                        card.style.opacity = 0;
                        setTimeout(() => {
                            card.style.opacity = 1;
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// Project Modal System
function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');
    const detailBtns = document.querySelectorAll('.view-details');
    
    // Project data - this would normally come from a database or API
    // const projectData = {
    //     'ecommerce': {
    //         title: 'E-commerce Platform',
    //         subtitle: 'Full-stack web application',
    //         icon: 'fa-shopping-cart',
    //         image: 'https://via.placeholder.com/1200x600/8A2BE2/FFFFFF?text=E-commerce+Platform',
    //         description: 'A comprehensive e-commerce solution built with React and TypeScript for the frontend and a secure REST API using Node.js and MongoDB for the backend. The platform includes user authentication, product management, shopping cart functionality, and secure payment processing.',
    //         technologies: ['React', 'TypeScript', 'Redux', 'Node.js', 'MongoDB', 'Stripe API', 'AWS S3', 'CSS Modules'],
    //         features: ['Responsive design for all devices', 'User authentication and profile management', 'Advanced product filtering and search', 'Shopping cart and wishlist', 'Secure payment processing', 'Order tracking', 'Admin dashboard for inventory management'],
    //         challenges: ['Implementing a scalable state management solution', 'Optimizing image loading for performance', 'Ensuring secure payment processing', 'Creating a responsive design that works on all devices'],
    //         gallery: [
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Product+Page',
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Cart',
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Checkout',
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Admin'
    //         ],
    //         demoUrl: '#',
    //         codeUrl: '#'
    //     },
    //     'api': {
    //         title: 'RESTful API Service',
    //         subtitle: 'Backend infrastructure',
    //         icon: 'fa-server',
    //         image: 'https://via.placeholder.com/1200x600/6A1B9A/FFFFFF?text=API+Service',
    //         description: 'A robust and scalable RESTful API built with Nest.js and TypeScript. This API provides a secure and efficient backend service for various client applications, with features such as authentication, authorization, rate limiting, and comprehensive logging.',
    //         technologies: ['Nest.js', 'TypeScript', 'MongoDB', 'JWT', 'Docker', 'Swagger', 'Jest'],
    //         features: ['JWT authentication and role-based authorization', 'Comprehensive API documentation with Swagger', 'Request validation and error handling', 'Rate limiting and security features', 'Containerized with Docker for easy deployment', 'Extensive test coverage with Jest'],
    //         challenges: ['Designing a clean and maintainable architecture', 'Implementing efficient error handling', 'Ensuring proper security measures', 'Creating comprehensive documentation'],
    //         gallery: [
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=API+Structure',
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Swagger+Docs',
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Authentication',
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Testing'
    //         ],
    //         demoUrl: '#',
    //         codeUrl: '#'
    //     },
    //     'data-pipeline': {
    //         title: 'Data Processing Pipeline',
    //         subtitle: 'Automated data workflow',
    //         icon: 'fa-database',
    //         image: 'https://via.placeholder.com/1200x600/9D4EDD/FFFFFF?text=Data+Pipeline',
    //         description: 'An automated data processing pipeline built with Python that collects, cleans, and analyzes data from various sources. The system extracts insights and generates reports automatically, saving hours of manual work.',
    //         technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Airflow', 'SQL', 'AWS Lambda'],
    //         features: ['Automated data collection from multiple sources', 'Data cleaning and normalization', 'Statistical analysis and insight generation', 'Automated report generation', 'Scheduled execution with Apache Airflow', 'Error handling and notification system'],
    //         challenges: ['Handling inconsistent data formats', 'Optimizing performance for large datasets', 'Creating meaningful visualizations', 'Setting up reliable scheduling'],
    //         gallery: [
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Data+Flow',
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Analytics',
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Reports',
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Workflow'
    //         ],
    //         demoUrl: '#',
    //         codeUrl: '#'
    //     },
    //     'dashboard': {
    //         title: 'Analytics Dashboard',
    //         subtitle: 'Interactive data visualization',
    //         icon: 'fa-chart-line',
    //         image: 'https://via.placeholder.com/1200x600/8A2BE2/FFFFFF?text=Analytics+Dashboard',
    //         description: 'An interactive analytics dashboard built with Angular that provides real-time data visualization and insights. The dashboard includes customizable widgets, filters, and export options to help users analyze data effectively.',
    //         technologies: ['Angular', 'TypeScript', 'Chart.js', 'RxJS', 'Firebase', 'SCSS'],
    //         features: ['Real-time data updates', 'Interactive charts and graphs', 'Customizable dashboard layout', 'Data filtering and sorting', 'Export options (PDF, CSV, Excel)', 'User preference saving'],
    //         challenges: ['Implementing real-time data synchronization', 'Creating responsive and interactive visualizations', 'Optimizing performance with large datasets', 'Designing an intuitive user interface'],
    //         gallery: [
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Dashboard+Overview',
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Charts',
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Custom+Widgets',
    //             'https://via.placeholder.com/400x300/8A2BE2/FFFFFF?text=Reports'
    //         ],
    //         demoUrl: '#',
    //         codeUrl: '#'
    //     },
    //     'social-bot': {
    //         title: 'Social Media Automation',
    //         subtitle: 'Python-based automation tools',
    //         icon: 'fa-robot',
    //         image: 'https://via.placeholder.com/1200x600/6A1B9A/FFFFFF?text=Social+Media+Bot',
    //         description: 'A collection of Python-based automation tools for social media management. These tools help schedule posts, analyze engagement, and generate reports across various social media platforms, streamlining the social media workflow.',
    //         technologies: ['Python', 'Selenium', 'Beautiful Soup', 'Social Media APIs', 'Pandas', 'Matplotlib'],
    //         features: ['Post scheduling across multiple platforms', 'Engagement analytics and reporting', 'Content suggestion based on trending topics', 'Automated response to comments and messages', 'Hashtag optimization', 'Competitor analysis'],
    //         challenges: ['Navigating different social media APIs', 'Handling rate limits and authentication', 'Creating reliable web scraping solutions', 'Developing accurate analytics algorithms'],
    //         gallery: [
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Scheduling',
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Analytics',
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Content+Suggestions',
    //             'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Reporting'
    //         ],
    //         demoUrl: '#',
    //         codeUrl: '#'
    //     },
    //     'mobile-app': {
    //         title: 'Fitness Tracking App',
    //         subtitle: 'Cross-platform mobile application',
    //         icon: 'fa-mobile-alt',
    //         image: 'https://via.placeholder.com/1200x600/9D4EDD/FFFFFF?text=Fitness+App',
    //         description: 'A cross-platform mobile application built with React Native that helps users track their fitness goals, workouts, and nutrition. The app includes features such as workout planning, progress tracking, and social sharing.',
    //         technologies: ['React Native', 'Redux', 'Firebase', 'Expo', 'Node.js', 'Express', 'MongoDB'],
    //         features: ['Personalized workout plans', 'Progress tracking with charts and statistics', 'Nutrition logging and analysis', 'Social sharing and challenges', 'Integration with fitness devices', 'Offline functionality', 'Push notifications and reminders'],
    //         challenges: ['Creating a consistent experience across platforms', 'Implementing complex animations and transitions', 'Managing state across the application', 'Ensuring offline functionality', 'Optimizing battery usage'],
    //         gallery: [
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Dashboard',
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Workout+Tracker',
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Nutrition+Log',
    //             'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Progress+Charts'
    //         ],
    //         demoUrl: '#',
    //         codeUrl: '#'
    //     }
    // };
    
    // Open modal when view details button is clicked
    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Populate modal with project data
                populateModal(project);
                
                // Show modal
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 50);
            }
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    function populateModal(project) {
        // Create modal content
        const content = `
            <div class="modal-header">
                <h2>${project.title}</h2>
                <p class="subtitle">${project.subtitle}</p>
            </div>
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="project-details">
                <div class="detail-section">
                    <h3>Technologies Used</h3>
                    <ul class="tech-list">
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-section">
                    <h3>Challenges & Solutions</h3>
                    <ul>
                        ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="project-gallery">
                <h3>Project Gallery</h3>
                <div class="gallery-container">
                    ${project.gallery.map(img => `
                        <div class="gallery-item">
                            <img src="${img}" alt="Project screenshot">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="project-links">
                <a href="${project.demoUrl}" class="btn primary-btn" target="_blank">Live Demo</a>
                <a href="${project.codeUrl}" class="btn secondary-btn" target="_blank">View Code</a>
            </div>
        `;
        
        // Set modal content
        modalBody.innerHTML = content;
    }
}

// Animate project cards on scroll
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Initial state - all cards invisible
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // Intersection Observer to detect when cards are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Card is in viewport, make it visible with animation
                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Unobserve once animation is done
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each project card
    projectCards.forEach(card => {
        observer.observe(card);
    });
}