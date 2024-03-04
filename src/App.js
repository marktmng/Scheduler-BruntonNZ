/* App.js */
import React, { useState, useEffect } from 'react';
import { Menu, Modal } from "antd";
import Scheduler from './Scheduler';
import EventForm from './EventForm'; // Import EventForm component
// import { fetchSomeData } from './apiService'; // Import your API functions
import './App.css';
import './Style.css';
import { fetchData } from './Api';
import moment from 'moment';

// sample data

// const sampleEventData = [
//   {
//   "Title": "Graduation",
//   "Description": "",
//   "Location": "Main Hall",
//   "StartDate": "3.2.2024 22:22",
//   "EndDate": "4.2.2024 23:00"
// }
// ]

function App() {
  // State variables
  const [selectMenu, setSelectMenu] = useState(null); // Selected menu item
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [modalContent, setModalContent] = useState(null); // Content for modal

  const [events, setEvents] = useState([]); 

  useEffect(() => {
// Any additional logic you need when events change
  }, [events]);

  // fetch the data from the backend
  const fetchEventList = async () => {
    // console.log( 3333)
    console.log("Fetch Event List")

    const response = await fetchData()

    const evnts = Object.keys(response)
    .map(key => response[key])
    .map(evnt => {
      const { Title, StartDate, EndDate } = evnt //Id
        const title = Title;
        const [start, end] = [StartDate, EndDate]
          .map(date => {
            // return new Date() // fake date

            const result =  moment.utc(date).toDate() // 'DD.MM.YYYY HH:mm'
            console.log("Response from backend:", response) // Log the response object
            
            console.log({result})
            return result
            //   .format('YYYY-MM-DD')
          })

        // const id = Id
        return { title, start, end } //id
    })
    setEvents(evnts)
  }

  useEffect(() => {
    fetchEventList()
  }, [])

  const createEvnts = () => {
    fetchEventList()
  };
  console.log({ evnts: events })
 

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
        <Scheduler events={events} fetchEventList={fetchEventList}/>
      </div>
      
      {/* Modal */}
      <Modal
        title=''
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        >
        {modalContent === "Events" && (
          <EventForm onCreate={createEvnts} /> // pass createEvnts to EventForm to add new events
        )}
        {modalContent && <p>{modalContent}</p>}
        </Modal>

    </div>
  );
}

export default App;