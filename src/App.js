/* App.js */
import React, { useState, useEffect } from 'react';
import { Menu, Modal, DatePicker, Calendar } from "antd"; // Import DatePicker for the small calendar
import Scheduler from './Scheduler';
import EventForm from './EventForm'; // Import EventForm component
import './App.css';
import './Style.css';
import './navbar.css';
import { fetchData } from './Api';
import moment from 'moment';
import TopNavbar from './TopNavbar';

function App() {
  // State variables
  const [selectMenu, setSelectMenu] = useState(null); // Selected menu item
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [modalContent, setModalContent] = useState(null); // Content for modal
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date in the small calendar

  useEffect(() => {
    fetchEventList();
  }, []);

  // Fetch event list from the backend
  const fetchEventList = async () => {
    const response = await fetchData();
    const evnts = Object.keys(response)
      .map(key => response[key])
      .map(evnt => {
        const { Title, StartDate, EndDate,Task_code, RecEndDate,  Location, Description } = evnt;
        const title = Title;
        const [start, end, recEndDate ] = [StartDate, EndDate, RecEndDate ].map(date => moment(date, 'YYYY.MM.DD HH:mm').toDate());
        return { title, start, end, recEndDate, Task_code, Location, Description };
      });
    setEvents(evnts);
  };
  // Handle click on menu items
  const handleMenuClick = (event) => {
    setSelectMenu(event.key);
    setIsModalVisible(true); // Show modal when menu item is clicked

    // Set modal content based on selected menu item
    switch (event.key) {
      // case "tasks":
      //   setModalContent("Tasks");
      //   break;
      case "events":
        setModalContent("Events");
        break;
      // case "appointments":
      //   setModalContent("Appointments");
      //   break;
      default:
        setModalContent(null);
        break;
    }
  };

  // Handle modal close event
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Handle date selection in the small calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleEventDropCallback = () => {
    fetchEventList() // fetch the list for dragging and dropping
    // Any other logic you want to perform when event is dropped
  };

  // Render the component
  return (
    <div>
      {/* Top Navbar */}
      <TopNavbar
        handleMenuClick={handleMenuClick}
        selectMenu={selectMenu}
      />
      <div >
        <div className="app-container">
          {/* Left menu */}
          <div className="left-menu">
            <Menu
              className="menu-bar"
              mode="vertical"
              selectedKeys={selectMenu ? [selectMenu] : []}
              onClick={handleMenuClick}
            >
              {/* <Menu.Item key="tasks">Tasks</Menu.Item> */}
              <Menu.Item key="events">Events</Menu.Item>
              {/* <Menu.Item key="appointments">Appointments</Menu.Item> */}
              {/* Small calendar */}
              {/* <div key="smallCalendar">
                <DatePicker onChange={handleDateChange} />
                </div> */}
            </Menu>
          </div>
          {/* Scheduler component */}
          <div className='scheduler-container'>
            <Scheduler 
            events={events} // this is the one showing on the calender which from Scheduler
            fetchEventList={fetchEventList} 
            selectedDate={selectedDate} 
            onEventDropCallback={handleEventDropCallback} // Add this line
            />
          </div>
          {/* Modal */}
          <form  >
            <Modal
              title=''
              open={isModalVisible}
              onCancel={handleModalClose}
              footer={null}

            >
              {/* <hr/> */}
              {modalContent === "Events" && (
                <EventForm
                  onCreate={fetchEventList}
                />
              )}
              <br />
              <hr />
              {modalContent && <p>{modalContent}</p>}
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
