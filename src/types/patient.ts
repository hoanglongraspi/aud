// Patient type definitions for AudioSight application

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientFormData {
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  phoneNumber: string;
  email: string;
}