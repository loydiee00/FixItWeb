#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webproject.settings')
django.setup()

from django.contrib.auth.models import User

def test_registration_creates_complete_user():
    """Test that new registrations create users with proper first/last names"""
    
    # Check if there are any recent users (for testing)
    latest_user = User.objects.order_by('-id').first()
    
    if latest_user:
        print(f"Latest user in database:")
        print(f"  ID: {latest_user.id}")
        print(f"  Username: {latest_user.username}")
        print(f"  Email: {latest_user.email}")
        print(f"  First name: '{latest_user.first_name}'")
        print(f"  Last name: '{latest_user.last_name}'")
        
        # Test the login response format
        full_name = f"{latest_user.first_name} {latest_user.last_name}".strip()
        if not full_name:
            full_name = latest_user.username
        print(f"  Full name (login response): '{full_name}'")
        
        # Test initials generation
        if full_name and ' ' in full_name:
            name_parts = full_name.split(" ")
            initials = name_parts[0][0] + name_parts[-1][0]
            print(f"  Initials: '{initials.upper()}'")
        else:
            print(f"  Initials: '{full_name[0].upper()}' (single name)")
    else:
        print("No users found in database")

if __name__ == "__main__":
    test_registration_creates_complete_user()
