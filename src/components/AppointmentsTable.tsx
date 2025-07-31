import React from 'react';
import { MdOpenInNew, MdExpandLess } from 'react-icons/md';
import './AppointmentsTable.css';

interface Appointment {
  id: number;
  time: string;
  date: string;
  patientName: string;
  doctor: string;
  avatarColor: string;
}

const AppointmentsTable: React.FC = () => {
  const appointments: Appointment[] = [
    { id: 1, time: '9:30 AM', date: '05/12/2022', patientName: 'Elizabeth Polson', doctor: 'Dr. John', avatarColor: '#8B4513' },
    { id: 2, time: '9:30 AM', date: '05/12/2022', patientName: 'John David', doctor: 'Dr. Joel', avatarColor: '#4682B4' },
    { id: 3, time: '10:30 AM', date: '05/12/2022', patientName: 'Krishtav Rajan', doctor: 'Dr. Joel', avatarColor: '#4169E1' },
    { id: 4, time: '11:00 AM', date: '05/12/2022', patientName: 'Sumanth Tinson', doctor: 'Dr. John', avatarColor: '#32CD32' },
    { id: 5, time: '11:30 AM', date: '05/12/2022', patientName: 'EG Subramani', doctor: 'Dr. John', avatarColor: '#2F4F4F' },
  ];

  return (
    <div className="appointments-widget">
      <div className="widget-header">
        <h2 className="widget-title">Latest Appointments</h2>
        <button className="expand-btn">
          <MdOpenInNew />
        </button>
      </div>
      
      <div className="appointments-content">
        <div className="appointments-header">
          <div className="header-time">
            Time <MdExpandLess className="sort-icon" />
          </div>
          <div className="header-date">
            Date <MdExpandLess className="sort-icon" />
          </div>
          <div className="header-patient">
            Patient Name <MdExpandLess className="sort-icon" />
          </div>
          <div className="header-doctor">
            Doctor <MdExpandLess className="sort-icon" />
          </div>
        </div>
        
        <div className="appointments-body">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-row">
              <div className="appointment-time">{appointment.time}</div>
              <div className="appointment-date">{appointment.date}</div>
              <div className="appointment-patient">
                <div className="patient-info">
                  <div 
                    className="patient-avatar"
                    style={{ backgroundColor: appointment.avatarColor }}
                  >
                    <span className="avatar-initials">
                      {appointment.patientName.split(' ').map(name => name.charAt(0)).join('')}
                    </span>
                  </div>
                  <span className="patient-name">{appointment.patientName}</span>
                </div>
              </div>
              <div className="appointment-doctor">{appointment.doctor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;