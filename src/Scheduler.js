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
import { updateTask } from './Api';

const DragAndDropCalendar = withDragAndDrop(Calendar); // Wrap Calendar component with withDragAndDrop HOC

const localizer = momentLocalizer(moment);

function Scheduler({ events, fetchEventList, onEventDropCallback , dropEvent, fetchUserlist }) {
  
  const [selectedTask, setSelectedTask] = useState(null);
  const popupRef = useRef(null); // Created a reference to hid the popup element  

  const[event, setEvent] = useState([])
  const [showModal, setShowModal] = useState(false); // Modal visibality
  const [selectedDate, setSelectedDate] = useState(null);

  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [recEndDate, setRecEndDate] = useState(new Date()); // for recurrence date
  const [recurrence, setRecurrence] = useState(''); // implement repeatable
  // const [dataForPost, setDataForPost] = useState(null);
  const [description, setDescription] = useState(''); // for description
  const [location, setLocation] = useState(''); // location

  useEffect(() => {
    if (dropEvent) {
      setTitle(dropEvent.title || '');
      setStart(new Date(dropEvent.start) || new Date());
      setEnd(new Date(dropEvent.end) || new Date());
      setRecEndDate(new Date(dropEvent.recEndDate) || new Date()); // for recurrence
      setRecurrence(dropEvent.recurrence || '');
      setDescription(dropEvent.Description || ''); // description
      setLocation(dropEvent.Location || ''); // location
    }
  }, [dropEvent]);

  // const addNewEvent = () => {
  //   setEvent([...event, addNewEvent]) // setEvents is the setter function for events state
  // }

  useEffect(() => {
    fetchEventList();
    // fetchUserlist();
  }, []);
  
  

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true)
    setSelectedDate(slotInfo.start)
  }

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setTitle(task.title) // settin title
  };

  const handleCloseForm = () => {
    setSelectedTask(null);
    setShowModal(null)
  };

const onEventDrop = async ({event,   start, end }) => {
  console.log("Event object:",{ event,   start, end} ); //debugging
  
  const updatedEvent = {
    ...event,
    start,
    end,
  };

  try {    
    // Update event in the backend
    await updateTask(updatedEvent.Task_code, {
      Title: updatedEvent.title,
      StartDate: start,
      EndDate: end,
      Repeatable: updatedEvent.recurrence,
      RecEndDate: updatedEvent.recEndDate,
      Description: updatedEvent.description,
      Location: updatedEvent.location,
    });
    
    // Call the callback function provided by the parent component
    onEventDropCallback(updatedEvent);
    
    console.log('Event dropped:', updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
  }
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
        event={event}
        events={events} // this is the one showing on the calender
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        selectable={true}
        onSelectEvent={handleSelectTask}
        onSelectSlot={handleSelectSlot}
        onEventDrop={onEventDrop} // Apply drag-and-drop functionality
        fetchUserlist={fetchUserlist}
        eventPropGetter={() => {
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
