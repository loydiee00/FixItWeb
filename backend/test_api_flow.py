#!/usr/bin/env python
"""
Test the complete password reset API flow
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/auth"

def test_complete_flow():
    print("=== Complete Password Reset API Test ===")
    
    # Step 1: Register a test user
    register_data = {
        "email": "resettest@example.com",
        "password": "originalpassword123",
        "first_name": "Reset",
        "last_name": "Test"
    }
    
    print("1. Registering test user...")
    response = requests.post(f"{BASE_URL}/register/", json=register_data)
    if response.status_code == 201:
        print("   ✓ User registered successfully")
    elif response.status_code == 400 and "already exists" in response.json().get('error', ''):
        print("   ✓ User already exists, continuing...")
    else:
        print(f"   ❌ Registration failed: {response.json()}")
        return
    
    # Step 2: Test login with original password
    print("2. Testing login with original password...")
    login_data = {
        "email": "resettest@example.com",
        "password": "originalpassword123"
    }
    response = requests.post(f"{BASE_URL}/login/", json=login_data)
    if response.status_code == 200:
        print("   ✓ Original password login successful")
    else:
        print(f"   ❌ Original password login failed: {response.json()}")
        return
    
    # Step 3: Request password reset
    print("3. Requesting password reset...")
    forgot_data = {
        "email": "resettest@example.com"
    }
    response = requests.post(f"{BASE_URL}/forgot-password/", json=forgot_data)
    if response.status_code == 200:
        reset_code = response.json().get('code')
        print(f"   ✓ Reset code generated: {reset_code}")
    else:
        print(f"   ❌ Password reset request failed: {response.json()}")
        return
    
    # Step 4: Verify reset code
    print("4. Verifying reset code...")
    verify_data = {
        "email": "resettest@example.com",
        "code": reset_code
    }
    response = requests.post(f"{BASE_URL}/verify-reset-code/", json=verify_data)
    if response.status_code == 200:
        print("   ✓ Reset code verified successfully")
    else:
        print(f"   ❌ Reset code verification failed: {response.json()}")
        return
    
    # Step 5: Reset password
    print("5. Resetting password...")
    reset_data = {
        "email": "resettest@example.com",
        "code": reset_code,
        "password": "newpassword456"
    }
    response = requests.post(f"{BASE_URL}/reset-password/", json=reset_data)
    if response.status_code == 200:
        print("   ✓ Password reset successful")
    else:
        print(f"   ❌ Password reset failed: {response.json()}")
        return
    
    # Step 6: Test login with old password (should fail)
    print("6. Testing login with old password (should fail)...")
    old_login_data = {
        "email": "resettest@example.com",
        "password": "originalpassword123"
    }
    response = requests.post(f"{BASE_URL}/login/", json=old_login_data)
    if response.status_code == 401:
        print("   ✓ Old password correctly rejected")
    else:
        print(f"   ❌ Old password still works! Response: {response.json()}")
    
    # Step 7: Test login with new password (should work)
    print("7. Testing login with new password...")
    new_login_data = {
        "email": "resettest@example.com",
        "password": "newpassword456"
    }
    response = requests.post(f"{BASE_URL}/login/", json=new_login_data)
    if response.status_code == 200:
        print("   ✓ New password login successful")
        print("   ✓ Password reset flow completed successfully!")
    else:
        print(f"   ❌ New password login failed: {response.json()}")

if __name__ == "__main__":
    test_complete_flow()
