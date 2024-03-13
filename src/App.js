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
        const { Title, StartDate, EndDate, Task_code, Location, Description, Repeatable } = evnt;
        const title = Title;
        const [startValue, endValue] = [StartDate, EndDate].map(date => moment(date, 'YYYY.MM.DD HH:mm'))
        const [start, end] = [startValue, endValue].map(value => value.toDate());

        if (!Repeatable) {
          return [{ title, start, end, Task_code, Location, Description, Repeatable }];
        } else {
          const result = []
          const totalDays = moment.duration(endValue.diff(startValue)).asDays()
          const margin = Repeatable.includes('FREQ=WEEKLY') ? 7 : 1

          const totalTimes = (totalDays / margin)

          const rangeStart = moment(startValue)
          for (let i = 0; i < totalTimes; i++) {
            const start = rangeStart.toDate()
            const end = start
            result.push({ title, start, end, Task_code, Location, Description, Repeatable })
            rangeStart.add('d', margin)
          }

          return result
        }
      }).flat();
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
            <Scheduler events={events} fetchEventList={fetchEventList} selectedDate={selectedDate} />
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
