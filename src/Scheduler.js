import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchData } from './Api';
import './Style.css';

const localizer = momentLocalizer(moment);

function Scheduler() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Any additional logic you need when events change
  }, [events]);

  // fetch data from the backend
  const fetchTaskList = async () => {
    console.log("fetch task list")
    
    const response = await fetchData()

    // fromd backend and converted it
    const events = Object.keys(response)
      .map(key => response[key])
      .map(event => {
        const { Title, StartDate, EndDate } = event //Id
        const title = Title;
        const [start, end] = [StartDate, EndDate]
          .map(date => {
            // return new Date() // fake date

            const result =  moment.utc(date).toDate() // 'DD.MM.YYYY HH:mm'
            console.log("Response from backend:", response) // Log the response object
            
            console.log({result})
            return result
            //   .format('YYYY-MM-DD')
          })

        // const id = Id
        return { title, start, end } //id

      })
    setEvents(events) // to set(events) to calender
  }

  useEffect(() => {
    fetchTaskList()
  }, [])

  const handleCreateEvent = ( ) => { 
    fetchTaskList()
  };

  console.log({ events })
  return (
    <div className="scheduler-container">
      <h2>My Scheduler</h2>
      {/* Pass handleCreateEvent to EventForm to add new events */}
      <EventForm onCreate={handleCreateEvent} />
      {/* Render the calendar with events */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start" // Property name for event start date
        endAccessor="end" // Property name for event end date
        style={{ height: '80vh' }}
        
      />
    </div>
  );
}

export default Scheduler;
