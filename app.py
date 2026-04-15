from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory
from flask_wtf.csrf import CSRFProtect
from dotenv import load_dotenv
import os
import requests
import resend

# Load environment variables from .env file in development
if os.path.exists(".env"):
    load_dotenv()

app = Flask(__name__)

# Set secret key first, before any other configuration
app.secret_key = os.environ.get("SECRET_KEY")
if not app.secret_key:
    raise ValueError("No SECRET_KEY set in environment variables")

# reCAPTCHA configuration
RECAPTCHA_SITE_KEY = os.environ.get("RECAPTCHA_SITE_KEY")
RECAPTCHA_SECRET_KEY = os.environ.get("RECAPTCHA_SECRET_KEY")

if not RECAPTCHA_SITE_KEY or not RECAPTCHA_SECRET_KEY:
    raise ValueError("reCAPTCHA keys not set in environment variables")

# Initialize CSRF protection
csrf = CSRFProtect(app)

# Session security configurations
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["PERMANENT_SESSION_LIFETIME"] = 3600

# Resend email configuration
resend.api_key = os.environ.get("RESEND_API_KEY")
if not resend.api_key:
    raise ValueError("No RESEND_API_KEY set in environment variables")


@app.after_request
def add_security_headers(response):
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com "
        "https://cdnjs.cloudflare.com https://unpkg.com https://*.google-analytics.com "
        "https://www.google.com https://www.gstatic.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com "
        "https://fonts.googleapis.com https://unpkg.com; "
        "img-src 'self' data: https: https://*.google-analytics.com; "
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; "
        "connect-src 'self' https://*.google-analytics.com https://www.google.com https://www.gstatic.com; "
        "frame-src 'self' https://www.google.com https://recaptcha.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/; "
        "form-action 'self';"
    )
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer-when-downgrade"
    return response


@app.route("/robots.txt")
def robots_txt():
    return send_from_directory(app.root_path, "robots.txt", mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap_xml():
    return send_from_directory(app.root_path, "sitemap.xml", mimetype="application/xml")


@app.route("/", methods=["GET", "POST"])
def home():
    form_data = {
        "name": "",
        "email": "",
        "message": ""
    }

    if request.method == "POST":
        # Honeypot check
        if request.form.get("website"):
            flash("Bot detected. Access denied.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        # Keep entered values on validation errors
        form_data = {
            "name": request.form.get("name", "").strip(),
            "email": request.form.get("email", "").strip(),
            "message": request.form.get("message", "").strip()
        }

        # reCAPTCHA presence check
        recaptcha_response = request.form.get("g-recaptcha-response")
        if not recaptcha_response:
            flash("Please complete the reCAPTCHA.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        # Verify reCAPTCHA with Google
        try:
            verify_response = requests.post(
                "https://www.google.com/recaptcha/api/siteverify",
                data={
                    "secret": RECAPTCHA_SECRET_KEY,
                    "response": recaptcha_response
                },
                timeout=5
            )
            verify_response.raise_for_status()
            verify_data = verify_response.json()
        except requests.RequestException as e:
            print(f"reCAPTCHA request error: {repr(e)}")
            flash("Unable to verify reCAPTCHA right now. Please try again.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )
        except ValueError as e:
            print(f"reCAPTCHA JSON parse error: {repr(e)}")
            flash("Invalid response from reCAPTCHA verification. Please try again.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        if not verify_data.get("success"):
            print("reCAPTCHA failed response:", verify_data)
            flash("reCAPTCHA verification failed. Please try again.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        name = form_data["name"]
        email = form_data["email"]
        message = form_data["message"]

        # Validate inputs
        if not all([name, email, message]):
            flash("All fields are required.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        if len(name) < 2:
            flash("Please enter a valid name.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        if len(message) < 10 or len(message) > 1000:
            flash("Message must be between 10 and 1000 characters.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

        try:
            params = {
                "from": "contact@tsaousidis.online",
                "to": ["kostastsaousbm@gmail.com"],
                "subject": "Contact from tsaousidis.online",
                "text": f"""New contact received from your portfolio website:

            From: {name} ({email})

            Message:
            {message}
            """
            }
            resend.Emails.send(params)

            flash("Thank you for your message! I will get back to you soon.", "success")
            return redirect(url_for("home") + "#contact")

        except Exception as e:
            print(f"Error sending email: {repr(e)}")
            flash("Sorry, there was an error sending your message. Please try again later.", "error")
            return render_template(
                "index.html",
                recaptcha_site_key=RECAPTCHA_SITE_KEY,
                form_data=form_data
            )

    return render_template(
        "index.html",
        recaptcha_site_key=RECAPTCHA_SITE_KEY,
        form_data=form_data
    )

@app.route("/technologies")
@app.route("/projects")
@app.route("/contact")
def legacy_redirects():
    return redirect(url_for("home"), 301)

if __name__ == "__main__":
    app.run(debug=True)