import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { updateTask, deleteTask, postData, deleteRecTask, updateRecTask } from './Api';
import './EditForm.css'; // Import your CSS file for styling
import { RRule, RRuleSet, rrulestr } from 'rrule';


// Edit Form
function EditForm({ task, onUpdate, onDelete, onClose, onCreate }) {
  const [taskCode, setTaskCode] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [recEndDate, setRecEndDate] = useState(new Date()); // for recurrence date
  const [recurrence, setRecurrence] = useState(''); // implement repeatable
  const [description, setDescription] = useState(''); // for description
  const [location, setLocation] = useState(''); // location

  // Effect to pre-fill form fields when initialEvent changes
  useEffect(() => { 
    if (task) {
      setTaskCode(task.taskCode || '');
      setTitle(task.title || ''); // Set title from initialEvent or empty string
      setStart(new Date(task.start) || new Date());
      setEnd(new Date(task.end) || new Date());
      setRecEndDate(new Date(task.recEndDate) || new Date()); // for recurrence
      setRecurrence(task.recurrence || ''); // implement repeatable
      setDescription(task.description || ''); // description
      setLocation(task.location || ''); // location
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      Task_code: taskCode,
      Title: title,
      StartDate: start,
      EndDate: end,
      Repeatable: recurrence,
      RecEndDate: recEndDate,
      Description: description,
      Location: location
    };

    try {

      if (task) {
        if (task.recEndDate && recurrence) { // If the task has recurrence and a new recurrence is set
          await updateRecTask(task.Task_code, updatedTask);
        } else if (task.recEndDate && !recurrence) { // If the task has recurrence but recurrence is removed
          await updateTask(task.Task_code, updatedTask);
        } else if (!task.recEndDate && recurrence) { // If the task didn't have recurrence but a new recurrence is added
          await updateRecTask(task.Task_code, updatedTask);
        } else { // Otherwise, update the task without recurrence
          await updateTask(task.Task_code, updatedTask);
        }
        
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
    setRecEndDate(new Date());
    setDescription(''); // description
    setLocation(''); // location
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
      if (task.recEndDate && recurrence ) { //&& recurrence
        // If the task has recurrence, call the deleteRecTask function
        await deleteRecTask(task.Task_code);
      } else if (task.recEndDate && !recurrence) {
        // Otherwise, call the deleteTask function for tasks without recurrence
        await deleteTask(task.Task_code);
      }
      
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
      <input type="text" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      placeholder="Title" required 
      />

      <DateTimePicker value={start} onChange={setStart} />
      <DateTimePicker value={end} onChange={setEnd} />

      <br />
      <select
      className="select-opt"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option disabled value="">Make Recurrence</option>
          <option value="FREQ=DAILY">Daily</option>
          <option value="FREQ=WEEKLY">Weekly</option>
          <option value="FREQ=MONTHLY">Monthly</option>
          <option value="FREQ=YEARLY">Yearly</option>
          
        </select>
        <br/>
        <br/>
        <DateTimePicker value={recEndDate} onChange={setRecEndDate} />
        <br />
        <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description" // required 
          />

          <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Location/Venue" required 
          />


      <button className='update-btn' type="submit" onClick={handleSubmit}>Save Changes</button>
      {/* {task && <button type="submit" onClick={handleSubmit}>Update Task</button>} */}
      {task && <button className='delete-btn' type="button" onClick={handleDelete}>Delete</button>}
    </form>
  );
}

export default EditForm;
