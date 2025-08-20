# Test Password Reset Functionality

import requests
import json

# Test the password reset endpoints
base_url = "http://localhost:8000"

def test_forgot_password():
    """Test the forgot password endpoint"""
    url = f"{base_url}/api/auth/forgot-password/"
    data = {"email": "test@example.com"}
    
    try:
        response = requests.post(url, json=data)
        print(f"Forgot Password Response: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing forgot password: {e}")
        return False

def test_verify_reset_code():
    """Test the verify reset code endpoint"""
    url = f"{base_url}/api/auth/verify-reset-code/"
    data = {
        "email": "test@example.com",
        "code": "123456"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Verify Code Response: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing verify code: {e}")
        return False

def test_reset_password():
    """Test the reset password endpoint"""
    url = f"{base_url}/api/auth/reset-password/"
    data = {
        "email": "test@example.com",
        "code": "123456",
        "new_password": "NewPassword123!"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Reset Password Response: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing reset password: {e}")
        return False

if __name__ == "__main__":
    print("Testing Password Reset Endpoints...")
    print("=" * 50)
    
    print("\n1. Testing Forgot Password:")
    test_forgot_password()
    
    print("\n2. Testing Verify Reset Code:")
    test_verify_reset_code()
    
    print("\n3. Testing Reset Password:")
    test_reset_password()
    
    print("\n" + "=" * 50)
    print("Note: For actual email sending to work, you need to:")
    print("1. Replace 'your-email@gmail.com' with your actual Gmail address")
    print("2. Replace 'your-app-password' with your Gmail App Password")
    print("3. Update the email settings in backend/webproject/settings.py")
