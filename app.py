from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file in development
if os.path.exists('.env'):
    load_dotenv()

app = Flask(__name__)

# Set secret key first, before any other configuration
app.secret_key = os.environ.get('SECRET_KEY')
if not app.secret_key:
    raise ValueError("No SECRET_KEY set in environment variables")

# reCAPTCHA configuration
RECAPTCHA_SITE_KEY = os.environ.get('RECAPTCHA_SITE_KEY')
RECAPTCHA_SECRET_KEY = os.environ.get('RECAPTCHA_SECRET_KEY')

if not RECAPTCHA_SITE_KEY or not RECAPTCHA_SECRET_KEY:
    raise ValueError("reCAPTCHA keys not set in environment variables")

# Initialize CSRF protection
csrf = CSRFProtect(app)

# Session security configurations
app.config['SESSION_COOKIE_SECURE'] = not app.debug
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['PERMANENT_SESSION_LIFETIME'] = 3600

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

mail = Mail(app)


@app.after_request
def add_security_headers(response):
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com "
        "https://cdnjs.cloudflare.com https://unpkg.com https://*.google-analytics.com "
        "https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com "
        "https://fonts.googleapis.com https://unpkg.com; "
        "img-src 'self' data: https: https://*.google-analytics.com; "
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; "
        "connect-src 'self' https://*.google-analytics.com; "
        "frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/; "
        "form-action 'self';"
    )
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'no-referrer-when-downgrade'
    return response


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        # Honeypot check
        if request.form.get("website"):
            flash("Bot detected. Access denied.", "error")
            return redirect(url_for("home") + "#contact")

        # Verify reCAPTCHA
        recaptcha_response = request.form.get("g-recaptcha-response")
        if not recaptcha_response:
            flash("Please complete the reCAPTCHA.", "error")
            return redirect(url_for("home") + "#contact")

        verify_response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": recaptcha_response
            }
        ).json()

        if not verify_response.get("success"):
            flash("reCAPTCHA verification failed. Please try again.", "error")
            return redirect(url_for("home") + "#contact")

        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()

        if not all([name, email, message]):
            flash("All fields are required.", "error")
            return redirect(url_for("home") + "#contact")

        if len(name) < 2:
            flash("Please enter a valid name.", "error")
            return redirect(url_for("home") + "#contact")

        if len(message) < 10 or len(message) > 1000:
            flash("Message must be between 10 and 1000 characters.", "error")
            return redirect(url_for("home") + "#contact")

        try:
            msg = Message(
                subject="Contact from tsaousidis.site",
                recipients=[app.config['MAIL_USERNAME']],
                body=f"""
New contact received from your portfolio website:

From: {name} ({email})

Message:
{message}
"""
            )
            mail.send(msg)
            flash("Thank you for your message! I will get back to you soon.", "success")
            return redirect(url_for("home") + "#contact")

        except Exception as e:
            print(f"Error sending email: {str(e)}")
            flash("Sorry, there was an error sending your message. Please try again later.", "error")
            return redirect(url_for("home") + "#contact")

    return render_template("index.html", recaptcha_site_key=RECAPTCHA_SITE_KEY)


if __name__ == "__main__":
    app.run(debug=True)