import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Resizable } from 'react-resizable'; // Import Resizable from react-resizable
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; // Import withDragAndDrop HOC
import EditForm from './EditForm';
import './Popup.css'
import './EditForm.css'
import EventForm from './EventForm';
import classNames from 'classnames';
// import { updateTask } from './Api';

const DragAndDropCalendar = withDragAndDrop(Calendar); // Wrap Calendar component with withDragAndDrop HOC

const localizer = momentLocalizer(moment);

function Scheduler({ events, fetchEventList, onEventDropCallback , showData }) {
  
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

//  // just trying 1st attempt
  

//   // Handle event drop function
// const onEventDrop = (event) => {
//   const updatedEvent = {
//     ...event,
//     start: moment(event.start).toDate(), // Convert start date to Date object
//     end: moment(event.end).toDate(), // Convert end date to Date object
//   };

//   // Update the event in the events array
//   const updatedEvents = events.map((event) => {
//     if (event.Task_code === updatedEvent.Task_code) {
//       return updatedEvent; // Update the dropped event
//     }
//     return event;
//   });

//   // Update events state with the modified event data
//   setEvent(updatedEvents);

// };

// const onEventDrop = (event) => {
//   // Calculate the duration of the event
//   const duration = moment(event.end).diff(moment(event.start));

//   // Update the start and end dates of the event
//   const updatedEvent = {
//     ...event,
//     start: moment(event.start).toDate(), // Convert start date to Date object
//     end: moment(event.start).add(duration).toDate(), // Update end date based on duration
//   };

//   // Update the event in the events array
//   const updatedEvents = events.map((event) => {
//     if (event.Task_code === updatedEvent.Task_code) {
//       return updatedEvent; // Update the dropped event
//     }
//     return event;
//   });

//   // Update events state with the modified event data
//   onEventDropCallback(event);

//   // You may also want to make an API call to update the event dates in your backend data
// };


// // const onEventDrop = (event) => {
//   // Call the onEventDropCallback function provided by the parent component
//   onEventDropCallback(event);
//   // You may also want to make an API call to update the event dates in your backend data
// };


//  // Handle event drop function
//  // 2nd attept
//  const onEventDrop = async (events) => {
//   const updatedEvent = {
//     ...events,
//     start: moment(events.start).toDate(), // Convert start date to Date object
//     end: moment(events.end).toDate(), // Convert end date to Date object
//   };

//   try {
//     // Make API call to update event dates in backend
//     // Assuming you have an API function updateTask to update event dates
//     await updateTask(updatedEvent.Task_code, {
//       StartDate: updatedEvent.start,
//       EndDate: updatedEvent.end
//     });

//     // Call the onEventDropCallback function provided by the parent component
//     onEventDropCallback(updatedEvent);

//     // You may also want to update the events array in state here if needed
//   } catch (error) {
//     console.error('Error updating event:', error);
//   }
// };

// // Example of the onEventDropCallback function in the parent component
// const handleEventDrop = (updatedEvent) => {
//   // Find the index of the updated event in the events array
//   const index = events.findIndex(events => events.Task_code === updatedEvent.Task_code);
//   if (index !== -1) {
//     // Update the events array immutably
//     const updatedEvents = [...events];
//     updatedEvents[index] = updatedEvent;
//     setEvent(updatedEvents); // Update the events array in state
//   }
// };



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

// // define resizable event component
// const ResizableEvent = ({ event }) => (
//   <Resizable 
//   defaultSize={{width: 100, height: 100}} // initial size of the event
//   minWidth={50} // minimum width of the event
//   minHeight={50} // minimum height of the event
//   >
//     <div>
//       {event.title} {/* render event content */}
//     </div>
//   </Resizable>

// );

  return (
    <div className="scheduler-container">
      <DragAndDropCalendar
        localizer={localizer}
        // event={event}
        events={events} // this is the one showing on the calender
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        selectable={true}
        onSelectEvent={handleSelectTask}
        onSelectSlot={handleSelectSlot}
        // onEventDrop={onEventDrop} // Apply drag-and-drop functionality
        // handleEventDrop={handleEventDrop}

        // component ={{
        //   events: ResizableEvent, // use resizable event comp
        // }}

        eventPropGetter={(event, start, end, isSelected) => {
          // Add additional classes based on event properties
          return {
            className: classNames('event', {
              // 'high-priority': event.priority === 'high', // Apply 'high-priority' class for high-priority events
              // 'completed': event.status === 'completed', // Apply 'completed' class for completed events
            }),
          };
        }}
      />

      {/* component ={{
        event: Resizable, // use resizable event comp
      }} */}

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
