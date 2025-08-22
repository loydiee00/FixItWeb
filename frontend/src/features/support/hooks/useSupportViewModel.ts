import { useState, useCallback } from 'react';
import type { SupportFormData, SupportValidationErrors } from '../types';
import { validateSupportForm } from '../utils/validation';
import { supportService } from '../services/supportService';

const initialFormData: SupportFormData = {
  subject: '',
  description: '',
  priority: 'medium',
  category: 'general',
  attachments: []
};

export const useSupportViewModel = () => {
  const [formData, setFormData] = useState<SupportFormData>(initialFormData);
  const [errors, setErrors] = useState<SupportValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = useCallback((updates: Partial<SupportFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const validateField = useCallback((field: keyof SupportFormData) => {
    const validationErrors = validateSupportForm(formData);
    if (field in validationErrors) {
      setErrors(prev => ({
        ...prev,
        [field]: validationErrors[field as keyof SupportValidationErrors]
      }));
    }
  }, [formData]);

  const submitTicket = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const validationErrors = validateSupportForm(formData);
      const hasErrors = Object.values(validationErrors).some(error => error !== undefined);
      
      if (hasErrors) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return false;
      }

      const result = await supportService.createSupportTicket(formData);
      
      if (result.success) {
        setIsSubmitting(false);
        return true;
      } else {
        setErrors({ submit: result.message || 'Failed to submit ticket' });
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
    submitTicket,
    clearForm
  };
};
