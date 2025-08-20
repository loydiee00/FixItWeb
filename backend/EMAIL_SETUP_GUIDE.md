# Email Setup Instructions for Password Reset

## Gmail SMTP Configuration

To enable email sending for password reset functionality, you need to configure Gmail SMTP settings:

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Security → 2-Step Verification
3. Enable 2-Factor Authentication

### Step 2: Generate App Password
1. Go to Google Account → Security
2. Under "Signing in to Google", select "App passwords"
3. Generate a new app password for "Mail"
4. Copy the 16-character password

### Step 3: Update Django Settings
Update the email configuration in `backend/webproject/settings.py`:

```python
# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'  # Your Gmail address
EMAIL_HOST_PASSWORD = 'your-app-password'  # Your Gmail App Password
DEFAULT_FROM_EMAIL = 'your-email@gmail.com'  # Your Gmail address
```

### Step 4: Install Required Packages (if needed)
```bash
cd backend
pip install python-decouple  # For environment variables (optional)
```

### Step 5: Environment Variables (Recommended)
For security, use environment variables instead of hardcoding credentials:

1. Create a `.env` file in the backend directory:
```
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
```

2. Update settings.py:
```python
from decouple import config

EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')
```

### Alternative: SendGrid Configuration
If you prefer SendGrid instead of Gmail:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = 'your-sendgrid-api-key'
DEFAULT_FROM_EMAIL = 'your-verified-sender@domain.com'
```

### Testing Email Configuration
Run this command in Django shell to test:
```python
python manage.py shell
>>> from django.core.mail import send_mail
>>> send_mail('Test', 'Test message', 'your-email@gmail.com', ['recipient@example.com'])
```

### Troubleshooting
- Ensure Gmail "Less secure app access" is disabled (use App Passwords instead)
- Check that your Gmail account has 2FA enabled
- Verify the App Password is correct (16 characters, no spaces)
- For SendGrid, ensure your sender email is verified

## How the Password Reset Flow Works

1. User enters email on forgot password page
2. System generates a 6-digit code and stores it in database
3. Email is sent to user with the reset code
4. User enters code on verification page
5. If code is valid, user can set new password
6. Code expires after 5 minutes for security
