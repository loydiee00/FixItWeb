// Support Validation Utils
import type { SupportFormData, FeedbackFormData, SupportValidationErrors, FeedbackValidationErrors } from '../types';

export const validateSupportForm = (data: SupportFormData): SupportValidationErrors => {
  const errors: SupportValidationErrors = {};

  // Subject validation
  if (!data.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (data.subject.length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.length > 100) {
    errors.subject = 'Subject must be less than 100 characters';
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (data.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  // Priority validation
  if (!data.priority) {
    errors.priority = 'Priority is required';
  }

  // Category validation
  if (!data.category.trim()) {
    errors.category = 'Category is required';
  }

  return errors;
};

export const validateFeedbackForm = (data: FeedbackFormData): FeedbackValidationErrors => {
  const errors: FeedbackValidationErrors = {};

  // Type validation
  if (!data.type) {
    errors.type = 'Feedback type is required';
  }

  // Title validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (data.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (data.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  // Rating validation (if provided)
  if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
    errors.rating = 'Rating must be between 1 and 5 stars';
  }

  return errors;
};

export const hasValidationErrors = (errors: SupportValidationErrors | FeedbackValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};

export const supportCategories = [
  'Technical Issue',
  'Account & Billing',
  'Feature Request',
  'Bug Report',
  'General Inquiry',
  'Security Concern',
  'Performance Issue',
  'Other'
];

export const feedbackTypes = [
  { value: 'bug-report', label: 'Bug Report', icon: '🐛' },
  { value: 'feature-request', label: 'Feature Request', icon: '💡' },
  { value: 'general', label: 'General Feedback', icon: '💬' },
  { value: 'complaint', label: 'Complaint', icon: '😞' },
  { value: 'compliment', label: 'Compliment', icon: '😊' }
] as const;

export const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { value: 'high', label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-100' }
] as const;
