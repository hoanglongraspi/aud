import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import type { PatientFormData } from '../types/patient';
import './NewPatientModal.css';

interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientData: PatientFormData) => void;
}

const NewPatientModal: React.FC<NewPatientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    age: 0,
    gender: 'Male',
    bloodGroup: '',
    phoneNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<PatientFormData>>({});

  const bloodGroups = ['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'];

  const validateForm = (): boolean => {
    const newErrors: Partial<PatientFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Patient name is required';
    }

    if (!formData.age || formData.age < 1 || formData.age > 150) {
      newErrors.age = 'Please enter a valid age (1-150)';
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        age: 0,
        gender: 'Male',
        bloodGroup: '',
        phoneNumber: '',
        email: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: keyof PatientFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content new-patient-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Patient</h2>
          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Patient Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'error' : ''}
                placeholder="Enter patient name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                id="age"
                type="number"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                className={errors.age ? 'error' : ''}
                placeholder="Enter age"
                min="1"
                max="150"
              />
              {errors.age && <span className="error-text">{errors.age}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value as 'Male' | 'Female')}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group *</label>
              <select
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                className={errors.bloodGroup ? 'error' : ''}
              >
                <option value="">Select blood group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.bloodGroup && <span className="error-text">{errors.bloodGroup}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'error' : ''}
                placeholder="+1 12345 67890"
              />
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="patient@example.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatientModal;