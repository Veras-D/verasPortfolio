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
        'registration-system-apam': {
            title: 'Registration System APAM',
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
        'data-analysis-dashboard': {
            title: 'Data Analysis Dashboard',
            subtitle: 'DashBoard Looker Studio',
            icon: 'fa-solid fa-table-columns',
            image: '../public/trilhasDashboard/dashboard-1.png',
            description: 'This project is a comprehensive, interactive dashboard built using Google Looker Studio, developed as part of a data visualization challenge. It replicates and enhances an existing dashboard by integrating key features like calculated fields, dynamic filters (e.g. by municipality and date range), and rich visual components such as pie charts, bar graphs, and geolocation maps.<br><br>The dashboard connects directly to a structured dataset of 309 registrants, offering detailed insights into participant demographics, income levels, educational background, and motivations for joining training programs. By leveraging data storytelling and visual clarity, the project supports decision-making while showcasing data literacy and design proficiency.',
            technologies: ['Looker Studio', 'Google Sheets', 'SQL', 'LookML'],
            features: [
                '📍 Municipality-level filtering',
                '🧠 Socioeconomic analysis',
                '🧮 Calculated metrics (e.g. average age, participation rate)',
                '📊 Charts on education, race, gender, income, and more',
                '📅 Evolution of registration over time',
                '🌐 Map visualizations of geographical coverage'
            ],
            challenges: [
                'Creating intuitive data visualizations from complex datasets',
                'Implementing dynamic filtering without compromising performance',
                'Designing clear visual hierarchy to highlight key insights',
                'Balancing informational depth with dashboard usability'
            ],
            gallery: [
                '../public/trilhasDashboard/dashboard-1.png',
                '../public/trilhasDashboard/dashboard-2.png',
                '../public/trilhasDashboard/dashboard-3.png',
                '../public/trilhasDashboard/dashboard-4.png'
            ],
            demoUrl: 'https://lookerstudio.google.com/s/lpkuvVvNvIc',
            codeUrl: 'https://docs.google.com/spreadsheets/d/13_p8nO5A3boUxYGNhPNmqH5thv6kuZIvaI6oLwPRCKk/edit?usp=sharing'
        },
        'crypto-finance-dashboard': {
            title: 'Crypto Finance Dashboard',
            subtitle: 'Python Real-time Crypto DashBoard',
            icon: 'fa-solid fa-table-columns',
            image: '../public/cryptoDashboard/dashboard-0.png',
            description: '<strong>Crypto Dashboard</strong> is a dynamic, interactive web application built with Streamlit and Plotly that offers in-depth analytics on over 20 cryptocurrencies. It features daily and cumulative return analysis, volatility breakdowns, and profitability metrics by day, week, and month. The dashboard also integrates macroeconomic indicators such as U.S. interest rates, unemployment, and the Fear & Greed Index to provide users with a broader market context.<br><br>The platform includes performance comparisons between crypto assets and traditional indices like the S&P 500 and IBOVESPA, as well as a Monte Carlo simulation module that projects potential future price paths using historical BTC data. Whether you\'re a trader, data analyst, or financial enthusiast, this tool is designed to turn complex data into clear, actionable insights—all in a browser, no installation required.',
            technologies: ['Python', 'Pandas', 'Numpy', 'Streamlit', 'Plotly', 'Selenium', 'Binance API'],
            features: [
                '🏠 <strong>Home:</strong> Welcome screen with project logo and navigation',
                '🔍 <strong>Crypto Analytics:</strong> Analyze crypto returns, aggregated performance by day/month/week',
                '🏛️ <strong>Macroeconomic View:</strong> Explore U.S. macro indicators (interest rates, unemployment, consumer confidence)',
                '📊 <strong>Comparative Returns:</strong> Compare selected crypto assets with BTC, S&P 500 and IBOVESPA',
                '🚀 <strong>Monte Carlo Simulation:</strong> Simulate price behavior over 100 days using Monte Carlo analysis'
            ],
            challenges: [
                'Integrating real-time data from multiple financial APIs',
                'Building a Monte Carlo simulation model with statistical accuracy',
                'Optimizing performance for large datasets and complex visualizations',
                'Creating an intuitive interface for both technical and non-technical users'
            ],
            gallery: [
                '../public/cryptoDashboard/dashboard-1.png',
                '../public/cryptoDashboard/dashboard-2.png',
                '../public/cryptoDashboard/dashboard-3.png',
                '../public/cryptoDashboard/dashboard-4.png',
                '../public/cryptoDashboard/dashboard-5.png'
            ],
            demoUrl: 'https://dashboardcripto.streamlit.app/',
            codeUrl: 'https://github.com/Veras-D/team-25_Desafio-IV'
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