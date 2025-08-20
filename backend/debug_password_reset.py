#!/usr/bin/env python
"""
Test script to debug password reset functionality
"""
import os
import sys
import django
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webproject.settings')
django.setup()

from django.contrib.auth.models import User
from authentication.models import PasswordResetCode

def test_password_reset():
    print("=== Password Reset Debug Test ===")
    
    # Create a test user
    test_email = "test@example.com"
    test_password = "oldpassword123"
    new_password = "newpassword456"
    
    # Clean up any existing test user
    User.objects.filter(email=test_email).delete()
    
    # Create test user
    user = User.objects.create_user(
        username=test_email,
        email=test_email,
        password=test_password
    )
    print(f"✓ Created test user: {test_email}")
    
    # Test authentication with old password
    from django.contrib.auth import authenticate
    auth_user = authenticate(username=test_email, password=test_password)
    print(f"✓ Old password authentication: {'SUCCESS' if auth_user else 'FAILED'}")
    
    # Generate reset code
    reset_code = PasswordResetCode.generate_code(user)
    print(f"✓ Generated reset code: {reset_code.code}")
    
    # Test password reset
    user.set_password(new_password)
    user.save()
    print(f"✓ Password updated to: {new_password}")
    
    # Test authentication with new password
    auth_user = authenticate(username=test_email, password=new_password)
    print(f"✓ New password authentication: {'SUCCESS' if auth_user else 'FAILED'}")
    
    # Test authentication with old password (should fail)
    auth_user = authenticate(username=test_email, password=test_password)
    print(f"✓ Old password authentication after reset: {'FAILED (expected)' if not auth_user else 'SUCCESS (unexpected!)'}")
    
    # Check user object
    user.refresh_from_db()
    print(f"✓ User password hash changed: {user.password[:20]}...")
    
    # Clean up
    user.delete()
    print("✓ Cleaned up test user")

if __name__ == "__main__":
    test_password_reset()
