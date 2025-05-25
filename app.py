from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
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

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

mail = Mail(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/projects")
def projects():
    my_projects = [
        {
            "title": "Flights Notifier",
            "description": "Finds cheap flights and sends alerts via SMS.",
            "technologies": ["Python", "APIs", "Twilio", "Amadeus"],
            "link": "https://github.com/Tsaousidis/oop-api-flights-notifier"
        },
        {
            "title": "Billboard to Spotify",
            "description": "Scrapes Billboard songs and creates a Spotify playlist.",
            "technologies": ["Python", "Web Scraping", "Spotify API"],
            "link": "https://github.com/Tsaousidis/scraper-api-billboard-to-spotify"
        }
    ]
    return render_template("projects.html", projects=my_projects)

@app.route("/technologies")
def technologies():
    tech_list = [
        {
            "category": "Programming Languages",
            "tech_items": ["Python", "JavaScript", "HTML", "CSS"]
        },
        {
            "category": "Frameworks & Libraries",
            "tech_items": ["Flask", "Bootstrap", "jQuery"]
        },
        {
            "category": "Tools & Platforms",
            "tech_items": ["Git", "GitHub", "VS Code", "APIs"]
        }
    ]
    return render_template("technologies.html", technologies=tech_list)

@app.route("/feedback", methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validate inputs
        if not all([name, email, subject, message]):
            flash('All fields are required.', 'error')
            return redirect(url_for('feedback'))
        
        if len(name) < 2 or not name.replace(' ', '').isalpha():
            flash('Please enter a valid name (letters only).', 'error')
            return redirect(url_for('feedback'))
        
        if len(subject) < 3 or len(subject) > 100:
            flash('Subject must be between 3 and 100 characters.', 'error')
            return redirect(url_for('feedback'))
            
        if len(message) < 10 or len(message) > 1000:
            flash('Message must be between 10 and 1000 characters.', 'error')
            return redirect(url_for('feedback'))
        
        try:
            msg = Message(
                subject=f"Portfolio Feedback: {subject}",
                recipients=[app.config['MAIL_USERNAME']],
                body=f"""
                New feedback received from your portfolio website:
                
                From: {name} ({email})
                Subject: {subject}
                
                Message:
                {message}
                """)
            mail.send(msg)
            flash('Thank you for your feedback! I will get back to you soon.', 'success')
            return redirect(url_for('feedback'))
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            print(f"Mail settings: SERVER={app.config['MAIL_SERVER']}, PORT={app.config['MAIL_PORT']}, USERNAME={app.config['MAIL_USERNAME']}")
            flash('Sorry, there was an error sending your feedback. Please try again later.', 'error')
            return redirect(url_for('feedback'))
            
    return render_template("feedback.html")

if __name__ == "__main__":
    app.run(debug=True)
