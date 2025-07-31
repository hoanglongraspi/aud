import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './Calendar.css';

const Calendar: React.FC = () => {
  // Initialize with current date
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  
  const viewMonth = viewDate.getMonth();
  const viewYear = viewDate.getFullYear();
  
  // Current date info
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') {
      newDate.setMonth(viewMonth - 1);
    } else {
      newDate.setMonth(viewMonth + 1);
    }
    setViewDate(newDate);
  };

  const days = [];
  
  // Add empty cells for days before the first day of the month
  // firstDayOfMonth: 0 = Sunday, 1 = Monday, etc.
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === todayDate && viewMonth === todayMonth && viewYear === todayYear;
    
    days.push(
      <div 
        key={day} 
        className={`calendar-day ${isToday ? 'today' : ''}`}
      >
        {day}
      </div>
    );
  }
  
  // Add remaining empty cells to complete the calendar grid (42 cells total = 6 weeks)
  const totalCells = 42; // 6 rows × 7 days
  const remainingCells = totalCells - (firstDayOfMonth + daysInMonth);
  for (let i = 1; i <= remainingCells; i++) {
    days.push(<div key={`next-${i}`} className="calendar-day empty next-month">{i}</div>);
  }

  // Generate upcoming appointment dates
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const formatAppointmentDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const upcomingAppointments = [
    { id: 1, title: 'Sit at clinic 1', time: '10:00am - 11:00am', date: formatAppointmentDate(tomorrow) },
    { id: 2, title: 'Sit at clinic 2', time: '10:00am - 11:00am', date: formatAppointmentDate(dayAfter) },
  ];

  const formatCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="nav-btn" onClick={() => navigateMonth('prev')}>
          <MdChevronLeft />
        </button>
        <h3>{monthNames[viewMonth]} {viewYear}</h3>
        <button className="nav-btn" onClick={() => navigateMonth('next')}>
          <MdChevronRight />
        </button>
      </div>
      
      <div className="calendar-grid">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
        {days}
      </div>

      <div className="current-date-section">
        <h4 className="current-date-title">{formatCurrentDate()}</h4>
        <div className="today-label">Today</div>
      </div>

      <div className="upcoming-appointments">
        {upcomingAppointments.map(appointment => (
          <div key={appointment.id} className="appointment-item">
            <div className="appointment-left">
              <div className="appointment-title">{appointment.title}</div>
              <div className="appointment-time">{appointment.time}</div>
            </div>
            <div className="appointment-date">{appointment.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;