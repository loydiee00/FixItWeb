// Support and Feedback Types

export type SupportTicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SupportTicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type SupportTicketCategory = 'technical' | 'account' | 'feature' | 'general';
export type FeedbackType = 'bug-report' | 'feature-request' | 'general' | 'complaint' | 'compliment';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  category: string;
  attachments?: File[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
}

export interface Feedback {
  id: string;
  type: FeedbackType;
  title: string;
  description: string;
  rating?: number; // 1-5 stars
  attachments?: File[];
  createdAt: string;
  userId: string;
  isAnonymous?: boolean;
}

export interface SupportFormData {
  subject: string;
  description: string;
  priority: SupportTicketPriority;
  category: SupportTicketCategory;
  attachments: File[];
}

export interface FeedbackFormData {
  type: FeedbackType;
  title: string;
  description: string;
  rating?: number;
  attachments: File[];
  isAnonymous: boolean;
}

export interface SupportValidationErrors {
  subject?: string;
  description?: string;
  priority?: string;
  category?: string;
  submit?: string;
}

export interface FeedbackValidationErrors {
  type?: string;
  title?: string;
  description?: string;
  rating?: string;
  submit?: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SupportViewModel {
  formData: SupportFormData;
  validationErrors: SupportValidationErrors;
  status: FormStatus;
  canSubmit: boolean;
}

export interface FeedbackViewModel {
  formData: FeedbackFormData;
  validationErrors: FeedbackValidationErrors;
  status: FormStatus;
  canSubmit: boolean;
}
