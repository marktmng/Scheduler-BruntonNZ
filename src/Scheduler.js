import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EditForm from './EditForm';
import './Popup.css'
import './EditForm.css'
import EventForm from './EventForm';
import classNames from 'classnames';


const localizer = momentLocalizer(moment);

function Scheduler({ events, fetchEventList, showData }) {
  
  const [selectedTask, setSelectedTask] = useState(null);
  const popupRef = useRef(null); // Created a reference to hid the popup element  

  const[event, setEvent] = useState([])
  const [showModal, setShowModal] = useState(false); // Modal visibality
  const [selectedDate, setSelectedDate] = useState(null);

  const addNewEvent = () => {
    setEvent([...event, addNewEvent]) // setEvents is the setter function for events state
  }

  useEffect(() => {
    fetchEventList();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true)
    setSelectedDate(slotInfo.start)
  }

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleCloseForm = () => {
    setSelectedTask(null);
    setShowModal(null)
  };

//Function to handle clicks outside the popup
const handlePopHide = (event) => {
  // check if the click occured outside the popup
  if (popupRef.current && popupRef.current.contains(event.target)) {
    setSelectedTask(null); // close the popup if clicked outside
  }
};

useEffect (() => {
  document.addEventListener('mousedown', handlePopHide);
  // Cleanup function to remove event listener when component unmounts
  return () => {
    document.removeEventListener('mousedown', handlePopHide);
  };
}, []); // Empty dependency array to ensure the effect only runs once on mount

  return (
    <div className="scheduler-container">
      <Calendar
        localizer={localizer}
        event={event}
        events={events} // this is the one showing on the calender
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        selectable={true}
        onSelectEvent={handleSelectTask}
        onSelectSlot={handleSelectSlot}

        eventPropGetter={(event, start, end, isSelected) => {
          // Add additional classes based on event properties
          return {
            className: classNames('event', {
              'high-priority': event.priority === 'high', // Apply 'high-priority' class for high-priority events
              'completed': event.status === 'completed', // Apply 'completed' class for completed events
            }),
          };
        }}

        
      />

{showModal && (
              <div className="popup-overlay">
              <div className="popup-inner">
                <EventForm 
                selectedDate={selectedDate}
                addNewEvent={addNewEvent}
                // fetchEventList={fetchEventList}
                onCreate={fetchEventList}
                 />
                
                <button 
                className="close-btn" 
                onClick={handleCloseForm}>
                  [ x ]
                  </button>
              </div>
            </div>
            )};
            
      <div className={`popup ${selectedTask ? 'show' : ''}`}>
        <div className="popup-inner">
          {selectedTask && (
            <EditForm
              task={selectedTask}
              onUpdate={fetchEventList}
              onDelete={fetchEventList}
              onClose={handleCloseForm}
            />
          )}
          <button className="close-btn" onClick={handleCloseForm}>[ x ]</button>
        </div>
      </div>
    </div>
  );
}

export default Scheduler;
