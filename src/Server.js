const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Adjust CORS configuration here
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests only from this origin
}));

// Define your routes here
// Example route to handle POST requests
app.post('v1/task', (req, res) => {
  // Assuming the request body contains data for the new task
  const newTask = req.body;
  // Process the data and send a response
  console.log('Received new task:', newTask);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
