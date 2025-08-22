import { useState, useCallback } from 'react';
import type { FeedbackFormData, FeedbackValidationErrors } from '../types';
import { validateFeedbackForm } from '../utils/validation';
import { supportService } from '../services/supportService';

const initialFormData: FeedbackFormData = {
  type: 'general',
  title: '',
  description: '',
  rating: undefined,
  attachments: [],
  isAnonymous: false
};

export const useFeedbackViewModel = () => {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [errors, setErrors] = useState<FeedbackValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = useCallback((updates: Partial<FeedbackFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const validateField = useCallback((field: keyof FeedbackFormData) => {
    const validationErrors = validateFeedbackForm(formData);
    if (field in validationErrors) {
      setErrors(prev => ({
        ...prev,
        [field]: validationErrors[field as keyof FeedbackValidationErrors]
      }));
    }
  }, [formData]);

  const submitFeedback = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const validationErrors = validateFeedbackForm(formData);
      const hasErrors = Object.values(validationErrors).some(error => error !== undefined);
      
      if (hasErrors) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return false;
      }

      const result = await supportService.submitFeedback(formData);
      
      if (result.success) {
        setIsSubmitting(false);
        return true;
      } else {
        setErrors({ submit: result.message || 'Failed to submit feedback' });
        setIsSubmitting(false);
        return false;
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
      setIsSubmitting(false);
      return false;
    }
  }, [formData]);

  const clearForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    updateFormData,
    validateField,
    submitFeedback,
    clearForm
  };
};
