const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Adjust CORS configuration here
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allow requests
}));

// Define your routes here
// Example route to handle POST requests
app.post('v1/task', (req, res) => {
  // Assuming the request body contains data for the new task
  const newTask = req.body;
  // Process the data and send a response
  console.log('Received new task:', newTask);
});

// Route to handle PUT requests for updating an existing task
app.put('/v1/task/taskUpd', (req, res) => {
  const Task_code = req.params.task_code;
  // Assuming the request body contains updated data for the task
  const updatedTaskData = req.body;
  // Process the data and send a response
  console.log(`Received update request for task ${Task_code}:`, updatedTaskData);
});

// Route to handle DELETE requests for deleting a task
app.delete('/v1/task/taskDel/:task_code', (req, res) => {
  const Task_code = req.params.task_code;
  // Process the delete request
  console.log(`Received delete request for task ${Task_code}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
