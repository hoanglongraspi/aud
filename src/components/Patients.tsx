import React, { useState, useMemo } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdDelete, MdInfo, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import type { Patient, PatientFormData } from '../types/patient';
import NewPatientModal from './NewPatientModal';
import PatientInfo from './PatientInfo';
import './Patients.css';

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const itemsPerPage = 7;

  // Mock patient data - replace with real data from your backend
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Elizabeth Polson',
      age: 32,
      gender: 'Female',
      bloodGroup: 'B+ve',
      phoneNumber: '+1 12345 67890',
      email: 'elizabethpolson@hotmail.com',
      avatar: 'EP',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'John David',
      age: 28,
      gender: 'Male',
      bloodGroup: 'B+ve',
      phoneNumber: '+1 12345 67890',
      email: 'davidjohn22@email.com',
      avatar: 'JD',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Krishnav Rajan',
      age: 24,
      gender: 'Male',
      bloodGroup: 'AB-ve',
      phoneNumber: '+1 12345 67890',
      email: 'krishnavrajan3@email.com',
      avatar: 'KR',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'Sumanth Tinson',
      age: 28,
      gender: 'Male',
      bloodGroup: 'O+ve',
      phoneNumber: '+1 12345 67890',
      email: 'tintintin@email.com',
      avatar: 'ST',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      name: 'EG Subramani',
      age: 77,
      gender: 'Male',
      bloodGroup: 'AB+ve',
      phoneNumber: '+1 12345 67890',
      email: 'egsl322@email.com',
      avatar: 'ES',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      name: 'Ranjan Moari',
      age: 77,
      gender: 'Male',
      bloodGroup: 'O+ve',
      phoneNumber: '+1 12345 67890',
      email: 'ranjanmaarij@yahoo.com',
      avatar: 'RM',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '7',
      name: 'Phillipe Gopal',
      age: 55,
      gender: 'Male',
      bloodGroup: 'O-ve',
      phoneNumber: '+1 12345 67890',
      email: 'gopal22@email.com',
      avatar: 'PG',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  // Filter and search patients
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      // Add date filtering logic here if needed
      return matchesSearch;
    });
  }, [patients, searchTerm, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeletePatient = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(prev => prev.filter(patient => patient.id !== patientId));
      // If we're on a page that becomes empty, go to previous page
      const remainingPatients = patients.filter(patient => patient.id !== patientId);
      const maxPage = Math.ceil(remainingPatients.length / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
    }
  };

  const handleViewPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
    }
  };

  const handlePatientNameClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
  };

  const handleAddPatient = (patientData: PatientFormData) => {
    const newPatient: Patient = {
      id: Date.now().toString(), // In real app, this would come from backend
      ...patientData,
      avatar: patientData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setPatients(prev => [...prev, newPatient]);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // If a patient is selected, show the PatientInfo component
  if (selectedPatient) {
    return (
      <PatientInfo 
        patient={selectedPatient} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="patients-container">
      <div className="patients-header">
        <h1 className="patients-title">Patient Details</h1>
        <button 
          className="new-patient-btn"
          onClick={() => setShowNewPatientModal(true)}
        >
          <MdAdd />
          New Patient
        </button>
      </div>

      <div className="patients-content">
        <div className="patients-info">
          <h2>Patient Info</h2>
        </div>

        <div className="patients-controls">
          <div className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <input
              type="date"
              placeholder="Filter by Date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="date-filter"
            />
            <MdFilterList className="filter-icon" />
          </div>
        </div>

        <div className="patients-table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>User Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="patient-name-cell">
                      <div 
                        className="patient-avatar"
                        style={{ backgroundColor: getAvatarColor(patient.name) }}
                      >
                        {patient.avatar}
                      </div>
                      <span 
                        className="patient-name clickable"
                        onClick={() => handlePatientNameClick(patient)}
                      >
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.phoneNumber}</td>
                  <td>{patient.email}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeletePatient(patient.id)}
                        title="Delete Patient"
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="action-btn info-btn"
                        onClick={() => handleViewPatient(patient.id)}
                        title="View Patient Info"
                      >
                        <MdInfo />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <NewPatientModal
        isOpen={showNewPatientModal}
        onClose={() => setShowNewPatientModal(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default Patients;