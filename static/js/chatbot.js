// Chatbot data
const botData = {
    name: "Tsaousidis Konstantinos",
    role: "Software Engineer",
    specialties: ["Automation", "AI", "Python Development"],
    projects: [
        {
            name: "Flights Notifier",
            description: "Finds cheap flights and sends alerts via SMS",
            tech: ["Python", "APIs", "Twilio", "Amadeus"]
        },
        {
            name: "Billboard to Spotify",
            description: "Scrapes Billboard songs and creates a Spotify playlist",
            tech: ["Python", "Web Scraping", "Spotify API"]
        }
    ]
};

// Initialize chatbot
function initChatbot() {
    // Create chat overlay
    const overlay = document.createElement('div');
    overlay.className = 'chat-overlay';
    document.body.appendChild(overlay);

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

    // Load saved messages
    loadMessages(messagesDiv);

    function toggleChatbot(show = null) {
        const shouldShow = show !== null ? show : !chatContainer.classList.contains('visible');
        
        if (shouldShow) {
            chatContainer.classList.remove('collapsed');
            chatContainer.classList.add('visible');
            overlay.classList.add('visible');
            toggleBtn.textContent = '×';
            messagesDiv.style.display = 'flex';
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            input.focus();
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

    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            // Add user message
            appendMessage(messagesDiv, 'user', message);
            input.value = '';
            
            // Generate and add bot response
            generateResponse(message).then(response => {
                appendMessage(messagesDiv, 'bot', response);
            });
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Show initial welcome message
    if (messagesDiv.children.length === 0) {
        appendMessage(messagesDiv, 'bot', "Hi! I'm your AI assistant. Ask me anything about Tsaousidis Konstantinos or his projects!");
    }
}

// Save messages to localStorage
function saveMessages(messagesDiv) {
    const messages = messagesDiv.querySelectorAll('.message');
    const messageHistory = Array.from(messages).map(msg => ({
        type: msg.classList.contains('user') ? 'user' : 'bot',
        text: msg.textContent
    }));
    localStorage.setItem('chatMessages', JSON.stringify(messageHistory));
}

// Load messages from localStorage
function loadMessages(messagesDiv) {
    const savedMessages = localStorage.getItem('chatMessages');
    
    if (savedMessages) {
        const messageHistory = JSON.parse(savedMessages);
        messageHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}`;
            messageDiv.textContent = msg.text;
            messagesDiv.appendChild(messageDiv);
        });
        
        // Scroll to bottom of messages
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function appendMessage(messagesDiv, type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Save messages after each new message
    saveMessages(messagesDiv);
}

async function generateResponse(message) {
    // Simple response generation based on keywords
    message = message.toLowerCase();
    
    if (message.includes('who') && (message.includes('you') || message.includes('are'))) {
        return `I'm an AI assistant for ${botData.name}, who is a ${botData.role} specializing in ${botData.specialties.join(', ')}.`;
    }
    
    if (message.includes('project')) {
        return `${botData.name} has worked on several projects, including:\n` +
               botData.projects.map(p => `- ${p.name}: ${p.description}`).join('\n');
    }
    
    if (message.includes('tech') || message.includes('technologies')) {
        const allTech = new Set(botData.projects.flatMap(p => p.tech));
        return `${botData.name} works with various technologies, including: ${Array.from(allTech).join(', ')}`;
    }
    
    if (message.includes('contact') || message.includes('email')) {
        return `You can find ${botData.name}'s contact information and more details about his work on this portfolio website.`;
    }
    
    return `I'm here to help answer questions about ${botData.name} and his work. You can ask about his projects, technologies, or background!`;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initChatbot); 