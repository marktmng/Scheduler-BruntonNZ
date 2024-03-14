import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import { updateTask, deleteTask, postData } from './Api';
import './EditForm.css'; // Import your CSS file for styling


// Edit Form
function EditForm({ task, onUpdate, onDelete, onClose, onCreate }) {
  const [taskCode, setTaskCode] = useState(task.Task_code || '');
  const [title, setTitle] = useState(task?.Title || '');
  const [start, setStart] = useState(new Date(task?.StartDate || Date.now())); // Ensure task.StartDate is a valid date string
  const [end, setEnd] = useState(new Date(task?.EndDate || Date.now())); // Ensure task.EndDate is a valid date string

  // Effect to pre-fill form fields when initialEvent changes
  useEffect(() => { 
    if (task) {
      setTaskCode(task.taskCode || '');
      setTitle(task.title || ''); // Set title from initialEvent or empty string
      setStart(new Date(task.start) || new Date()); // Set start date from initialEvent or current date
      setEnd(new Date(task.end) || new Date()); // Set end date from initialEvent or current date
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      Task_code: taskCode,
      Title: title,
      StartDate: start,
      EndDate: end
    };

    try {
      if (task) {
        await updateTask(task.taskCode, updatedTask);
        onUpdate();
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
    const dltTask = {
      Task_code: taskCode,
      Title: title,
      StartDate: start,
      EndDate: end
    };

    try {
      await deleteTask(task.taskCode, dltTask);
      onDelete();
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
      {task && <button type="button" onClick={handleDelete}>Delete Task</button>}
    </form>
  );
}

export default EditForm;
