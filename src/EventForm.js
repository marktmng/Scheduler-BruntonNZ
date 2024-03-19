import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { postData } from './Api';
import { RRule, RRuleSet, rrulestr } from 'rrule';

function EventForm({ onClose, onCreate, initialEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [recEndDate, setRecEndDate] = useState(new Date()); // for recurrence date
  const [recurrence, setRecurrence] = useState(''); // implement repeatable
  const [dataForPost, setDataForPost] = useState(null);
  const [description, setDescription] = useState(''); // for description
  const [location, setLocation] = useState(''); // location

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setStart(new Date(initialEvent.start) || new Date());
      setEnd(new Date(initialEvent.end) || new Date());
      setRecEndDate(new Date(initialEvent.recEndDate) || new Date()); // for recurrence
      setRecurrence(initialEvent.recurrence || '');
      setDescription(initialEvent.description || ''); // description
      setLocation(initialEvent.location || ''); // location
    }
  }, [initialEvent]);

  const submitData = async (eventPost) => {
    try {
      await postData(eventPost);
      onCreate();
      setTitle('');
      setStart(new Date());
      setEnd(new Date());
      setRecEndDate(new Date()); // for recurrence
      setRecurrence('');
      setDescription(''); // description
      setLocation(''); // location
      setDataForPost(null);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventPost = {
      Title: title,
      StartDate: start,
      EndDate: end,
      Repeatable: recurrence,
      RecEndDate: recEndDate,
      Description: description,
      Location: location
    };
    setDataForPost(eventPost);
    // onClose(); // Close the form
  };

  useEffect(() => {
    if (dataForPost) {
      submitData(dataForPost);
    }
  }, [dataForPost]);
  

  const parseRecurrence = (ruleString) => {
    if (!ruleString || !ruleString.trim()) {
      // If the ruleString is empty or contains only whitespace, return early
      return;
    }
  
    try {
      // Parse recurrence rule string using rrulestr
      const rule = rrulestr(ruleString);
      // Get occurrences for the next few instances
      const occurrences = rule.between(new Date(), new Date(new Date().getTime() + 5 * 7 * 24 * 60 * 60 * 1000)); // Get occurrences for the next 5 weeks
      console.log(occurrences);
      // Handle occurrences
      // For example, you can display them or save them to state
      // For demonstration purposes, let's just log them
      occurrences.forEach((occurrence) => {
        console.log('Occurrence:', occurrence);
        // You can render each occurrence in your UI as needed
      });
    } catch (error) {
      console.error('Error parsing recurrence rule:', error);
      // Handle parsing error as needed
    }
  };
  
  

  useEffect(() => {
    parseRecurrence(recurrence);
  }, [recurrence]);

  return (
    <form className='edit-form' onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event" required />
      <DateTimePicker value={start} onChange={setStart} />
      <DateTimePicker value={end} onChange={setEnd} />
      {/* <input type="text" value={recurrence} onChange={(e) => setRecurrence(e.target.value)} placeholder="Recurrence rule" /> */}

      <br/>
      <select
          className="select-opt"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option disabled value="">Make Recurrence</option>
          <option value="">Make Recurrence</option>
          <option value="FREQ=DAILY">Daily</option>
          <option value="FREQ=WEEKLY">Weekly</option>
          <option value="FREQ=MONTHLY">Monthly</option>
          <option value="FREQ=YEARLY">Yearly</option>
          {/* Add more options as needed */}
        </select>
        <br/>
        <br/>
        <DateTimePicker value={recEndDate} onChange={setRecEndDate} />
        <br/>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location/Venue" required />
      <button className="add-btn" type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
