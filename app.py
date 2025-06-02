from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv
import os

# Load environment variables from .env file in development
if os.path.exists('.env'):
    load_dotenv()

app = Flask(__name__)

# Set secret key first, before any other configuration
app.secret_key = os.environ.get('SECRET_KEY')
if not app.secret_key:
    raise ValueError("No SECRET_KEY set in environment variables")

# Initialize CSRF protection
csrf = CSRFProtect(app)

# Session security configurations
app.config['SESSION_COOKIE_SECURE'] = True  # Ensure cookies only sent over HTTPS
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to session cookie
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Protect against CSRF
app.config['PERMANENT_SESSION_LIFETIME'] = 3600  # Session timeout in seconds (1 hour)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

mail = Mail(app)

# Security Headers
@app.after_request
def add_security_headers(response):
    # Content Security Policy - Carefully configured to allow necessary resources
    response.headers['Content-Security-Policy'] = "default-src 'self'; " \
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com https://cdnjs.cloudflare.com https://unpkg.com https://*.google-analytics.com; " \
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com https://unpkg.com; " \
        "img-src 'self' data: https: https://*.google-analytics.com; " \
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; " \
        "connect-src 'self' https://*.google-analytics.com; " \
        "frame-ancestors 'none'; " \
        "form-action 'self';"
    
    # HSTS (HTTP Strict Transport Security)
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    # Prevent Clickjacking
    response.headers['X-Frame-Options'] = 'DENY'
    
    # Prevent content-type sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Referrer Policy
    response.headers['Referrer-Policy'] = 'no-referrer-when-downgrade'
    
    return response

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/projects")
def projects():
    my_projects = [
        {
            "title": "Flights Notifier",
            "description": "A system to track and notify users about low-price flights for specific destinations using the Amadeus API, Sheety for data management, and email notifications via SMTP.",
            "technologies": [
                {"name": "Python", "icon": "fab fa-python"},
                {"name": "APIs", "icon": "fas fa-cloud"},
                {"name": "SMTP", "icon": "fas fa-envelope"},
                {"name": "Amadeus", "icon": "fas fa-plane"}
            ],
            "link": "https://github.com/Tsaousidis/oop-api-flights-notifier",
            "image": url_for('static', filename='img/flights-notifier.jpg')
        },
        {
            "title": "Billboard to Spotify",
            "description": "A Python automation project that scrapes the Billboard Hot 100 chart for a user-specified date and creates a private Spotify playlist with the top 100 songs of that day.",
            "technologies": [
                {"name": "Python", "icon": "fab fa-python"},
                {"name": "Web Scraping", "icon": "fas fa-spider"},
                {"name": "Spotify", "icon": "fab fa-spotify"},
                {"name": "APIs", "icon": "fas fa-cloud"},
            ],
            "link": "https://github.com/Tsaousidis/scraper-api-billboard-to-spotify",
            "image": url_for('static', filename='img/billboard-to-spotify.jpg')
        },
        {
            "title": "Greek Flash Card Learning App",
            "description": "A simple flash card application built with Python and Tkinter to help users learn Greek vocabulary. The app displays Greek words on flash cards, allowing users to test their knowledge and track progress.",
            "technologies": [
                {"name": "Python", "icon": "fab fa-python"},
                {"name": "GUI", "icon": "fas fa-desktop"},
                {"name": "Automation", "icon": "fas fa-robot"},
                {"name": "Tkinter", "icon": "fas fa-window-maximize"},
                {"name": "Greek Language", "icon": "fas fa-language"}
            ],
            "link": "https://github.com/Tsaousidis/gui-pandas-greek-flashcards",
            "image": url_for('static', filename='img/greek-flashcards.png')
        },
        {
            "title": "ISS Real-Time Tracker",
            "description": "This script fetches the current position of the ISS from an API and updates an interactive map every 10 seconds. The map is displayed in your browser, showing the ISS's latest location.",
            "technologies": [
                {"name": "Python", "icon": "fab fa-python"},
                {"name": "API", "icon": "fas fa-cloud"},
                {"name": "Automation", "icon": "fas fa-robot"},
                {"name": "Folium", "icon": "fas fa-map-marked-alt"}
            ],
            "link": "https://github.com/Tsaousidis/api-folium-iss-tracker",
            "image": url_for('static', filename='img/iss-tracker.png')
        },
        {
            "title": "The Classic Snake Game",
            "description": "A fun and addictive Snake game built using Python's turtle module. Guide the snake, eat the food, grow longer, and avoid crashing into the walls or your own tail. How long can you survive?",
            "technologies": [
                {"name": "Python", "icon": "fab fa-python"},
                {"name": "Game", "icon": "fas fa-gamepad"},
                {"name": "OOP", "icon": "fas fa-cubes"}
            ],
            "link": "https://github.com/Tsaousidis/oop-turtle-snake-game",
            "image": url_for('static', filename='img/turtle-snake-game.png')
        },
        {
            "title": "Password Manager",
            "description": "A password manager built with Python and Tkinter that allows you to generate and store secure passwords efficiently.",
            "technologies": [
                {"name": "Python", "icon": "fab fa-python"},
                {"name": "GUI", "icon": "fas fa-desktop"},
                {"name": "Password Manager", "icon": "fas fa-key"},
                {"name": "Tkinter", "icon": "fas fa-window-maximize"}
            ],
            "link": "https://github.com/Tsaousidis/gui-password-manager",
            "image": url_for('static', filename='img/password-manager.png')
        }
    ]

    return render_template("projects.html", projects=my_projects)

