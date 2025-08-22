// Support Service
import type { SupportTicket, Feedback, SupportFormData, FeedbackFormData } from '../types';

class SupportService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  async createSupportTicket(data: SupportFormData): Promise<{ success: boolean; ticket?: SupportTicket; message: string }> {
    try {
      const formData = new FormData();
      formData.append('subject', data.subject);
      formData.append('description', data.description);
      formData.append('priority', data.priority);
      formData.append('category', data.category);
      
      // Append attachments
      data.attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });

      const response = await fetch(`${this.baseUrl}/api/support/tickets/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create support ticket');
      }

      const result = await response.json();
      return {
        success: true,
        ticket: result.ticket,
        message: 'Support ticket created successfully. We\'ll get back to you soon!'
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create support ticket'
      };
    }
  }

  async submitFeedback(data: FeedbackFormData): Promise<{ success: boolean; feedback?: Feedback; message: string }> {
    try {
      const formData = new FormData();
      formData.append('type', data.type);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('isAnonymous', data.isAnonymous.toString());
      
      if (data.rating) {
        formData.append('rating', data.rating.toString());
      }
      
      // Append attachments
      data.attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });

      const response = await fetch(`${this.baseUrl}/api/support/feedback/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }

      const result = await response.json();
      return {
        success: true,
        feedback: result.feedback,
        message: 'Thank you for your feedback! We appreciate your input.'
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit feedback'
      };
    }
  }

  async getUserTickets(): Promise<SupportTicket[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/support/tickets/`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }
}

export const supportService = new SupportService();
