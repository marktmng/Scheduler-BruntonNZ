// import React, { useState, useEffect } from 'react';
// import EventForm from './EventForm';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { fetchData } from './Api';
import './Style.css';

const localizer = momentLocalizer(moment);

function Scheduler(props) {
  const {events , fetchEventList}=props 

  // const handleCreateEvent =   ( ) => {  
  //   fetchEventList() 
  // };

  return (
    <div className="scheduler-container">
      {/* <h2>My Scheduler</h2> */}
      {/* Pass handleCreateEvent to EventForm to add new events */}
      {/* <EventForm onCreate={handleCreateEvent} /> */}

      {/* Render the calendar with events */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start" // Property name for event start date
        endAccessor="end" // Property name for event end date
        style={{ height: '90vh' }}
        
      />
    </div>
  );
}

export default Scheduler;