@app.route("/technologies")
def technologies():
    tech_list = [
        {
            "category": "Programming Languages",
            "tech_items": ["Python", "SQL", "JavaScript", "PHP", "HTML", "CSS"]
        },
        {
            "category": "Frameworks & Libraries",
            "tech_items": [
                "Flask", "AOS", "Typed.js", "Requests", "BeautifulSoup4", "SMTP", "Folium",
                "Tkinter", "Turtle"
            ]
        },
        {
            "category": "Tools & Platforms",
            "tech_items": [
                "Git", "GitHub", "Docker", "Postman", "Camunda", "Azure", "AWS", "Render", "Flask-Mail", "Gunicorn"
            ]
        },
        {
            "category": "Data & Visualization",
            "tech_items": ["Pandas", "NumPy", "Tableau", "Power BI", "Excel"]
        },
        {
            "category": "Concepts & Methodologies",
            "tech_items": ["OOP", "REST APIs", "BPM", "Agile", "Business Intelligence", "Data Science", "Web Apps"]
        },
        {
            "category": "AI & Machine Learning",
            "tech_items": ["Salesforce AI Fundamentals"]
        }
    ]
    return render_template("technologies.html", technologies=tech_list)

@app.route("/feedback", methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        # CSRF token is automatically checked by flask-wtf
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()
        
        form_data = {
            'name': name,
            'email': email,
            'message': message
        }
        
        # Validate inputs
        if not all([name, email, message]):
            flash('All fields are required.', 'error')
            return render_template("feedback.html", form_data=form_data)
        
        if len(name) < 2 or not name.replace(' ', '').isalpha():
            flash('Please enter a valid name (letters only).', 'error')
            return render_template("feedback.html", form_data=form_data)
        
        if len(message) < 10 or len(message) > 1000:
            flash('Message must be between 10 and 1000 characters.', 'error')
            return render_template("feedback.html", form_data=form_data)
        
        try:
            msg = Message(
                subject="Feedback from tsaousidis.site",
                recipients=[app.config['MAIL_USERNAME']],
                body=f"""
                New feedback received from your portfolio website:
                
                From: {name} ({email})
                
                Message:
                {message}
                """
            )
            mail.send(msg)
            flash('Thank you for your feedback! I will get back to you soon.', 'success')
            return redirect(url_for('feedback'))
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            print(f"Mail settings: SERVER={app.config['MAIL_SERVER']}, PORT={app.config['MAIL_PORT']}, USERNAME={app.config['MAIL_USERNAME']}")
            flash('Sorry, there was an error sending your feedback. Please try again later.', 'error')
            return render_template("feedback.html", form_data=form_data)
            
    return render_template("feedback.html", form_data={})

if __name__ == "__main__":
    app.run(debug=True)
