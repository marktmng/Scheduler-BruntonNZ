import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { postData } from './Api';
import { render } from '@testing-library/react';
// import App from './App';


// Event Form
function EventForm({ onCreate, initialEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  // const [location, setLocation] = useState('');

  // Populate form fields with initial event data when it's provided
  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setStart(new Date(initialEvent.start) || new Date());
      setEnd(new Date(initialEvent.end) || new Date());
      // setLocation(initialEvent.location || '');
    }
  }, [initialEvent]);

  // take data and post
  const handleSubmit = async(e) => {
    e.preventDefault();

    const eventPost = {
      Title: title,
      StartDate: start,
      EndDate: end
    }
    
    try {
      // Call postData with the data object
      await postData(eventPost);
  
      // Call onCreate to update the events in the Scheduler component
      onCreate();
    
      // Clear the form fields
      setTitle('');
      setStart(new Date());
      setEnd(new Date());
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event" required />
      <DateTimePicker value={start} onChange={setStart} />
      <DateTimePicker value={end} onChange={setEnd} />
      {/* <input type="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required /> */}

      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
