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

    // Set up image viewer
    setupImageViewer();
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
    
    // Project data
    const projectData = {
        'network-limiter': {
            title: 'Network Limiter',
            subtitle: 'Chrome extention application',
            icon: 'fa-brands fa-chrome',
            image: '../public/chromeExtention/chrome-02.png',
            description: 'The <strong>Network Limiter for DevTools</strong> is a browser extension that allows developers to <strong>simulate different network speeds</strong> directly within Chrome\'s Developer Tools. It provides three modes for network speed simulation: <strong>Slow</strong>, <strong>Medium</strong>, and <strong>Fast</strong>. Additionally, you can disable the limitation altogether with the <strong>No Limit</strong> mode.',
            technologies: ['React', 'TypeScript', 'Node', 'Vite'],
            features: [
                'Network Speed Modes: Slow, Medium, Fast, and No Limit',
                'Simulates slow network conditions',
                'Simulates a moderate network speed',
                'Simulates a fast network connection',
                'No Limit: Disables the speed limit (no simulation)',
                'Integrates directly with Chrome\'s Developer Tools'
            ],
            challenges: ['Integration with Chrome DevTools API', 'Managing network throttling accurately', 'Creating intuitive UI for developers'],
            gallery: [
                '../public/chromeExtention/chrome-01.png',
                '../public/chromeExtention/chrome-02.png',
                '../public/chromeExtention/chrome-03.png'
            ],
            demoUrl: 'https://www.linkedin.com/posts/veras-d_im-happy-to-share-this-network-limiter-chrome-activity-7298063004292546560-9nNX?utm_source=share&utm_medium=member_desktop&rcm=ACoAACPypkcBYqkh2FAoecu5QiJehJsPqnONkwU',
            codeUrl: 'https://github.com/Veras-D/netwotk-limiter'
        },
        'pyholofotes': {
            title: 'PyHolofotes',
            subtitle: 'Python Desktop application',
            icon: 'fa-solid fa-desktop',
            image: '../public/PyHolofotes/desktop-01.png',
            description: 'A Python program to control an Arduino RELE system, injecting pulses into surfaces for thermal analysis with a thermal imaging camera. Implemented at the UEMA Heat Transfer Laboratory, providing an efficient platform for thermal data collection.',
            technologies: ['Python', 'Tkinter', 'Arduino', 'GitHub Actions', 'pyFirmata', 'PyInstaller'],
            features: [
                'SetUp Screen: Unique pulse and Periodic Pulse options',
                'Configures Screen: General Information About Arduino connected',
                'About Screen: Information About the Software',
                'Change Theme System',
                'Available for Windows, Mac and Linux'
            ],
            challenges: [
                'Creating a cross-platform desktop application',
                'Establishing reliable Arduino-Python communication',
                'Implementing precise timing for thermal pulse analysis',
                'Building an intuitive user interface for laboratory settings'
            ],
            gallery: [
                '../public/PyHolofotes/desktop-01.png',
                '../public/PyHolofotes/desktop-02.png',
                '../public/PyHolofotes/desktop-03.png',
                '../public/PyHolofotes/desktop-04.png',
                '../public/PyHolofotes/desktop-05.png',
                '../public/PyHolofotes/desktop-06.png',
                '../public/PyHolofotes/desktop-07.png'
            ],
            demoUrl: 'https://github.com/Veras-D/PyHolofotes/releases',
            codeUrl: 'https://github.com/Veras-D/PyHolofotes'
        },
        'data-pipeline': {
            title: 'Data Processing Pipeline',
            subtitle: 'Automated data workflow',
            icon: 'fa-database',
            image: 'https://via.placeholder.com/1200x600/9D4EDD/FFFFFF?text=Data+Pipeline',
            description: 'An automated data processing pipeline built with Python that collects, cleans, and analyzes data from various sources. The system extracts insights and generates reports automatically, saving hours of manual work.',
            technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Airflow', 'SQL', 'AWS Lambda'],
            features: ['Automated data collection from multiple sources', 'Data cleaning and normalization', 'Statistical analysis and insight generation', 'Automated report generation', 'Scheduled execution with Apache Airflow', 'Error handling and notification system'],
            challenges: ['Handling inconsistent data formats', 'Optimizing performance for large datasets', 'Creating meaningful visualizations', 'Setting up reliable scheduling'],
            gallery: [
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Data+Flow',
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Analytics',
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Reports',
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Workflow'
            ],
            demoUrl: '#',
            codeUrl: '#'
        },
        'registration-system-apam': {
            title: 'RegistrationSystemAPAM',
            subtitle: 'Python Desktop application',
            icon: 'fa-solid fa-desktop',
            image: '../public/RegistrationSystemAPAM/APAM-01.png',
            description: 'APAM is an association whose goal is to protect animals from abandonment and mistreatment. Based in Cuiabá, the NGO shelters around 60 animals that are treated and sent for responsible adoption. This is a non-profit project to meet the needs of the NGO Associação Mato-Grossense Protetora dos Animais (APAM) 🐈🐕.',
            technologies: ['Python', 'Tkinter', 'GitHub Actions', 'Pandas', 'PyInstaller'],
            features: [
                'Add a new volunteer',
                'Update volunteer',
                'Delete volunteer',
                'Search volunteer',
                'Clean fields',
                'Export data to Excel',
                'Available for Windows and Linux'
            ],
            challenges: [
                'Developing a user-friendly interface for non-technical staff',
                'Implementing a reliable database system for volunteer information',
                'Creating an efficient data export system to Excel',
                'Ensuring cross-platform compatibility for Windows and Linux'
            ],
            gallery: [
                '../public/RegistrationSystemAPAM/APAM-01.png'
            ],
            demoUrl: 'https://github.com/Veras-D/RegistrationSystemAPAM/releases',
            codeUrl: 'https://github.com/Veras-D/RegistrationSystemAPAM'
        },
        'social-bot': {
            title: 'Social Media Automation',
            subtitle: 'Python-based automation tools',
            icon: 'fa-robot',
            image: 'https://via.placeholder.com/1200x600/6A1B9A/FFFFFF?text=Social+Media+Bot',
            description: 'A collection of Python-based automation tools for social media management. These tools help schedule posts, analyze engagement, and generate reports across various social media platforms, streamlining the social media workflow.',
            technologies: ['Python', 'Selenium', 'Beautiful Soup', 'Social Media APIs', 'Pandas', 'Matplotlib'],
            features: ['Post scheduling across multiple platforms', 'Engagement analytics and reporting', 'Content suggestion based on trending topics', 'Automated response to comments and messages', 'Hashtag optimization', 'Competitor analysis'],
            challenges: ['Navigating different social media APIs', 'Handling rate limits and authentication', 'Creating reliable web scraping solutions', 'Developing accurate analytics algorithms'],
            gallery: [
                'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Scheduling',
                'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Analytics',
                'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Content+Suggestions',
                'https://via.placeholder.com/400x300/6A1B9A/FFFFFF?text=Reporting'
            ],
            demoUrl: '#',
            codeUrl: '#'
        },
        'task-manager': {
            title: 'Task Management App',
            subtitle: 'Full-stack application',
            icon: 'fa-tasks',
            image: 'https://via.placeholder.com/1200x600/9D4EDD/FFFFFF?text=Task+Manager',
            description: 'A full-stack application for managing tasks, projects, and team collaboration, built with React and Spring Boot.',
            technologies: ['React', 'Spring Boot', 'PostgreSQL', 'Redux', 'JWT', 'Bootstrap'],
            features: ['Task creation and assignment', 'Project management', 'Team collaboration tools', 'Progress tracking', 'Priority and deadline management', 'File attachments', 'Notification system'],
            challenges: ['Creating an intuitive UI/UX', 'Implementing real-time updates', 'Managing complex state across the application', 'Ensuring data security'],
            gallery: [
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Dashboard',
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Task+View',
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Team+Collaboration',
                'https://via.placeholder.com/400x300/9D4EDD/FFFFFF?text=Project+Management'
            ],
            demoUrl: '#',
            codeUrl: '#'
        }
    };
    
    // Open modal when view details button is clicked
    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Populate modal with project data
                populateModal(project);
                
                // Show modal with proper animation
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    function populateModal(project) {
        // Create modal content that matches the HTML structure expected by CSS
        const content = `
            <div class="modal-project-header">
                <div class="modal-project-title">
                    <h2><i class="fas ${project.icon}"></i> ${project.title}</h2>
                    <span class="modal-project-subtitle">${project.subtitle}</span>
                </div>
            </div>
            
            <div class="modal-image-div">
                <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            </div>
            
            <div class="modal-project-description">
                <p>${project.description}</p>
            </div>
            
            <div>
                <div class="modal-info-item">
                    <h4>Technologies</h4>
                    <ul>
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-info-item">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-info-item">
                    <h4>Challenges & Solutions</h4>
                    <ul>
                        ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="modal-project-gallery">
                ${project.gallery.map(img => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Project screenshot">
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-project-buttons">
                <a href="${project.demoUrl}" class="modal-project-btn live-demo" target="_blank">Live Demo</a>
                <a href="${project.codeUrl}" class="modal-project-btn view-code" target="_blank">View Code</a>
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

function setupImageViewer() {
    const imageViewer = document.createElement('div');
    imageViewer.className = 'image-viewer-overlay';
    imageViewer.innerHTML = `
        <span class="close-viewer">&times;</span>
        <div class="image-viewer-content">
            <img class="viewer-image" src="" alt="">
        </div>
    `;
    document.body.appendChild(imageViewer);

    const closeBtn = imageViewer.querySelector('.close-viewer');
    closeBtn.addEventListener('click', () => {
        imageViewer.classList.remove('active');
    });

    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            imageViewer.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-item img')) {
            const imgSrc = e.target.src;
            const viewerImg = imageViewer.querySelector('.viewer-image');
            
            viewerImg.src = imgSrc;
            imageViewer.classList.add('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageViewer.classList.contains('active')) {
            imageViewer.classList.remove('active');
        }
    });
}