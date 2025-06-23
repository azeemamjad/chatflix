import smtplib
import random
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_otp_email(receiver_email, otp):
    """
    Sends an OTP to the specified email address using credentials from environment variables.

    Args:
        receiver_email (str): Recipient's email address.
        otp (str): The OTP code to send.
    """
    sender_email = os.environ.get("OTP_EMAIL")
    sender_password = os.environ.get("OTP_PASSWORD")
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    print(sender_password)

    if not sender_email or not sender_password:
        print("OTP_EMAIL or OTP_PASSWORD environment variable not set.")
        return False

    subject = "Your OTP Code"
    body = f"Your OTP code is: {otp}"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Failed to send OTP email: {e}")
        return False

def generate_otp(length=6):
    """Generates a numeric OTP of given length."""
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])

if( __name__ == "__main__"):
    # Example usage
    otp = generate_otp()
    print(f"Generated OTP: {otp}")
    email_sent = send_otp_email("azeemamjad225@gmail.com", otp)