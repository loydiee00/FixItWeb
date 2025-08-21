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

def update_josh_user():
    """Update the josh user with proper first and last names"""
    try:
        # Find the josh user
        josh_user = User.objects.get(username='josh')
        print(f"Found user: {josh_user.username} (ID: {josh_user.id})")
        print(f"Current first_name: '{josh_user.first_name}'")
        print(f"Current last_name: '{josh_user.last_name}'")
        
        # Update with Josh Co as requested by the user
        josh_user.first_name = 'Josh'
        josh_user.last_name = 'Co'
        josh_user.save()
        
        print(f"✓ Updated user!")
        print(f"New first_name: '{josh_user.first_name}'")
        print(f"New last_name: '{josh_user.last_name}'")
        
        # Show what the full name will be
        full_name = f"{josh_user.first_name} {josh_user.last_name}".strip()
        print(f"Full name (as returned by API): '{full_name}'")
        
        # Show what initials will be generated
        name_parts = full_name.split(" ")
        if len(name_parts) >= 2:
            initials = name_parts[0][0] + name_parts[-1][0]
            print(f"Initials will be: '{initials.upper()}'")
        
    except User.DoesNotExist:
        print("User 'josh' not found!")
        
        # Show available users
        print("\nAvailable users:")
        for user in User.objects.all():
            print(f"- {user.username} (ID: {user.id})")

def update_joshco_user():
    """Update the joshco user with proper first and last names"""
    try:
        # Find the joshco user  
        joshco_user = User.objects.get(username='joshco')
        print(f"\nFound user: {joshco_user.username} (ID: {joshco_user.id})")
        print(f"Current first_name: '{joshco_user.first_name}'")
        print(f"Current last_name: '{joshco_user.last_name}'")
        
        # Update with Josh Co as requested by the user
        joshco_user.first_name = 'Josh'
        joshco_user.last_name = 'Co'
        joshco_user.save()
        
        print(f"✓ Updated user!")
        print(f"New first_name: '{joshco_user.first_name}'")
        print(f"New last_name: '{joshco_user.last_name}'")
        
        # Show what the full name will be
        full_name = f"{joshco_user.first_name} {joshco_user.last_name}".strip()
        print(f"Full name (as returned by API): '{full_name}'")
        
        # Show what initials will be generated
        name_parts = full_name.split(" ")
        if len(name_parts) >= 2:
            initials = name_parts[0][0] + name_parts[-1][0]
            print(f"Initials will be: '{initials.upper()}'")
        
    except User.DoesNotExist:
        print("User 'joshco' not found!")

if __name__ == "__main__":
    update_josh_user()
    update_joshco_user()
