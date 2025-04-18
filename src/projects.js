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
        },
        'traderbot': {
            title: 'TraderBot',
            subtitle: 'Automated SMA Crossover Crypto Bot',
            icon: 'icon icon-bot',
            image: '../public/traderBot/traderbot-1.png',
            description: 'TraderBot is a lightweight crypto trading bot built in TypeScript that implements a Simple Moving Average (SMA) crossover strategy. Designed to run on the Binance Testnet, the bot periodically fetches candlestick data, calculates SMA-13 and SMA-21 values, and determines ideal buy/sell signals based on the crossovers. This makes it an excellent starting point for anyone learning about automated trading strategies, Node.js applications, or financial data automation. It logs trade operations and calculates the profit percentage per cycle, helping users evaluate the effectiveness of the strategy over time.',
            technologies: ['TypeScript', 'Node.js', 'Axios', 'Binance Testnet API'],
            features: [
                '📈 <strong>SMA Strategy:</strong> Buy/sell based on SMA-13 and SMA-21 crossover logic',
                '🔁 <strong>Auto Execution:</strong> Runs every 60 seconds and evaluates market conditions',
                '💸 <strong>Profit Tracking:</strong> Calculates and logs the profit of every trade cycle',
                '🌐 <strong>Binance Testnet:</strong> Safe environment for testing crypto strategies without real money',
                '🐳 <strong>Dockerized:</strong> Easily deployable in any environment with Docker support'
            ],
            challenges: [
                'Handling floating-point precision and making the bot stateless for Docker compatibility.'
            ],
            gallery: [
                '../public/traderBot/traderbot-1.png'
            ],
            demoUrl: 'https://github.com/veras-d/traderbot',
            codeUrl: 'https://github.com/veras-d/traderbot'
        },
        'discord-bot': {
            title: 'Discord Bot',
            subtitle: 'Python Discord Bot',
            icon: 'icon-bot',
            image: '../public/discordBot/bot-1.png',
            description: 'This project is a modular Discord bot built with Python and discord.py, designed to enhance community interaction through fun and utility-driven features. It offers a friendly onboarding experience with automatic welcome messages, interactive dice-rolling using buttons, and a curated selection of GIFs from the Giphy API. Whether you\'re building a cozy hangout server or a full-blown gaming community, WastedServices makes moderation and engagement feel seamless and playful.<br><br>The project is structured with scalability and clarity in mind, making it easy to extend with new commands and events. Its architecture follows a clean, modular pattern with folders for commands, events, and utilities, and uses environment variables for secure configuration. With async API calls, custom command trees, and slash command support, this bot is both fun and a great example of professional Python Discord development.',
            technologies: ['Python', 'discord.py', 'Giphy API', 'aiohttp', 'dotenv', 'Slash Commands', 'Async Programming'],
            features: [
                '👋 <strong>Welcome messages:</strong> Automatically welcomes new users with embedded messages and mentions the rules.',
                '🎞️ <strong>GIF Commands:</strong> Fetches and sends random GIFs using Giphy API (e.g., cat/fail).',
                '🎲 <strong>Dice Rolling:</strong> Interactive buttons to roll D6, D8, D10, and D20 dice with custom embed results.',
                '🔊 <strong>Temporary Channels:</strong> Allows server owner to create temporary voice and text channels that auto-delete after inactivity.',
                '🧩 <strong>Modular Architecture:</strong> Separated into commands, events, and utils for easier scaling and maintenance.',
                '🔐 <strong>Environment Configuration:</strong> Uses dotenv to securely manage API keys and tokens.'
            ],
            challenges: [
                'Designing a clean and scalable architecture for future feature expansion was key. Handling async API requests and integrating Discord slash commands required careful error handling and event management.'
            ],
            gallery: [
                '../public/discordBot/bot-1.png'
            ],
            demoUrl: 'https://github.com/Veras-D/discordBot',
            codeUrl: 'https://github.com/Veras-D/discordBot'
        },
        'telegram-bot': {
            title: 'Telegram Bot',
            subtitle: 'Python Telegram Bot',
            icon: 'icon-bot',
            image: '../public/telegramBot/bot-1.png',
            description: 'This project is a lightweight and modular Telegram bot built with Python and the python-telegram-bot library.<br><br>It connects to the Binance public API to fetch the real-time BTC/USDT price and sends periodic updates (every 60 seconds) to a chosen Telegram chat. With automatic variation tracking, intuitive emoji feedback, and clean modular code, this bot offers a hands-free way to monitor Bitcoin fluctuations. Ideal for developers, day traders, or anyone wanting to stay updated on the go.<br><br>The project uses environment variables for security and is structured to be easily customizable or extensible for other crypto pairs or alert systems.',
            technologies: ['Python', 'Telegram Bot API', 'Binance API', 'Requests'],
            features: [
                '📈 <strong>Real-time BTC Price:</strong> Fetches current BTC/USDT price using Binance API.',
                '🔄 <strong>Variation Tracking:</strong> Calculates and shows price variation with visual feedback (🔴🟢).',
                '⏱️ <strong>Periodic Updates:</strong> Sends automatic price updates every 60 seconds.',
                '🔐 <strong>Secure Tokens:</strong> Uses .env to manage secrets and configuration.',
                '💬 <strong>Telegram Integration:</strong> Sends messages directly to your personal or group Telegram chat.'
            ],
            challenges: [
                'Managing async vs sync requests with the Telegram job queue and maintaining clean message formatting across updates were key challenges. Also, dealing with rate limits and ensuring robustness for long runtimes required retries and good logging.'
            ],
            gallery: [
                '../public/telegramBot/bot-1.png'
            ],
            demoUrl: 'https://github.com/Veras-D/telegramBot',
            codeUrl: 'https://github.com/Veras-D/telegramBot'
        },
        'churn-prediction': {
            title: 'Churn Prediction',
            subtitle: 'Data Analysis and Data Science Project With AI Dashboard Prediction',
            icon: 'fa-solid fa-flask',
            image: '../public/churnPrediction/data-1.png',
            description: 'This project aims to predict whether a bank customer is likely to leave (churn) based on demographic and financial information. The dataset includes attributes like age, gender, credit card status, account balance, and activity level. After thorough data preprocessing—including handling missing values, outliers, encoding, and feature transformation—a classification model was trained and evaluated.<br><br>The Random Forest Classifier delivered strong performance, achieving close to 80% accuracy. An interactive dashboard was built using Streamlit, allowing stakeholders to test different customer scenarios and receive immediate churn predictions. The project provides actionable insights into customer behavior, offering a valuable tool for retention strategies and business decision-making.',
            technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'SVM', 'Logistic Regression', 'Confusion Matrix', 'Streamlit', 'Joblib', 'Ngrok'],
            features: [
                '📉 <strong>Model Limitations:</strong> Poor performance in regression models for score prediction',
                '🧼 <strong>Data Challenges:</strong> Dirty data: unspecified gender and missing or outlier salaries',
                '🧮 <strong>Feature Engineering:</strong> Limited feature engineering due to lack of additional relevant variables',
                '🧪 <strong>Class Imbalance:</strong> ~20% churn rate impacting model performance',
                '🌐 <strong>Deployment:</strong> Local deployment with Ngrok instead of a permanent cloud setup'
            ],
            challenges: [
                'Cleaning and preprocessing data with missing values and outliers, dealing with class imbalance, and creating a user-friendly predictive interface were major challenges. Additionally, deploying locally using Ngrok instead of a scalable cloud platform presented limitations for accessibility.'
            ],
            gallery: [
                '../public/churnPrediction/data-1.png',
                '../public/churnPrediction/data-2.png'
            ],
            demoUrl: 'https://churnpredictionappbank.streamlit.app/',
            codeUrl: 'https://colab.research.google.com/drive/1QIX2NrKx0qR0EjkkATt9CCdNGZn6znjF?usp=sharing'
        },
        'alo-comunidade': {
            title: 'Alô Comunidade',
            subtitle: 'Saving lives with technology and information',
            icon: 'fa-solid fa-globe',
            image: '../public/aloComunidade/page-1.png',
            description: 'Alô Comunidade is a web application developed during the Recode Hackathon to support people affected by floods in Rio Grande do Sul, Brazil. The platform serves as a centralized hub for information about available shelters, access conditions, and geolocation. Designed for crisis scenarios, the site is responsive and easy to use—even with limited internet access.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Leaflet.js', 'Google Fonts'],
            features: [
                '🏠 <strong>Shelter Locator:</strong> Find nearby shelters with distance indicators and map links',
                '📱 <strong>Responsive Design:</strong> Fully responsive design for both mobile and desktop',
                '🔄 <strong>Data Updates:</strong> Manual data update simulation to mimic real-time updates',
                '🗺️ <strong>Interactive Map:</strong> Interactive map integration using Leaflet library',
                '✉️ <strong>Contact System:</strong> Functional contact page for help and feedback',
                '👥 <strong>Accessible UI:</strong> User-friendly interface with clean and accessible visuals'
            ],
            challenges: [
                'Linking simulated shelter data with clear visual display',
                'Creating smooth navigation under information-heavy scenarios',
                'Designing an accessible and empathetic UI under tight deadlines',
                'Optimizing usability for low-bandwidth environments'
            ],
            gallery: [
                '../public/aloComunidade/page-1.png',
                '../public/aloComunidade/page-2.png',
                '../public/aloComunidade/page-3.png',
                '../public/aloComunidade/page-4.png', 
                '../public/aloComunidade/page-5.png',
                '../public/aloComunidade/page-6.png'
            ],
            demoUrl: 'https://hackaton-recode.vercel.app/',
            codeUrl: 'https://github.com/Veras-D/hackaton_recode'
        },
        'travel-agency': {
            title: 'Travel Agency',
            subtitle: 'Homepage for Dream Travel Agency',
            icon: 'fa-solid fa-globe',
            image: '../public/travelAgency/page-1.png',
            description: 'This project is a static frontend for a fictional travel agency called Dream Travel. It was developed as the first individual assignment for the Fullstack Developer course by Recode Pro AI. The focus was on building a responsive and visually appealing homepage using HTML, CSS, and Bootstrap, alongside designing the conceptual, logical, and physical database models.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
            features: [
                '📱 <strong>Responsive Design:</strong> Responsive layout using Bootstrap 5',
                '🏝️ <strong>Featured Content:</strong> Homepage with hero section, destinations, and travel packages',
                '🧭 <strong>Navigation:</strong> Navigation bar and internal routing to other static pages (About Us, Contact, Destinations)',
                '🎨 <strong>Custom Styling:</strong> Custom styling using CSS',
                '💾 <strong>Database Planning:</strong> Database modeling included: conceptual, logical, and physical diagrams'
            ],
            challenges: [
                'Planning a clean layout using Bootstrap grid system',
                'Creating intuitive and attractive content structure with static HTML',
                'Designing a coherent database schema from scratch',
                'Balancing design and functionality within the scope of a static project'
            ],
            gallery: [
                '../public/travelAgency/page-1.png',
                '../public/travelAgency/page-2.png',
                '../public/travelAgency/page-3.png',
                '../public/travelAgency/page-4.png',
                '../public/travelAgency/page-5.png',
                '../public/travelAgency/page-6.png'
            ],
            demoUrl: 'https://veras-d.github.io/travelAgencyProject/index.html/',
            codeUrl: 'https://github.com/Veras-D/travelAgencyProject'
        },
        'book-manager-api': {
            title: 'Book Manager API',
            subtitle: 'Simple & Scalable Book Management API',
            icon: 'fa-brands fa-node-js',
            image: '../public/bookApi/api-1.png',
            description: 'This RESTful API allows users to create, read, update, and delete books. Designed with modular architecture using MVC pattern, the API is easy to scale and extend. Postman was used for testing all endpoints and ensuring reliability.',
            technologies: ['JavaScript', 'Node.js', 'Express.js', 'Postman', 'MVC Architecture'],
            features: [
                '📚 <strong>CRUD Operations:</strong> Create, read, update and delete books',
                '🧩 <strong>MVC Pattern:</strong> Modular MVC codebase',
                '🚀 <strong>Extensibility:</strong> Easy to extend for new features',
                '🧪 <strong>Quality Assurance:</strong> Fully tested with Postman'
            ],
            challenges: [
                'Structuring the application using the MVC pattern from scratch',
                'Ensuring all CRUD operations worked correctly with minimal code',
                'Maintaining clean, scalable, and readable code'
            ],
            gallery: [
                '../public/bookApi/api-1.png',
                '../public/bookApi/api-2.png'
            ],
            demoUrl: 'https://apibookmanager.onrender.com/api/books/',
            codeUrl: 'https://github.com/Veras-D/apiBookManager'
        },
        'rainbow-talent-design': {
            title: 'Rainbow Talent Design',
            subtitle: 'A FIGMA design and Branding Book',
            icon: 'fa-brands fa-figma',
            image: '../public/rainbowTalents/design-1.png',
            description: 'Rainbow Talents is a platform built to celebrate and support LGBTQIA+ professionals. This design project focused on creating a unique, inclusive, and accessible brand identity using color psychology and UI/UX best practices. The Brand Book ensures visual consistency, while the high-fidelity prototype showcases user flows and thoughtful accessibility choices.',
            technologies: ['Figma', 'Color Psychology', 'Typography for Accessibility', 'UI Design Systems', 'Component-Based Design'],
            features: [
                '📘 <strong>Complete Brand Book</strong> with logo, typography, and color palette',
                '🖥️ <strong>High-Fidelity UI Screens</strong> for web',
                '📱 <strong>Responsive design</strong> with accessibility considerations',
                '🤝 <strong>Inclusive visual language</strong> welcoming to all users',
                '🧩 <strong>Design tokens</strong> and reusable components'
            ],
            challenges: [
                'Balancing a bold, expressive aesthetic with readability and accessibility',
                'Creating a design system that supports emotional connection and trust',
                'Communicating inclusivity without stereotypes',
                'Working collaboratively in a fast-paced design sprint'
            ],
            gallery: [
                '../public/rainbowTalents/design-1.png',
                '../public/rainbowTalents/design-2.png',
                '../public/rainbowTalents/design-3.png',
                '../public/rainbowTalents/design-4.png',
                '../public/rainbowTalents/design-5.png',
                '../public/rainbowTalents/design-6.png',
                '../public/rainbowTalents/design-7.png',
                '../public/rainbowTalents/design-8.png',
                '../public/rainbowTalents/design-9.png',
                '../public/rainbowTalents/design-10.png'
            ],
            demoUrl: 'https://www.figma.com/proto/wWbuG20cXnxqmbyJZPhEJf/squad-10?node-id=454-146&starting-point-node-id=454%3A146&t=etW0v3Yuh7Y89Dtq-1',
            codeUrl: 'https://www.figma.com/design/wWbuG20cXnxqmbyJZPhEJf/squad-10?node-id=454-146&t=0qrY4GIKUyLzMSQR-1'
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