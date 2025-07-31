import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import moment from 'moment';
import { 
  MdChevronLeft, 
  MdChevronRight,
  MdCalendarToday,
  MdLocalOffer,
  MdPerson,
  MdAccessTime,
  MdStickyNote2,
  MdClose
} from 'react-icons/md';
import { 
  FaStethoscope, 
  FaAssistiveListeningSystems,
  FaCommentDots,
  FaClipboardCheck,
  FaCoffee
} from 'react-icons/fa';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';

const localizer = momentLocalizer(moment);

interface ScheduleEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: 'bppv-check' | 'hearing-test' | 'consultation' | 'follow-up' | 'break';
  patientName?: string;
  notes?: string;
  resource?: any;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 15)); // Start in July 2025 with data
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to create a date with time
  const createDateTime = (date: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  // (Removed unused addDuration function)

  // Sample BPPV and audiological appointment data for July & August 2025
  const events: ScheduleEvent[] = [
    {
      id: 1,
      title: 'BPPV Assessment - Sarah Johnson',
      start: createDateTime(new Date(2025, 6, 1), '09:00'),
      end: createDateTime(new Date(2025, 6, 1), '09:45'),
      type: 'bppv-check',
      patientName: 'Sarah Johnson',
      notes: 'Initial BPPV evaluation, Dix-Hallpike test'
    },
    {
      id: 2,
      title: 'Hearing Test - Michael Chen',
      start: createDateTime(new Date(2025, 6, 1), '10:00'),
      end: createDateTime(new Date(2025, 6, 1), '11:00'),
      type: 'hearing-test',
      patientName: 'Michael Chen',
      notes: 'Pure tone audiometry, speech testing'
    },
    {
      id: 3,
      title: 'BPPV Treatment - Emma Wilson',
      start: createDateTime(new Date(2025, 6, 2), '14:00'),
      end: createDateTime(new Date(2025, 6, 2), '14:30'),
      type: 'bppv-check',
      patientName: 'Emma Wilson',
      notes: 'Canalith repositioning procedure (Epley maneuver)'
    },
    {
      id: 4,
      title: 'Consultation - David Rodriguez',
      start: createDateTime(new Date(2025, 6, 3), '09:30'),
      end: createDateTime(new Date(2025, 6, 3), '10:30'),
      type: 'consultation',
      patientName: 'David Rodriguez',
      notes: 'Discuss hearing aid options'
    },
    {
      id: 5,
      title: 'BPPV Follow-up - Lisa Parker',
      start: createDateTime(new Date(2025, 6, 3), '11:00'),
      end: createDateTime(new Date(2025, 6, 3), '11:30'),
      type: 'follow-up',
      patientName: 'Lisa Parker',
      notes: 'Check progress after Epley maneuver treatment'
    },
    {
      id: 6,
      title: 'Hearing Test - Robert Taylor',
      start: createDateTime(new Date(2025, 6, 4), '15:30'),
      end: createDateTime(new Date(2025, 6, 4), '16:30'),
      type: 'hearing-test',
      patientName: 'Robert Taylor',
      notes: 'Comprehensive audiological evaluation'
    },
    {
      id: 7,
      title: 'BPPV Assessment - Jennifer Brown',
      start: createDateTime(new Date(2025, 6, 7), '08:30'),
      end: createDateTime(new Date(2025, 6, 7), '09:15'),
      type: 'bppv-check',
      patientName: 'Jennifer Brown',
      notes: 'Positional testing, balance assessment'
    },
    
    {
      id: 9,
      title: 'BPPV Treatment - Anthony Davis',
      start: createDateTime(new Date(2025, 6, 8), '14:00'),
      end: createDateTime(new Date(2025, 6, 8), '14:45'),
      type: 'bppv-check',
      patientName: 'Anthony Davis',
      notes: 'Semont maneuver for horizontal canal BPPV'
    },
    {
      id: 10,
      title: 'Hearing Aid Fitting - Margaret White',
      start: createDateTime(new Date(2025, 6, 9), '10:00'),
      end: createDateTime(new Date(2025, 6, 9), '11:00'),
      type: 'consultation',
      patientName: 'Margaret White',
      notes: 'Initial hearing aid fitting and orientation'
    },
    {
      id: 11,
      title: 'BPPV Check - James Anderson',
      start: createDateTime(new Date(2025, 6, 10), '11:30'),
      end: createDateTime(new Date(2025, 6, 10), '12:15'),
      type: 'bppv-check',
      patientName: 'James Anderson',
      notes: 'Post-treatment evaluation, symptom review'
    },
    {
      id: 12,
      title: 'Hearing Test - Maria Garcia',
      start: createDateTime(new Date(2025, 6, 11), '09:00'),
      end: createDateTime(new Date(2025, 6, 11), '10:00'),
      type: 'hearing-test',
      patientName: 'Maria Garcia',
      notes: 'Annual hearing screening'
    },
    {
      id: 13,
      title: 'BPPV Assessment - Kevin Miller',
      start: createDateTime(new Date(2025, 6, 14), '14:30'),
      end: createDateTime(new Date(2025, 6, 14), '15:15'),
      type: 'bppv-check',
      patientName: 'Kevin Miller',
      notes: 'Recurrent vertigo episodes, comprehensive assessment'
    },
    {
      id: 14,
      title: 'Follow-up - Sarah Johnson',
      start: createDateTime(new Date(2025, 6, 15), '10:30'),
      end: createDateTime(new Date(2025, 6, 15), '11:00'),
      type: 'follow-up',
      patientName: 'Sarah Johnson',
      notes: 'Two-week follow-up after BPPV treatment'
    },
    {
      id: 15,
      title: 'Hearing Test - Thomas Wilson',
      start: createDateTime(new Date(2025, 6, 16), '15:00'),
      end: createDateTime(new Date(2025, 6, 16), '16:00'),
      type: 'hearing-test',
      patientName: 'Thomas Wilson',
      notes: 'Pre-employment hearing screening'
    },
    {
      id: 16,
      title: 'BPPV Treatment - Nancy Martinez',
      start: createDateTime(new Date(2025, 6, 17), '09:30'),
      end: createDateTime(new Date(2025, 6, 17), '10:15'),
      type: 'bppv-check',
      patientName: 'Nancy Martinez',
      notes: 'Canalith repositioning, patient education'
    },
    {
      id: 17,
      title: 'Consultation - Charles Lee',
      start: createDateTime(new Date(2025, 6, 18), '11:00'),
      end: createDateTime(new Date(2025, 6, 18), '12:00'),
      type: 'consultation',
      patientName: 'Charles Lee',
      notes: 'Tinnitus management consultation'
    },
    {
      id: 18,
      title: 'BPPV Follow-up - Emma Wilson',
      start: createDateTime(new Date(2025, 6, 21), '14:00'),
      end: createDateTime(new Date(2025, 6, 21), '14:30'),
      type: 'follow-up',
      patientName: 'Emma Wilson',
      notes: 'One-week post-treatment check'
    },
    {
      id: 19,
      title: 'Hearing Test - Patricia Thompson',
      start: createDateTime(new Date(2025, 6, 22), '10:00'),
      end: createDateTime(new Date(2025, 6, 22), '11:00'),
      type: 'hearing-test',
      patientName: 'Patricia Thompson',
      notes: 'Baseline hearing assessment'
    },
    {
      id: 20,
      title: 'BPPV Assessment - Daniel Clark',
      start: createDateTime(new Date(2025, 6, 23), '15:30'),
      end: createDateTime(new Date(2025, 6, 23), '16:15'),
      type: 'bppv-check',
      patientName: 'Daniel Clark',
      notes: 'New patient BPPV evaluation'
    },
    {
      id: 21,
      title: 'BPPV Treatment - Jennifer Brown',
      start: createDateTime(new Date(2025, 6, 24), '09:00'),
      end: createDateTime(new Date(2025, 6, 24), '09:45'),
      type: 'bppv-check',
      patientName: 'Jennifer Brown',
      notes: 'Second treatment session, Modified Epley'
    },
    {
      id: 22,
      title: 'Hearing Aid Check - Margaret White',
      start: createDateTime(new Date(2025, 6, 25), '14:30'),
      end: createDateTime(new Date(2025, 6, 25), '15:15'),
      type: 'follow-up',
      patientName: 'Margaret White',
      notes: 'Hearing aid adjustment and cleaning'
    },
    {
      id: 23,
      title: 'BPPV Group Education',
      start: createDateTime(new Date(2025, 6, 28), '11:00'),
      end: createDateTime(new Date(2025, 6, 28), '12:00'),
      type: 'consultation',
      notes: 'Group session on BPPV prevention and home exercises'
    },
    {
      id: 24,
      title: 'Hearing Test - George Harris',
      start: createDateTime(new Date(2025, 6, 29), '10:30'),
      end: createDateTime(new Date(2025, 6, 29), '11:30'),
      type: 'hearing-test',
      patientName: 'George Harris',
      notes: 'Comprehensive evaluation with tympanometry'
    },
    {
      id: 25,
      title: 'BPPV Check - Anthony Davis',
      start: createDateTime(new Date(2025, 6, 30), '09:30'),
      end: createDateTime(new Date(2025, 6, 30), '10:00'),
      type: 'follow-up',
      patientName: 'Anthony Davis',
      notes: 'Final follow-up, discharge planning'
    },
    
    // August 2025 Events
    {
      id: 26,
      title: 'BPPV Assessment - Rachel Green',
      start: createDateTime(new Date(2025, 7, 1), '09:00'),
      end: createDateTime(new Date(2025, 7, 1), '09:45'),
      type: 'bppv-check',
      patientName: 'Rachel Green',
      notes: 'Initial BPPV evaluation, comprehensive vestibular testing'
    },
    {
      id: 27,
      title: 'Hearing Test - Mark Stevens',
      start: createDateTime(new Date(2025, 7, 2), '10:30'),
      end: createDateTime(new Date(2025, 7, 2), '11:30'),
      type: 'hearing-test',
      patientName: 'Mark Stevens',
      notes: 'Annual hearing check, tympanometry included'
    },
    {
      id: 28,
      title: 'BPPV Treatment - Linda Carter',
      start: createDateTime(new Date(2025, 7, 5), '14:00'),
      end: createDateTime(new Date(2025, 7, 5), '14:30'),
      type: 'bppv-check',
      patientName: 'Linda Carter',
      notes: 'Epley maneuver for posterior canal BPPV'
    },
    {
      id: 29,
      title: 'Consultation - Paul Mitchell',
      start: createDateTime(new Date(2025, 7, 6), '11:00'),
      end: createDateTime(new Date(2025, 7, 6), '12:00'),
      type: 'consultation',
      patientName: 'Paul Mitchell',
      notes: 'Hearing aid consultation and fitting'
    },
    {
      id: 30,
      title: 'BPPV Follow-up - Rachel Green',
      start: createDateTime(new Date(2025, 7, 7), '09:30'),
      end: createDateTime(new Date(2025, 7, 7), '10:00'),
      type: 'follow-up',
      patientName: 'Rachel Green',
      notes: 'One-week post-treatment evaluation'
    },
    {
      id: 31,
      title: 'Hearing Test - Susan Adams',
      start: createDateTime(new Date(2025, 7, 8), '15:00'),
      end: createDateTime(new Date(2025, 7, 8), '16:00'),
      type: 'hearing-test',
      patientName: 'Susan Adams',
      notes: 'Comprehensive audiological assessment'
    },
    {
      id: 32,
      title: 'BPPV Assessment - Frank Williams',
      start: createDateTime(new Date(2025, 7, 11), '10:00'),
      end: createDateTime(new Date(2025, 7, 11), '10:45'),
      type: 'bppv-check',
      patientName: 'Frank Williams',
      notes: 'Recurrent vertigo, detailed positional testing'
    },
    {
      id: 33,
      title: 'Lunch Break',
      start: createDateTime(new Date(2025, 7, 12), '12:00'),
      end: createDateTime(new Date(2025, 7, 12), '13:00'),
      type: 'break',
      notes: 'Staff lunch break'
    },
    {
      id: 34,
      title: 'BPPV Treatment - Carol Johnson',
      start: createDateTime(new Date(2025, 7, 13), '14:30'),
      end: createDateTime(new Date(2025, 7, 13), '15:15'),
      type: 'bppv-check',
      patientName: 'Carol Johnson',
      notes: 'Semont maneuver, patient education on home exercises'
    },
    {
      id: 35,
      title: 'Hearing Aid Check - Paul Mitchell',
      start: createDateTime(new Date(2025, 7, 14), '10:30'),
      end: createDateTime(new Date(2025, 7, 14), '11:15'),
      type: 'follow-up',
      patientName: 'Paul Mitchell',
      notes: 'Hearing aid adjustment and maintenance'
    },
    {
      id: 36,
      title: 'BPPV Assessment - Diana Ross',
      start: createDateTime(new Date(2025, 7, 15), '09:00'),
      end: createDateTime(new Date(2025, 7, 15), '09:45'),
      type: 'bppv-check',
      patientName: 'Diana Ross',
      notes: 'New patient evaluation, Dix-Hallpike test'
    },
    {
      id: 37,
      title: 'Consultation - Brian Kelly',
      start: createDateTime(new Date(2025, 7, 18), '11:30'),
      end: createDateTime(new Date(2025, 7, 18), '12:30'),
      type: 'consultation',
      patientName: 'Brian Kelly',
      notes: 'Tinnitus management and therapy options'
    },
    {
      id: 38,
      title: 'Hearing Test - Amanda Clark',
      start: createDateTime(new Date(2025, 7, 19), '14:00'),
      end: createDateTime(new Date(2025, 7, 19), '15:00'),
      type: 'hearing-test',
      patientName: 'Amanda Clark',
      notes: 'Pre-surgical hearing evaluation'
    },
    {
      id: 39,
      title: 'BPPV Treatment - Frank Williams',
      start: createDateTime(new Date(2025, 7, 20), '10:30'),
      end: createDateTime(new Date(2025, 7, 20), '11:15'),
      type: 'bppv-check',
      patientName: 'Frank Williams',
      notes: 'Second treatment session, Modified Epley maneuver'
    },
    {
      id: 40,
      title: 'BPPV Follow-up - Linda Carter',
      start: createDateTime(new Date(2025, 7, 21), '09:15'),
      end: createDateTime(new Date(2025, 7, 21), '09:45'),
      type: 'follow-up',
      patientName: 'Linda Carter',
      notes: 'Two-week follow-up, symptom assessment'
    },
    {
      id: 41,
      title: 'Group BPPV Education Session',
      start: createDateTime(new Date(2025, 7, 22), '15:00'),
      end: createDateTime(new Date(2025, 7, 22), '16:00'),
      type: 'consultation',
      notes: 'Educational session on BPPV prevention and exercises'
    },
    {
      id: 42,
      title: 'Hearing Test - Robert Turner',
      start: createDateTime(new Date(2025, 7, 25), '10:00'),
      end: createDateTime(new Date(2025, 7, 25), '11:00'),
      type: 'hearing-test',
      patientName: 'Robert Turner',
      notes: 'Industrial hearing screening'
    },
    {
      id: 43,
      title: 'BPPV Assessment - Helen Wright',
      start: createDateTime(new Date(2025, 7, 26), '14:30'),
      end: createDateTime(new Date(2025, 7, 26), '15:15'),
      type: 'bppv-check',
      patientName: 'Helen Wright',
      notes: 'Elderly patient, gentle assessment approach'
    },
    {
      id: 44,
      title: 'BPPV Follow-up - Carol Johnson',
      start: createDateTime(new Date(2025, 7, 27), '11:00'),
      end: createDateTime(new Date(2025, 7, 27), '11:30'),
      type: 'follow-up',
      patientName: 'Carol Johnson',
      notes: 'Final check, home exercise review'
    },
    {
      id: 45,
      title: 'Consultation - Sandra Lopez',
      start: createDateTime(new Date(2025, 7, 28), '09:30'),
      end: createDateTime(new Date(2025, 7, 28), '10:30'),
      type: 'consultation',
      patientName: 'Sandra Lopez',
      notes: 'Balance disorder consultation'
    },
    {
      id: 46,
      title: 'BPPV Treatment - Diana Ross',
      start: createDateTime(new Date(2025, 7, 29), '14:00'),
      end: createDateTime(new Date(2025, 7, 29), '14:45'),
      type: 'bppv-check',
      patientName: 'Diana Ross',
      notes: 'First treatment session, Epley maneuver'
    },
    {
      id: 47,
      title: 'Hearing Aid Fitting - Jessica Brown',
      start: createDateTime(new Date(2025, 7, 30), '10:30'),
      end: createDateTime(new Date(2025, 7, 30), '11:30'),
      type: 'consultation',
      patientName: 'Jessica Brown',
      notes: 'Initial hearing aid fitting and orientation'
    }
  ];

  // Custom toolbar component
  const CustomToolbar = ({ date, view, onNavigate, onView }: any) => {
    const navigate = (action: string) => {
      onNavigate(action);
    };

    const getTitle = () => {
      if (view === 'month') {
        return moment(date).format('MMMM YYYY');
      } else if (view === 'week') {
        const start = moment(date).startOf('week');
        const end = moment(date).endOf('week');
        return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
      } else if (view === 'day') {
        return moment(date).format('dddd, MMMM D, YYYY');
      }
      return '';
  };

  return (
      <div className="schedule-header">
        <div className="schedule-title-section">
          <button className="nav-btn" onClick={() => navigate('PREV')}>
            <MdChevronLeft />
          </button>
          <h1 className="schedule-title">{getTitle()}</h1>
          <button className="nav-btn" onClick={() => navigate('NEXT')}>
            <MdChevronRight />
          </button>
        </div>
        
        <div className="view-toggle">
          {['month', 'week', 'day'].map((viewName) => (
            <button
              key={viewName}
              className={`toggle-btn ${view === viewName ? 'active' : ''}`}
              onClick={() => onView(viewName)}
            >
              {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Event style function
  const eventStyleGetter = (event: ScheduleEvent) => {
    let backgroundColor = '#3174ad';
    
    switch (event.type) {
      case 'bppv-check':
        backgroundColor = '#e91e63'; // Pink for BPPV checks
        break;
      case 'hearing-test':
        backgroundColor = '#ff9500'; // Orange for hearing tests
        break;
      case 'consultation':
        backgroundColor = '#4caf50'; // Green for consultations
        break;
      case 'follow-up':
        backgroundColor = '#9c27b0'; // Purple for follow-ups
        break;
      case 'break':
        backgroundColor = '#607d8b'; // Blue-grey for breaks
        break;
      default:
        backgroundColor = '#3174ad';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.85,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
      }
    };
  };

  // Handle event selection
  const handleSelectEvent = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    console.log('Selected event:', event);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Get appointment type display name
  const getAppointmentTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'bppv-check': 'BPPV Assessment/Treatment',
      'hearing-test': 'Hearing Test',
      'consultation': 'Consultation',
      'follow-up': 'Follow-up Appointment',
      'break': 'Break'
    };
    return typeMap[type] || type;
  };

  // Get appointment type icon component
  const getAppointmentTypeIcon = (type: string) => {
    const iconProps = { size: 20 };
    
    switch (type) {
      case 'bppv-check':
        return <FaStethoscope {...iconProps} />;
      case 'hearing-test':
        return <FaAssistiveListeningSystems {...iconProps} />;
      case 'consultation':
        return <FaCommentDots {...iconProps} />;
      case 'follow-up':
        return <FaClipboardCheck {...iconProps} />;
      case 'break':
        return <FaCoffee {...iconProps} />;
      default:
        return <MdCalendarToday {...iconProps} />;
    }
  };

  // Handle slot selection (for creating new events)
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const slotInfo = `
New Appointment Slot
${moment(start).format('MMM D, YYYY - h:mm A')} - ${moment(end).format('h:mm A')}
Duration: ${moment(end).diff(moment(start), 'minutes')} minutes

Click OK to create a new appointment (feature coming soon!)
    `;
    
    alert(slotInfo);
    console.log('Selected slot:', { start, end });
  };

  return (
    <div className="schedule-container">
      <div className="big-calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 200px)' }}
          view={currentView}
          date={currentDate}
          onNavigate={setCurrentDate}
          onView={setCurrentView}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          components={{
            toolbar: CustomToolbar,
          }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          showMultiDayTimes
          step={15}
          timeslots={4}
          min={new Date(2025, 0, 1, 8, 0, 0)}
          max={new Date(2025, 0, 1, 20, 0, 0)}
          dayLayoutAlgorithm="no-overlap"
        />
        
        {/* Appointment Details Modal */}
        {isModalOpen && selectedEvent && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span className="appointment-icon">
                    {getAppointmentTypeIcon(selectedEvent.type)}
                  </span>
                  <h3>Appointment Details</h3>
                </div>
                <button className="modal-close-btn" onClick={closeModal}>
                  <MdClose size={24} />
                </button>
              </div>
              
              <div className="modal-content">
                <div className="appointment-info">
                  <div className="info-row">
                    <div className="info-label">
                      <MdCalendarToday size={16} />
                      Date & Time
                    </div>
                    <div className="info-value">
                      {moment(selectedEvent.start).format('dddd, MMMM D, YYYY')}
                      <br />
                      <span className="time-range">
                        {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-label">
                      <MdLocalOffer size={16} />
                      Type
                    </div>
                    <div className="info-value">
                      <span className={`appointment-type-badge ${selectedEvent.type}`}>
                        {getAppointmentTypeDisplay(selectedEvent.type)}
                      </span>
                    </div>
                  </div>
                  
                  {selectedEvent.patientName && (
                    <div className="info-row">
                      <div className="info-label">
                        <MdPerson size={16} />
                        Patient
                      </div>
                      <div className="info-value">{selectedEvent.patientName}</div>
                    </div>
                  )}
                  
                  <div className="info-row">
                    <div className="info-label">
                      <MdAccessTime size={16} />
                      Duration
                    </div>
                    <div className="info-value">
                      {moment(selectedEvent.end).diff(moment(selectedEvent.start), 'minutes')} minutes
                    </div>
                  </div>
                  
                  {selectedEvent.notes && (
                    <div className="info-row">
                      <div className="info-label">
                        <MdStickyNote2 size={16} />
                        Notes
                      </div>
                      <div className="info-value notes-value">{selectedEvent.notes}</div>
                    </div>
                  )}
        </div>
        
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="schedule-legend">
          <h4>Appointment Types:</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color bppv-check"></div>
              <span>BPPV Check</span>
            </div>
            <div className="legend-item">
              <div className="legend-color hearing-test"></div>
              <span>Hearing Test</span>
            </div>
            <div className="legend-item">
              <div className="legend-color consultation"></div>
              <span>Consultation</span>
            </div>
            <div className="legend-item">
              <div className="legend-color follow-up"></div>
              <span>Follow-up</span>
            </div>
            <div className="legend-item">
              <div className="legend-color break"></div>
              <span>Break</span>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;