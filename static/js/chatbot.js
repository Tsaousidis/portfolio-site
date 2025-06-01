// Chatbot data
const botData = {
    name: "Konstantinos Tsaousidis",
    role: "Entry-level Software Engineer",
    location: "Ptolemaida, 502 00, Greece",
    contact: {
        phone: "+30 698 57 67 020",
        email: "kostastsaousbm@gmail.com",
        website: "https://tsaousidis.site/",
        linkedin: "https://www.linkedin.com/in/konstantinos-tsaousidis-1b7360225/",
        github: "https://github.com/Tsaousidis"
    },
    profile: "Motivated and detail-oriented Software Engineer with hands-on experience in Python, REST APIs, data processing, and desktop GUI applications. Experienced in automating workflows and building scalable and maintainable software solutions. Passionate about problem solving and continuous learning. Proven ability to deliver robust solutions and collaborate in cross-functional teams.",
    technicalSkills: {
        languages: ["Python", "SQL", "JavaScript", "PHP", "HTML", "CSS"],
        frameworksAndLibraries: ["Requests (API)", "BeautifulSoup4 (Web Scraping)", "SMTP (emails)", "Folium (SMS)", "Tkinter (GUI)", "Turtle", "Flask"],
        toolsAndPlatforms: ["Git", "Github", "Docker", "Postman", "Camunda", "Azure", "AWS"],
        dataAndVisualization: ["Pandas", "NumPy", "Tableau", "Power BI", "Excel"],
        aiAndMl: ["Salesforce AI fundamental technologies"],
        concepts: ["OOP", "REST APIs", "BPM", "Agile", "BI", "Data Science"]
    },
    experience: [
        {
            title: "General Manager & WordPress Developer",
            company: "Altersmoke",
            period: "Jan 2022 - Present",
            responsibilities: [
                "Engineered an automated order verification system",
                "Developed interactive frontend tools with PHP, JavaScript, HTML, and CSS",
                "Streamlined product onboarding with XML-based bulk import automation",
                "Wrote SQL queries and used Python for data cleaning",
                "Built API-based integrations",
                "Automated daily reporting with Google Sheets systems"
            ]
        },
        {
            title: "Customer Service Representative",
            company: "OPAP",
            period: "Dec 2021 - Jan 2022",
            responsibilities: [
                "Handled customer inquiries and provided personalized support solutions",
                "Processed high-volume transactions with accuracy"
            ]
        },
        {
            title: "IT Support",
            company: "Battlenet Display",
            period: "Aug 2018 - Mar 2021",
            responsibilities: [
                "Provided technical support for hardware and software issues",
                "Maintained and optimized systems"
            ]
        }
    ],
    certifications: {
        training: [
            {
                name: "Salesforce Certified AI Associate",
                issuer: "Salesforce",
                date: "Dec 2024",
                credentialId: "5447667"
            },
            {
                name: "Data Science Professional",
                issuer: "Reatcode-Workearly",
                date: "Oct 2024",
                badge: "https://www.credly.com/badges/6745fdd2-7c54-4b2e-9884-72f440cf653d/linked_in?t=snd7rj"
            },
            {
                name: "Specialist in Digital Marketing & Online Branding",
                issuer: "TUV Hellas",
                date: "Dec 2023"
            }
        ],
        currentTraining: [
            {
                name: "Python Programming Course",
                institution: "University of Patras",
                expectedCompletion: "Jun 2025"
            },
            {
                name: "100 Days of Code: The Complete Python Pro Bootcamp",
                platform: "Udemy",
                expectedCompletion: "Jul 2025"
            }
        ]
    },
    projects: [
        {
            name: "Flight Price Alert System",
            description: "Script that tracks airfare prices using Amadeus API and sends low-price alerts via email",
            tech: ["Python", "Amadeus API", "SMTP"]
        },
        {
            name: "Greek Flash Card App",
            description: "Tkinter-based app for Greek vocabulary learning with user progress tracking",
            tech: ["Python", "Tkinter", "GUI"]
        },
        {
            name: "PyQuiz",
            description: "GUI quiz game fetching trivia questions from an API with instant scoring",
            tech: ["Python", "GUI", "API"]
        }
    ],
    education: {
        degree: "Integrated Master (Diploma) in Electrical and Computer Engineering",
        institution: "University of Western Macedonia - Kozani, Greece",
        period: "Sep 2013 - Present",
        expectedGraduation: "2026"
    },
    skills: [
        "Analytical and problem-solving mindset",
        "Quick to learn and adapt to new technologies",
        "Flexible and reliable under pressure",
        "Team-oriented with excellent collaboration skills",
        "Strong attention to detail"
    ],
    languages: [
        {
            language: "Greek",
            level: "Native speaker"
        },
        {
            language: "English",
            level: "Excellent command"
        },
        {
            language: "German",
            level: "Intermediate level"
        }
    ],
    volunteering: {
        role: "Blood Donor",
        period: "Jul 2014 - Present"
    }
};

