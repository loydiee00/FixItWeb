// src/features/auth/services/auth.service.ts

import type { LoginCredentials, AuthResponse } from '../models/auth.types';
import { AuthError } from '../models/auth.types';

class AuthService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new AuthError(errorData.error || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      
      // Store tokens
      if (credentials.rememberMe) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
      }

      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Network error. Please try again.');
    }
  }

  async register(credentials: { email: string; password: string; username?: string }): Promise<{ message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          username: credentials.username || credentials.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new AuthError(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Network error. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getAccessToken();
      const refreshToken = this.getRefreshToken();
      
      if (token && refreshToken) {
        await fetch(`${this.baseUrl}/api/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      // Clear tokens regardless of API call success
      this.clearTokens();
    }
  }

  async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/auth/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.accessToken;

      // Update stored token
      if (localStorage.getItem('accessToken')) {
        localStorage.setItem('accessToken', newAccessToken);
      } else {
        sessionStorage.setItem('accessToken', newAccessToken);
      }

      return newAccessToken;
    } catch (error) {
      this.clearTokens();
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  // Password Reset Methods
  async forgotPassword(data: { email: string }): Promise<{ success: boolean; message: string }> {
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

  async verifyOtp(data: { email: string; otp: string }): Promise<{ success: boolean; message: string }> {
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
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to verify code',
      };
    }
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<{ success: boolean; message: string }> {
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