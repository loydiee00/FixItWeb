#!/usr/bin/env python
"""
Clean up test users
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

def cleanup_test_users():
    print("Cleaning up test users...")
    User.objects.filter(email__in=['resettest@example.com', 'test@example.com']).delete()
    print("✓ Test users cleaned up")

if __name__ == "__main__":
    cleanup_test_users()