// Synonym map for common variations and misspellings
const synonymMap = {
    // Contact related
    'contact': ['reach', 'email', 'phone', 'number', 'website', 'social', 'linkedin', 'github', 'connect', 'message', 'mail'],
    'email': ['e-mail', 'mail', 'gmail', 'electronic mail', 'e mail'],
    'phone': ['telephone', 'mobile', 'cell', 'number', 'call'],
    
    // Skills related
    'skills': ['abilities', 'capabilities', 'competencies', 'expertise', 'proficiency', 'talent', 'knowledge'],
    'programming': ['coding', 'development', 'software', 'developing', 'code'],
    'experience': ['work', 'job', 'career', 'employment', 'position', 'role', 'history'],
    
    // Education related
    'education': ['study', 'degree', 'university', 'college', 'school', 'academic', 'studies'],
    'certification': ['certificate', 'certifications', 'certified', 'credentials', 'qualifications'],
    
    // Project related
    'projects': ['portfolio', 'work', 'builds', 'applications', 'apps', 'programs'],
    
    // Common misspellings of Konstantinos
    'konstantinos': ['constantinos', 'konstantine', 'konstantine', 'kostas', 'konst'],
    'tsaousidis': ['tsaous', 'tsausidis', 'tsaousides', 'tsaousidi']
};

// Function to calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) track[0][i] = i;
    for (let j = 0; j <= str2.length; j++) track[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1,
                track[j - 1][i] + 1,
                track[j - 1][i - 1] + indicator
            );
        }
    }
    return track[str2.length][str1.length];
}

// Function to find best matching word from synonyms
function findBestMatch(word, threshold = 2) {
    word = word.toLowerCase();
    let bestMatch = null;
    let minDistance = Infinity;
    
    // Check direct matches in synonym map
    for (const [key, synonyms] of Object.entries(synonymMap)) {
        // Check the key itself
        const keyDistance = levenshteinDistance(word, key);
        if (keyDistance < minDistance && keyDistance <= threshold) {
            minDistance = keyDistance;
            bestMatch = key;
        }
        
        // Check all synonyms
        for (const synonym of synonyms) {
            const distance = levenshteinDistance(word, synonym);
            if (distance < minDistance && distance <= threshold) {
                minDistance = distance;
                bestMatch = key;
            }
        }
    }
    
    return bestMatch || word;
}

// Session context for multi-turn memory
let lastTopic = null;

