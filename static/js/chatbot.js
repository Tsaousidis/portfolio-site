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
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    
    // Check if chatbot was previously collapsed
    if (localStorage.getItem('chatbotCollapsed') === 'true') {
        chatContainer.classList.add('collapsed');
    }
    
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
    loadMessages();

    function toggleChatbot() {
        chatContainer.classList.toggle('collapsed');
        const isCollapsed = chatContainer.classList.contains('collapsed');
        toggleBtn.textContent = isCollapsed ? '+' : '×';
        // Store state in localStorage
        localStorage.setItem('chatbotCollapsed', isCollapsed);
    }

    // Make both header and toggle button clickable
    header.addEventListener('click', (e) => {
        // Only toggle if clicking the header itself or the toggle button
        if (e.target === header || e.target === header.querySelector('span')) {
            toggleChatbot();
        }
    });

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent header click event
        toggleChatbot();
    });

    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            // Add user message
            appendMessage('user', message);
            input.value = '';
            
            // Generate and add bot response
            generateResponse(message).then(response => {
                appendMessage('bot', response);
            });
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Save messages to localStorage
function saveMessages() {
    const messages = document.querySelectorAll('.chat-messages .message');
    const messageHistory = Array.from(messages).map(msg => ({
        type: msg.classList.contains('user') ? 'user' : 'bot',
        text: msg.textContent
    }));
    localStorage.setItem('chatMessages', JSON.stringify(messageHistory));
}

// Load messages from localStorage
function loadMessages() {
    const messagesDiv = document.querySelector('.chat-messages');
    const savedMessages = localStorage.getItem('chatMessages');
    
    if (!savedMessages) {
        // If no saved messages, show welcome message
        appendMessage('bot', "Hi! I'm your AI assistant. Ask me anything about Tsaousidis Konstantinos or his projects!");
        return;
    }
    
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

function appendMessage(type, text) {
    const messagesDiv = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Save messages after each new message
    saveMessages();
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