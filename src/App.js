/* App.js */
import React, { useState, useEffect } from 'react';
import { Menu, Modal } from "antd";
import Scheduler from './Scheduler';
import EventForm from './EventForm'; // Import EventForm component
// import { fetchSomeData } from './apiService'; // Import your API functions
import './App.css';
import './Style.css';


// API endpoint to fetch events data
// const API_URL = "http://localhost:8080"; //http://localhost:8080/tasks

// sample data

const sampleEventData = [
  {
    "title":"Task 1",
    "start_date":"Task 2",
    "end_date":"Task 3"
}
]

function App() {
  // State variables
  const [selectMenu, setSelectMenu] = useState(null); // Selected menu item
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [modalContent, setModalContent] = useState(null); // Content for modal
  const [events, setEvents] = useState([]); // State to store events


// Function to fetch data from the API
// const fetchData = async () => {
//   try {
//     const response = await fetch(API_URL); // in console the error is this line and 
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const data = await response.json();
//     setEvents(data.length > 0 ? data : sampleEventData); // Use fetched data if available, otherwise fallback to sample data
//   } catch (error) {
//     console.error('Error fetching data:', error); // in this line
//   }
// };



  // Fetch data from API when the component mounts
  // useEffect(() => {
  //   fetchData();
  // }, []);


  // Handle click on menu items
  const handleMenuClick = (event) => {
    setSelectMenu(event.key);
    setIsModalVisible(true); // Show modal when menu item is clicked

    // Set modal content based on selected menu item
    switch(event.key) {
      case "tasks":
        setModalContent("Tasks");
        break;
      case "events":
        setModalContent("Events");
        break;
      case "appointments":
        setModalContent("Appointments");
        break;
      default:
        setModalContent(null);
        break;
    }
  }

  // Handle modal close event
  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  // Handle event creation
  const handleCreateEvent = (eventData) => {
    // Add the new event to the events array
    setEvents([...events, eventData]);
    handleModalClose(); // Close the modal after creating event
  }

  // Render the component
  return (
    <div className="app-container">
      {/* Left menu */}
      <div className="left-menu">
        <Menu
          className="menu-bar"
          mode="vertical"
          selectedKeys={selectMenu ? [selectMenu] : []} // Fix selectedKeys to be an array
          onClick={handleMenuClick}
        >
          <Menu.Item key="tasks">Tasks</Menu.Item>
          <Menu.Item key="events">Events</Menu.Item>
          <Menu.Item key="appointments">Appointments</Menu.Item>
        </Menu>
      </div>

      {/* Scheduler component */}
      <div className='scheduler-container'>
        {/* Pass events array to the Scheduler component */}
        <Scheduler events={events} />
      </div>
      
      {/* Modal */}
      <Modal
        title=''
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        >
        {modalContent === "Events" && (
          <EventForm onCreate={handleCreateEvent} />
        )}
        {modalContent && <p>{modalContent}</p>}
        </Modal>

    </div>
  );
}

export default App;