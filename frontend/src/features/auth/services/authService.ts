import type{ ForgotPasswordRequest, VerifyOtpRequest, ApiResponse } from '../types';

class AuthService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send reset code');
      }

      return {
        success: true,
        message: result.message || 'Reset code sent to your email',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send reset code',
      };
    }
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/verify-reset-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: data.email, 
          code: data.otp 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Invalid or expired code');
      }

      return {
        success: true,
        message: result.message || 'Code verified successfully',
        data: result, // Include email and code for next step
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to verify code',
      };
    }
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          code, 
          password: newPassword 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to reset password');
      }

      return {
        success: true,
        message: result.message || 'Password reset successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to reset password',
      };
    }
  }
}

export const authService = new AuthService();
