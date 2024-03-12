import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from './DateTimePicker';
import { postData, } from './Api';
// import { render } from '@testing-library/react';
// import App from './App';
import './EditForm.css'; // Import your CSS file for styling



// Event Form
function EventForm({ onCreate, initialEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [dataForPost,setDataForPost]=useState(null)
  const [recurrence, setRecurrence] = useState(null); // implementing recurrence
  // const [location, setLocation] = useState('');

  // Populate form fields with initial event data when it's provided
  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setStart(new Date(initialEvent.start) || new Date());
      setEnd(new Date(initialEvent.end) || new Date());
      setRecurrence(initialEvent.recurrence || '') // implementing recurrence
      // setLocation(initialEvent.location || ''); 
    }
  }, [initialEvent]);

  const submitData = async (eventPost) =>{
    console.log( 1111)
    try {
      // Call postData with the data object
      await postData(eventPost);
  
      // Call onCreate to update the events in the Scheduler component
      onCreate();
    
      console.log({onCreate})
      // Clear the form fields
      setTitle('');
      setStart(new Date());
      setEnd(new Date());
      setRecurrence(null); // implementing recurrence
      
      setDataForPost(null)
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error as needed
    }
  }

  // take data and post
  const handleSubmit = async(e) => {
    e.preventDefault();

    const eventPost = {
      Title: title,
      StartDate: start,
      EndDate: end,
      Repeatable: recurrence // implementing recurrence
    }
    setDataForPost(eventPost)
 
  };
  

  useEffect(()=>{
    if(dataForPost) {
      submitData(dataForPost)
    }
  },[dataForPost])
 

 

  return (
    <form 
    className='edit-form'
    onSubmit={handleSubmit}>
      <input type="text" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      placeholder="Event" required />

      <DateTimePicker value={start} onChange={setStart} />
      <DateTimePicker value={end} onChange={setEnd} />

      <input type="text" 
      value={recurrence} 
      onChange={(e) => setRecurrence(e.target.value)} 
      placeholder="Make Recurrence" />  {/* implementing recurrence
      
      {/* <input type="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required /> */}

      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