// Initialize chatbot
function initChatbot() {
    // Create chat overlay
    const overlay = document.createElement('div');
    overlay.className = 'chat-overlay';
    document.body.appendChild(overlay);

    // Add styles for contact links
    const style = document.createElement('style');
    style.textContent = `
        .message.bot .contact-list {
            margin-top: 8px;
            line-height: 1.8;
        }
        .message.bot .contact-link {
            color: #4a9eff;
            text-decoration: none;
            transition: color 0.2s ease;
            margin-left: 4px;
        }
        .message.bot .contact-link:hover {
            color: #2980b9;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    // Create chat icon for mobile
    const chatIcon = document.createElement('div');
    chatIcon.className = 'chat-icon';
    chatIcon.innerHTML = '<img src="/static/img/chat-icon.png" alt="Chat">';
    document.body.appendChild(chatIcon);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container collapsed';
    
    chatContainer.innerHTML = `
        <div class="chat-header">
            <span>Portfolio Assistant</span>
            <button class="chat-toggle">×</button>
        </div>
        <div class="chat-messages">
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Type your message...">
            <button>Send</button>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Event listeners
    const header = chatContainer.querySelector('.chat-header');
    const toggleBtn = chatContainer.querySelector('.chat-toggle');
    const input = chatContainer.querySelector('input');
    const sendBtn = chatContainer.querySelector('.chat-input button');
    const messagesDiv = chatContainer.querySelector('.chat-messages');

    // Show initial welcome message
    appendMessage(messagesDiv, 'bot', "Hi! I'm your AI assistant😄. Ask me anything about Tsaousidis Konstantinos or his projects!");

    function toggleChatbot(show = null) {
        const shouldShow = show !== null ? show : !chatContainer.classList.contains('visible');
        
        if (shouldShow) {
            chatContainer.classList.remove('collapsed');
            chatContainer.classList.add('visible');
            overlay.classList.add('visible');
            toggleBtn.textContent = '×';
            messagesDiv.style.display = 'flex';
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            // Only focus input on desktop
            if (window.innerWidth > 768) {
            input.focus();
            }
        } else {
            chatContainer.classList.add('collapsed');
            chatContainer.classList.remove('visible');
            overlay.classList.remove('visible');
            toggleBtn.textContent = '+';
        }
    }

    // Make header clickable (but not for mobile)
    header.addEventListener('click', (e) => {
        if (window.innerWidth > 768 && (e.target === header || e.target === header.querySelector('span'))) {
            toggleChatbot();
        }
    });

    // Close button handler
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChatbot(false);
    });

    // Overlay click handler
    overlay.addEventListener('click', () => {
        toggleChatbot(false);
    });

    // Add click handler for mobile chat icon
    chatIcon.addEventListener('click', () => {
        toggleChatbot(true);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatContainer.classList.contains('visible')) {
            toggleChatbot(false);
        }
    });

    function appendMessage(messagesDiv, type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        // Only allow HTML in bot messages for security
        if (type === 'bot') {
            // Convert URLs to clickable links if not already HTML
            if (!text.includes('<a href')) {
                text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
            }
            messageDiv.innerHTML = text;
        } else {
            messageDiv.textContent = text;
        }
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function showTypingIndicator(messagesDiv) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return typingDiv;
    }

    function removeTypingIndicator(typingDiv) {
        if (typingDiv && typingDiv.parentNode) {
            typingDiv.parentNode.removeChild(typingDiv);
        }
    }

    async function simulateTyping(messagesDiv, text) {
        const typingIndicator = showTypingIndicator(messagesDiv);
        
        // Wait for 1 second to simulate thinking
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        removeTypingIndicator(typingIndicator);
        appendMessage(messagesDiv, 'bot', text);
    }

    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            // Add user message
            appendMessage(messagesDiv, 'user', message);
            input.value = '';
            
            // Generate and add bot response with typing animation
            generateResponse(message).then(response => {
                simulateTyping(messagesDiv, response);
            });
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

