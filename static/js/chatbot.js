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
        frameworksAndLibraries: ["Requests (API)", "Flask (Web Apps)", "AOS", "Typed.js", "BeautifulSoup4 (Web Scraping)", "SMTP (emails)", "Folium (SMS)", "Tkinter (GUI)", "Turtle", "Flask"],
        toolsAndPlatforms: ["Git", "Github", "Docker", "Postman", "Camunda", "Azure", "AWS", "Render", "Flask-Mail", "Gunicorn"],
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
    'contact': ['reach out', 'get in touch', 'contact info', 'contact details', 'contact information', 'connect with', 'communicate with'],
    'email': ['e-mail', 'mail', 'gmail', 'electronic mail', 'e mail', 'send mail', 'electronic address', 'mail address', 'email address'],
    'phone': ['telephone', 'mobile', 'cell', 'call', 'phone number', 'mobile number', 'cell number', 'contact number', 'cellular'],
    
    // Experience and Jobs related
    'experience': ['work history', 'professional experience', 'job history', 'career path', 'work experience', 'professional background', 'employment history'],
    'job': ['jobs', 'position', 'role', 'employment', 'occupation', 'profession', 'career', 'work', 'workplace'],
    'company': ['employer', 'organization', 'workplace', 'business', 'firm'],
    
    // Skills related
    'skills': ['abilities', 'capabilities', 'competencies', 'expertise', 'proficiency', 'talent', 'know-how', 'skillset', 'qualifications', 'strong points', 'strengths', 'competences'],
    'programming': ['coding', 'development', 'software', 'developing', 'code', 'programming languages', 'dev', 'software development', 'coding skills', 'development skills', 'software engineering'],
    
    // Education related
    'education': ['study', 'degree', 'university', 'college', 'school', 'academic', 'studies', 'qualification', 'educational background', 'academic history', 'schooling', 'academic qualification', 'academic background', 'education history', 'studying', 'student'],
    'certification': ['certificate', 'certifications', 'certified', 'credentials', 'qualifications', 'accreditation', 'diploma', 'certification course', 'professional certification', 'training certificate', 'certified in', 'credentials'],
    
    // Project related
    'projects': ['portfolio', 'work', 'builds', 'applications', 'apps', 'programs', 'developments', 'creations', 'project work', 'personal projects', 'side projects', 'project portfolio', 'developed', 'created', 'built', 'made'],
    
    // Technical skills related
    'technical': ['tech', 'technology', 'technologies', 'technical skills', 'tech skills', 'technical knowledge', 'technical expertise', 'technical background', 'tech stack', 'technical proficiency', 'technological'],
    'framework': ['frameworks', 'library', 'libraries', 'tools', 'technology stack', 'development tools', 'development framework', 'tech framework', 'development environment', 'tech tools', 'development stack'],
    'database': ['db', 'databases', 'data storage', 'sql', 'nosql', 'data', 'storage', 'data management', 'dbms', 'data systems'],
    'knowledge': ['expertise', 'experience', 'proficiency', 'understanding', 'mastery', 'competency', 'competencies', 'capabilities', 'know-how', 'background'],
    
    // Language proficiency related
    'language': ['languages', 'speak', 'speaking', 'linguistic', 'communication', 'fluency', 'language skills', 'multilingual', 'language proficiency', 'spoken languages'],
    'fluent': ['fluency', 'proficient', 'native', 'bilingual', 'multilingual', 'speaking level', 'language level', 'language ability'],
    
    // Common misspellings of Konstantinos
    'konstantinos': ['constantinos', 'konstantine', 'konstantine', 'kostas', 'konst', 'costa', 'konstant', 'constantin', 'konstantine', 'konstantino'],
    'tsaousidis': ['tsaous', 'tsausidis', 'tsaousides', 'tsaousidi', 'tsaousid', 'tsao', 'tsaou'],

    // Volunteering related
    'volunteer': ['volunteering', 'community service', 'social work', 'charity', 'community work', 'giving back', 'blood donation', 'blood donor', 'community involvement'],

    // Personal skills related
    'soft skills': ['interpersonal skills', 'personal skills', 'people skills', 'social skills', 'communication skills', 'soft abilities', 'personal qualities', 'personal traits'],

    // Location related
    'location': ['based', 'live', 'living', 'residence', 'city', 'country', 'address', 'place', 'located', 'where', 'current location', 'hometown', 'base']
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
            <span>Tsaousidis Interactive FAQ</span>
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

    // Make header clickable (for both mobile and desktop)
    header.addEventListener('click', (e) => {
        if (e.target === header || e.target === header.querySelector('span')) {
            if (window.innerWidth <= 768) {
                toggleChatbot(false); // Close on mobile
            } else {
                toggleChatbot(); // Toggle on desktop
            }
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
    // Clean the message: remove punctuation and convert to lowercase
    message = message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    
    // Helper function for strict matching (no fuzzy matching)
    const containsExact = (keywords) => {
        const words = message.split(/\s+/);
        return words.some(word => keywords.includes(word));
    };
    
    // Helper function to check if message contains any of the keywords with fuzzy matching
    const containsAny = (keywords, useStrict = false) => {
        if (useStrict) {
            return containsExact(keywords);
        }
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

    // Check for greetings first - this should take precedence over all other checks
    const greetings = [
        'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 
        'howdy', 'hola', 'greetings', 'hi there', 'hello there', 'morning', 
        'afternoon', 'evening', 'yo', 'heya', 'hiya', 'greetings', 'sup', 
        'whats up', "what's up", 'how are you', 'how do you do'
    ];

    // If the message is ONLY a greeting (1-2 words max) and matches exactly
    if (message.split(/\s+/).length <= 2 && containsAny(greetings, true)) {
        const timeOfDay = new Date().getHours();
        let greeting = "Hello";
        
        if (timeOfDay < 12) greeting = "Good morning";
        else if (timeOfDay < 18) greeting = "Good afternoon";
        else greeting = "Good evening";

        return `<b>${greeting}!</b> 👋 How can I help you today?`;
    }

    // General introduction/about queries
    if (containsAny(['who', 'what', 'tell me about', 'know about']) && 
        (message.includes('tsaousidis') || message.includes('konstantinos') || message.includes('him'))) {
        return `<b>${botData.name}</b> is a <b>${botData.role}</b> based in <b>${botData.location}</b>. ${botData.profile}<br><br>
You can ask me about:
<ul style="text-align: left; padding-left: 20px; list-style-position: outside;">
<li><b>Professional background</b> and experience</li>
<li><b>Technical skills</b> and projects</li>
<li><b>Education</b> and certifications</li>
<li><b>Contact information</b></li>
<li><b>Languages</b> and personal skills</li>
</ul>
What would you like to know more about?`;
    }

    // Experience/Jobs keywords - moved before technical skills and made more specific
    if (containsAny(['experience', 'work', 'job', 'jobs', 'career', 'company', 'position', 'role', 'employment', 'occupation', 'profession']) || 
        (containsAny(['what', 'tell', 'about']) && containsAny(['experience', 'work', 'job', 'jobs', 'career', 'company']))) {
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

    // Project keywords - handle both direct and follow-up questions
    if (containsAny(['project', 'portfolio', 'build', 'develop', 'create']) || 
        (containsAny(['what', 'tell', 'about']) && message.includes('project'))) {
        let response = `Here are some notable projects by <b>${botData.name}:</b><br><br>`;
        botData.projects.forEach(project => {
            response += `<b>${project.name}</b><br>`;
            response += `${project.description}<br><br>`;
        });
        response += `👉 Explore more projects at <a href="https://tsaousidis.site/projects" target="_blank">tsaousidis.site/projects</a>`;
        return response;
    }

    // Education keywords - handle both direct and follow-up questions
    if (containsAny(['education', 'study', 'degree', 'university', 'college', 'school']) || 
        (containsAny(['what', 'tell', 'about']) && message.includes('education'))) {
        return `<b>${botData.name}</b> is pursuing <b>${botData.education.degree}</b> at <b>${botData.education.institution}</b>. He started in ${botData.education.period} with expected graduation in ${botData.education.expectedGraduation}.`;
    }

    // Certification keywords - handle both direct and follow-up questions
    if (containsAny(['certification', 'certificate', 'training', 'course']) || 
        (containsAny(['what', 'tell', 'about']) && containsAny(['certification', 'certificate', 'training']))) {
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

    // Technical skills keywords - handle both direct and follow-up questions
    if (containsAny(['skill', 'skills', 'technology', 'technologies', 'tech stack', 'programming', 'language', 'languages', 'framework', 'frameworks', 'tool', 'tools', 'platform', 'platforms', 'knowledge', 'expertise', 'tech', 'technological']) || 
        (containsAny(['what', 'tell', 'about']) && containsAny(['skill', 'tech', 'technology', 'programming']))) {
        let response = '';
        if (containsAny(['language', 'programming'])) {
            response = `<b>${botData.name}</b> is proficient in the following programming languages:<br><ul>
• ${botData.technicalSkills.languages.join('<br>• ')}</ul>
<br>👉 See all technologies at <a href="https://tsaousidis.site/technologies" target="_blank">tsaousidis.site/technologies</a>`;
        } else if (containsAny(['framework', 'library'])) {
            response = `<b>${botData.name}</b> works with these frameworks and libraries:<br><ul>
• ${botData.technicalSkills.frameworksAndLibraries.join('<br>• ')}</ul>
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

    // Contact information keywords - handle both direct and follow-up questions
    if (containsAny(['contact', 'reach', 'email', 'phone', 'number', 'website', 'social', 'linkedin', 'github', 'connect', 'message', 'mail']) || 
        (containsAny(['what', 'tell', 'about']) && containsAny(['contact', 'reach', 'email']))) {
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

    // Language proficiency keywords - handle both direct and follow-up questions
    if (containsAny(['language', 'speak', 'fluent']) || 
        (containsAny(['what', 'tell', 'about']) && message.includes('language'))) {
        let response = `<b>${botData.name}'s language proficiency:</b><ul>`;
        botData.languages.forEach(lang => {
            response += `• <b>${lang.language}:</b> ${lang.level}<br>`;
        });
        response += '</ul>';
        return response;
    }

    // Default response with conversation starters
    return `I can tell you about <b>${botData.name}'s:</b>
<ul style="text-align: left; padding-left: 20px; list-style-position: outside;">
<li><b>Professional background</b> and experience</li>
<li><b>Technical skills</b> and projects</li>
<li><b>Education</b> and certifications</li>
<li><b>Contact information</b></li>
<li><b>Languages</b> and personal skills</li>
</ul>
What would you like to know more about?`;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initChatbot); 