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

def check_users():
    print("Current users in the database:")
    print("-" * 50)
    
    users = User.objects.all()
    if not users:
        print("No users found in the database.")
        return
    
    for user in users:
        print(f"ID: {user.id}")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"First name: '{user.first_name}'")
        print(f"Last name: '{user.last_name}'")

        full_name = f"{user.first_name} {user.last_name}".strip()
        if not full_name:
            full_name = user.username
        print(f"Full name (as returned by API): '{full_name}'")
        print("-" * 30)

def update_user_names():
    print("\nLet's check if we need to update any user names")

    users_needing_update = User.objects.filter(first_name__isnull=True) | User.objects.filter(first_name='')
    
    if users_needing_update:
        print(f"Found {users_needing_update.count()} users that might need name updates:")
        for user in users_needing_update:
            if user.username and ' ' in user.username:
                name_parts = user.username.split(' ')
                if len(name_parts) >= 2:
                    first_name = name_parts[0]
                    last_name = ' '.join(name_parts[1:])
                    
                    print(f"Updating user {user.id} ({user.username}):")
                    print(f"  Setting first_name to: '{first_name}'")
                    print(f"  Setting last_name to: '{last_name}'")
                    
                    user.first_name = first_name
                    user.last_name = last_name
                    user.save()
                    print("  ✓ Updated!")
                else:
                    print(f"User {user.username} has only one name part, skipping...")
            else:
                print(f"User {user.username} doesn't have space in username, skipping...")
    else:
        print("All users already have proper first/last names set.")

if __name__ == "__main__":
    check_users()
    update_user_names()
    print("\n" + "="*50)
    print("After updates:")
    check_users()
