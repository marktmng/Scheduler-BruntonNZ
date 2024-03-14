import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { updateTask, deleteTask, postData } from './Api';
import './EditForm.css'; // Import your CSS file for styling
import { RRule, RRuleSet, rrulestr } from 'rrule';


// Edit Form
function EditForm({ task, onUpdate, onDelete, onClose, onCreate }) {
  const [taskCode, setTaskCode] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [recurrence, setRecurrence] = useState(''); // implement repeatable

  // Effect to pre-fill form fields when initialEvent changes
  useEffect(() => { 
    if (task) {
      setTaskCode(task.taskCode || '');
      setTitle(task.title || ''); // Set title from initialEvent or empty string
      setStart(new Date(task.start) || new Date());
      setEnd(new Date(task.end) || new Date());
      setRecurrence(task.recurrence || ''); // implement repeatable
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      Task_code: taskCode,
      Title: title,
      StartDate: start,
      EndDate: end,
      Repeatable: recurrence
    };

    try {
      if (task) {
        await updateTask(task.Task_code, updatedTask);
        onUpdate(task);
      } else {
        // Otherwise, it's an add operation
        await postData(updatedTask); // Call API to create a new event
        onCreate(); // Refresh event list
      }
      onClose(); // Close the form
    } catch (error) {
      console.error('Error updating/adding task:', error);
    }

    // Clear the form fields
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
  };


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


    const handleDelete = async () => {  
    try {
      await deleteTask(task.Task_code); // Assuming deleteTask only needs taskCode
      onDelete(task); // Passing the whole task object for removal
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <form 
    className='edit-form'
    onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event" required />
      <DateTimePicker value={start} onChange={setStart} />
      <DateTimePicker value={end} onChange={setEnd} />

      <br />
      <select
      className="select-opt"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value="">Make Recurrence</option>
          <option value="FREQ=DAILY">Daily</option>
          <option value="FREQ=WEEKLY">Weekly</option>
          <option value="FREQ=MONTHLY">Monthly</option>
          <option value="FREQ=YEARLY">Yearly</option>
          {/* Add more options as needed */}
        </select>
        <br />
        <br />

      <button className='update-btn' type="submit" onClick={handleSubmit}>Save Changes</button>
      {/* {task && <button type="submit" onClick={handleSubmit}>Update Task</button>} */}
      {task && <button className='delete-btn' type="button" onClick={handleDelete}>Delete</button>}
    </form>
  );
}

export default EditForm;