async function generateResponse(message) {
    message = message.toLowerCase();
    
    // Helper function to check if message contains any of the keywords with fuzzy matching
    const containsAny = (keywords) => {
        const words = message.split(/\s+/);
        return words.some(word => {
            const bestMatch = findBestMatch(word);
            return keywords.some(keyword => 
                keyword === bestMatch || 
                synonymMap[keyword]?.includes(bestMatch) ||
                levenshteinDistance(keyword, bestMatch) <= 2
            );
        });
    };
    
    // Check for greetings first
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'hola', 'greetings'];
    if (containsAny(greetings)) {
        const timeOfDay = new Date().getHours();
        let greeting = "Hello";
        
        if (timeOfDay < 12) greeting = "Good morning";
        else if (timeOfDay < 18) greeting = "Good afternoon";
        else greeting = "Good evening";

        // If it's just a greeting without questions, give a simple response
        if (!containsAny(['who', 'what', 'where', 'when', 'why', 'how', 'tell', 'show', 'give', 'list'])) {
            return `<b>${greeting}!</b> 👋 How can I help you today?`;
        }
        
        // Otherwise, give the full introduction
        return `<b>${greeting}!</b> 👋 I'm here to help you learn more about Tsaousidis Konstantinos. You can ask me about:<br>
<ul>
• <b>Professional background</b> and experience
• <b>Technical skills</b> and projects
• <b>Education</b> and certifications
• <b>Contact information</b>
• <b>Languages</b> and personal skills
</ul>
What would you like to know?`;
    }

    // Introduction/Identity keywords
    if (containsAny(['who', 'introduce', 'tell me about', 'what do you know', 'hello', 'hi']) && 
        containsAny(['you', 'yourself', 'about', 'there'])) {
        return `Hi! I'm an AI assistant that can tell you all about <b>${botData.name}</b>. He is a <b>${botData.role}</b> based in <b>${botData.location}</b>. ${botData.profile}`;
    }

    // Contact information keywords
    if (containsAny(['contact', 'reach', 'email', 'phone', 'number', 'website', 'social', 'linkedin', 'github'])) {
        let response = `Here's how you can reach <b>Konstantinos Tsaousidis</b>:`;
        
        if (message.includes('email')) {
            response = `📧 Email: <a href="mailto:${botData.contact.email}" class="contact-link">${botData.contact.email}</a>`;
        } else if (message.includes('phone') || message.includes('number')) {
            response = `📱 Phone: <a href="tel:${botData.contact.phone}" class="contact-link">${botData.contact.phone}</a>`;
        } else if (containsAny(['linkedin', 'social'])) {
            response = `💼 LinkedIn: <a href="${botData.contact.linkedin}" target="_blank" class="contact-link">LinkedIn Profile</a>`;
        } else if (message.includes('github')) {
            response = `💻 GitHub: <a href="${botData.contact.github}" target="_blank" class="contact-link">GitHub Profile</a>`;
        } else {
            response += `<div class="contact-list">
• 📧 Email: <a href="mailto:${botData.contact.email}" class="contact-link">${botData.contact.email}</a>
• 📱 Phone: <a href="tel:${botData.contact.phone}" class="contact-link">${botData.contact.phone}</a>
• 🌐 Website: <a href="${botData.contact.website}" target="_blank" class="contact-link">${botData.contact.website.replace('https://', '')}</a>
• 💼 LinkedIn: <a href="${botData.contact.linkedin}" target="_blank" class="contact-link">LinkedIn Profile</a>
• 💻 GitHub: <a href="${botData.contact.github}" target="_blank" class="contact-link">GitHub Profile</a>
</div>`;
        }
        return response;
    }

    // Technical skills keywords
    if (containsAny(['skill', 'technology', 'tech stack', 'programming', 'language', 'framework', 'tool', 'platform'])) {
        let response = '';
        if (containsAny(['language', 'programming'])) {
            response = `<b>${botData.name}</b> is proficient in the following programming languages:<br><ul>
• ${botData.technicalSkills.languages.join('<br>• ')}</ul>
<br>👉 See all technologies at <a href="https://tsaousidis.site/technologies" target="_blank">tsaousidis.site/technologies</a>`;
        } else if (containsAny(['framework', 'library'])) {
            response = `<b>${botData.name}</b> works with these frameworks and libraries:<br><ul>
• ${botData.technicalSkills.frameworksAndLibraries.join('<br>• ')}</ul>
<br>👉 See all technologies at <a href="https://tsaousidis.site/technologies" target="_blank">tsaousidis.site/technologies</a>`;
        } else if (containsAny(['tool', 'platform'])) {
            response = `<b>Tools & Platforms:</b><br><ul>
• ${botData.technicalSkills.toolsAndPlatforms.join('<br>• ')}</ul>
<br>👉 See all technologies at <a href="https://tsaousidis.site/technologies" target="_blank">tsaousidis.site/technologies</a>`;
        } else {
            response = `<b>${botData.name}'s technical skills include:</b><br><br>`;
            response += `<b>Programming Languages:</b><br><ul>• ${botData.technicalSkills.languages.join('<br>• ')}</ul><br>`;
            response += `<b>Frameworks & Libraries:</b><br><ul>• ${botData.technicalSkills.frameworksAndLibraries.join('<br>• ')}</ul><br>`;
            response += `<b>Tools & Platforms:</b><br><ul>• ${botData.technicalSkills.toolsAndPlatforms.join('<br>• ')}</ul><br>`;
            response += `<b>Data & Visualization:</b><br><ul>• ${botData.technicalSkills.dataAndVisualization.join('<br>• ')}</ul><br>`;
            response += `<b>AI & ML:</b><br><ul>• ${botData.technicalSkills.aiAndMl.join('<br>• ')}</ul><br>`;
            response += `<b>Key Concepts:</b><br><ul>• ${botData.technicalSkills.concepts.join('<br>• ')}</ul>`;
            response += `<br>👉 See all technologies at <a href="https://tsaousidis.site/technologies" target="_blank">tsaousidis.site/technologies</a>`;
        }
        return response;
    }

    // Experience keywords
    if (containsAny(['experience', 'work', 'job', 'career', 'company', 'position', 'role'])) {
        let response = `Here's <b>${botData.name}'s work experience:</b><br><br>`;
        botData.experience.forEach(exp => {
            response += `<b>${exp.title}</b> at <b>${exp.company}</b> (${exp.period})<br>`;
            response += `Key responsibilities:<ul>`;
            exp.responsibilities.forEach(resp => {
                response += `• ${resp}<br>`;
            });
            response += `</ul><br>`;
        });
        return response;
    }

    // Project keywords
    if (containsAny(['project', 'portfolio', 'build', 'develop', 'create'])) {
        let response = `Here are some notable projects by <b>${botData.name}:</b><br><br>`;
        botData.projects.forEach(project => {
            response += `<b>${project.name}</b><br>`;
            response += `${project.description}<br><br>`;
        });
        response += `👉 Explore more projects at <a href="https://tsaousidis.site/projects" target="_blank">tsaousidis.site/projects</a>`;
        return response;
    }

    // Education keywords
    if (containsAny(['education', 'study', 'degree', 'university', 'college', 'school'])) {
        return `<b>${botData.name}</b> is pursuing <b>${botData.education.degree}</b> at <b>${botData.education.institution}</b>. He started in ${botData.education.period} with expected graduation in ${botData.education.expectedGraduation}.`;
    }

    // Certification keywords
    if (containsAny(['certification', 'certificate', 'training', 'course'])) {
        let response = `<b>${botData.name}'s certifications and training:</b><br><br>`;
        response += '<b>Completed Training:</b><ul>';
        botData.certifications.training.forEach(cert => {
            response += `• ${cert.name} from <b>${cert.issuer}</b> (${cert.date})<br>`;
        });
        response += '</ul><br><b>Ongoing Training:</b><ul>';
        botData.certifications.currentTraining.forEach(training => {
            response += `• ${training.name} at <b>${training.institution || training.platform}</b> (Expected: ${training.expectedCompletion})<br>`;
        });
        response += '</ul>';
        return response;
    }

    // Language keywords
    if (containsAny(['language', 'speak', 'fluent'])) {
        let response = `<b>${botData.name}'s language proficiency:</b><ul>`;
        botData.languages.forEach(lang => {
            response += `• <b>${lang.language}:</b> ${lang.level}<br>`;
        });
        response += '</ul>';
        return response;
    }

    // Skills and abilities keywords
    if (containsAny(['skill', 'ability', 'capable', 'competency', 'soft skill'])) {
        return `<b>${botData.name}'s key skills and abilities include:</b><ul>
• ${botData.skills.join('<br>• ')}</ul>`;
    }

    // Volunteering keywords
    if (containsAny(['volunteer', 'donation', 'community', 'blood'])) {
        return `<b>${botData.name}</b> has been a <b>${botData.volunteering.role}</b> since ${botData.volunteering.period}, showing his commitment to community service.`;
    }

    // Location keywords
    if (containsAny(['where', 'location', 'city', 'country', 'based'])) {
        return `<b>${botData.name}</b> is based in <b>${botData.location}</b>.`;
    }

    // Handle specific project inquiries
    botData.projects.forEach(project => {
        if (message.includes(project.name.toLowerCase())) {
            return `<b>${project.name}:</b> ${project.description}<br><br>👉 See more details at <a href="https://tsaousidis.site/projects" target="_blank">tsaousidis.site/projects</a>`;
        }
    });

    // Default response with conversation starters
    return `I can tell you about <b>${botData.name}'s:</b>
<ul>
• <b>Professional background</b> and experience
• <b>Technical skills</b> and projects
• <b>Education</b> and certifications
• <b>Contact information</b>
• <b>Languages</b> and personal skills
• <b>Volunteering</b> activities
</ul>
What would you like to know more about?`;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initChatbot); 