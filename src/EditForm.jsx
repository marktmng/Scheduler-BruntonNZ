import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { updateTask, deleteTask, postData } from './Api';
import './EditForm.css'; // Import your CSS file for styling


// Edit Form
function EditForm({ task, onUpdate, onDelete, onClose, onCreate }) {
  const [taskCode, setTaskCode] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  // Effect to pre-fill form fields when initialEvent changes
  useEffect(() => { 
    if (task) {
      setTaskCode(task.taskCode || '');
      setTitle(task.title || ''); // Set title from initialEvent or empty string
      setStart(new Date(task.start) || new Date());
      setEnd(new Date(task.end) || new Date());
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Convert dates to ISO format
  // const isoStartDate = start.toISOString();
  // const isoEndDate = end.toISOString();

    const updatedTask = {
      Task_code: taskCode,
      Title: title,
      StartDate: start,
      EndDate: end,
      // Description:task.Description,
      // Location:task.Location

      // StartDate: isoStartDate,
      // EndDate: isoEndDate

      // StartDate: start.toISOString(), // Convert to ISO format
      // EndDate: end.toISOString() // Convert to ISO format

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
      <button type="submit" onClick={handleSubmit}>Update Task</button>
      {/* {task && <button type="submit" onClick={handleSubmit}>Update Task</button>} */}
      {task && <button type="button" onClick={handleDelete}>Delete Task</button>}
    </form>
  );
}

export default EditForm;
