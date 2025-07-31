import React, { useState } from 'react';
import { MdArrowBack, MdAdd, MdEdit, MdChevronRight } from 'react-icons/md';
import type { Patient } from '../types/patient';
import './PatientInfo.css';

interface PatientInfoProps {
  patient: Patient;
  onBack: () => void;
}

interface MedicalQuestion {
  id: string;
  question: string;
  checked: boolean;
}

interface Report {
  id: string;
  name: string;
  date: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  issue: string;
  status: 'upcoming' | 'past';
  hasDocuments?: boolean;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedDate, setSelectedDate] = useState('May 23');
  
  // Mock data - replace with real data from your backend
  const [medicalQuestions, setMedicalQuestions] = useState<MedicalQuestion[]>([
    {
      id: '1',
      question: 'Have you ever had a stroke or TIA (mini-stroke)?',
      checked: true
    },
    {
      id: '2',
      question: 'Do you have high blood pressure, high cholesterol, or diabetes?',
      checked: false
    }
  ]);

  const [reports] = useState<Report[]>([
    { id: '1', name: 'Head Impulse Test 1', date: 'Jan 19, 2025' },
    { id: '2', name: 'Head Impulse Test 2', date: 'Jan 19, 2025' },
    { id: '3', name: 'Head Impulse Test 2', date: 'Jan 19, 2025' }
  ]);

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: 'Fri 16',
      time: '09:00am - 09:30am',
      doctor: 'Stephine Claire',
      issue: 'Fever',
      status: 'upcoming',
      hasDocuments: true
    },
    {
      id: '2',
      date: 'Mon 19',
      time: '09:00am - 09:30am',
      doctor: 'Stephine Claire',
      issue: 'Fever',
      status: 'upcoming'
    }
  ]);

  const handleQuestionChange = (questionId: string) => {
    setMedicalQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, checked: !q.checked } : q
      )
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'all') return true;
    return appointment.status === activeTab;
  });

  const getAvatarColor = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="patient-info-container">
      <div className="patient-info-header">
        <button className="back-btn" onClick={onBack}>
          <MdArrowBack />
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">Patient</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{patient.name}</span>
        </div>
      </div>

      <h1 className="page-title">Patient Information</h1>

      <div className="patient-info-content">
        <div className="patient-info-left">
          {/* Patient Details Card */}
          <div className="patient-details-card">
            <div className="patient-avatar-section">
              <div 
                className="patient-avatar-large"
                style={{ backgroundColor: getAvatarColor(patient.name) }}
              >
                {patient.avatar}
              </div>
            </div>
            
            <div className="patient-details">
              <div className="detail-item">
                <span className="detail-label">Patient Name:</span>
                <span className="detail-value">{patient.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{patient.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{patient.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number:</span>
                <span className="detail-value">{patient.phoneNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{patient.email}</span>
              </div>
            </div>
          </div>

          {/* Medical Questionnaire */}
          <div className="medical-questionnaire-card">
            <h3>Medical questionnaire</h3>
            <div className="questions-list">
              {medicalQuestions.map((question, index) => (
                <div key={question.id} className="question-item">
                  <div className="question-number">{index + 1}.</div>
                  <div className="question-content">
                    <p className="question-text">{question.question}</p>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={question.checked}
                        onChange={() => handleQuestionChange(question.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="patient-info-right">
          {/* Reports Section */}
          <div className="reports-card">
            <div className="reports-header">
              <h3>Reports</h3>
              <button className="add-report-btn">
                <MdAdd />
                Add report
              </button>
            </div>
            <div className="reports-list">
              {reports.map((report) => (
                <div key={report.id} className="report-item">
                  <div className="report-info">
                    <span className="report-name">{report.name}</span>
                    <span className="report-date">{report.date}</span>
                  </div>
                  <MdChevronRight className="report-arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* Appointments Section */}
          <div className="appointments-card">
            <h3>Appointment</h3>
            
            <div className="appointment-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past
              </button>
              
              <div className="date-selector">
                <select 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-select"
                >
                  <option value="May 23">May 23</option>
                  <option value="May 24">May 24</option>
                  <option value="May 25">May 25</option>
                </select>
              </div>
            </div>

            <div className="appointments-list">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-date">
                    <div className="date-text">{appointment.date}</div>
                  </div>
                  <div className="appointment-details">
                    <div className="appointment-time">{appointment.time}</div>
                    <div className="appointment-doctor">{appointment.doctor}</div>
                    <div className="appointment-issue">Issue: {appointment.issue}</div>
                    {appointment.hasDocuments && (
                      <button className="view-documents-btn">View Documents</button>
                    )}
                  </div>
                  <div className="appointment-actions">
                    <button className="edit-btn">
                      <MdEdit />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;