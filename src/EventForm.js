import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { postData } from './Api';
import { RRule, RRuleSet, rrulestr } from 'rrule';

function EventForm({ onCreate, initialEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [recurrence, setRecurrence] = useState(''); // implement repeatable
  const [dataForPost, setDataForPost] = useState(null);

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setStart(new Date(initialEvent.start) || new Date());
      setEnd(new Date(initialEvent.end) || new Date());
      setRecurrence(initialEvent.recurrence || '');
    }
  }, [initialEvent]);

  const submitData = async (eventPost) => {
    try {
      await postData(eventPost);
      onCreate();
      setTitle('');
      setStart(new Date());
      setEnd(new Date());
      setRecurrence('');
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
      Repeatable: recurrence
    };
    setDataForPost(eventPost);
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
          <option value="">Make Recurrence</option>
          <option value="FREQ=DAILY">Daily</option>
          <option value="FREQ=WEEKLY;BYDAY=MO">Weekly (Monday)</option>
          <option value="FREQ=WEEKLY;BYDAY=TU">Weekly (Tuesday)</option>
          <option value="FREQ=WEEKLY;BYDAY=WE">Weekly (Wednesday)</option>
          <option value="FREQ=WEEKLY;BYDAY=TH">Weekly (Thursday)</option>
          <option value="FREQ=WEEKLY;BYDAY=FR">Weekly (Friday)</option>
          <option value="FREQ=WEEKLY;BYDAY=SA">Weekly (Saturday)</option>
          <option value="FREQ=WEEKLY;BYDAY=SU">Weekly (Sunday)</option>

          <option value="FREQ=MONTHLY">Monthly</option>
          {/* Add more options as needed */}
        </select>
        <br/>
        <br/>
      <button className="add-btn" type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
