import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EditForm from './EditForm';
import './Popup.css'

const localizer = momentLocalizer(moment);

function Scheduler({ events, fetchEventList }) {
  
  const [selectedTask, setSelectedTask] = useState(null);
  

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleCloseForm = () => {
    setSelectedTask(null);
  };

  return (
    <div className="scheduler-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        onSelectEvent={handleSelectTask}
      />
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
