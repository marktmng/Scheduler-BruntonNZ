import React, { useState, useEffect } from 'react';
import { Menu, Modal, DatePicker } from "antd";
import Scheduler from './Scheduler';
import EventForm from './EventForm';
import AuUsers from './auUsers'; // Import the AuUsers component
import './App.css';
import './Style.css';
import './navbar.css';
import { fetchData } from './Api';
import moment from 'moment';
import TopNavbar from './TopNavbar';
import Login from './Login'; // Import the Login component
// import Profile from './Profile'; // Import the Profile component


function App() { //{ fetchSchUser }
  // State variables
  const [selectMenu, setSelectMenu] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  // const [error, setError] = useState('');

  // useEffect (() => {
  //   fetchSchUser()
  // }, [])


  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
    fetchEventList();
  }, [isLoggedIn]);

  // Fetch event list from the backend
  const fetchEventList = async () => {
    const response = await fetchData();
    
    const evnts = Object.keys(response)
      .map(key => response[key])
      .map(evnt => {
        const { Title, StartDate, EndDate, Task_code, RecEndDate, Location, Description } = evnt;
        const title = Title;
        const [start, end, recEndDate] = [StartDate, EndDate, RecEndDate].map(date => moment(date, 'YYYY.MM.DD HH:mm').toDate());
        return { title, start, end, recEndDate, Task_code, Location, Description };
      });
    setEvents(evnts);
    console.log('Fetched', evnts)
  };
 

  // Handle click on menu items
  const handleMenuClick = (event) => {
    setSelectMenu(event.key);
    setIsModalVisible(true);
    switch (event.key) {
      case "events":
        setModalContent("Events");
        break;
        case "users":
        setModalContent("Users");
        break;
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

  // // Handle login
  // const handleLogin = () => {
  //   if (username.trim() === '' || password.trim() === '') {
  //           setError('Username and password cannot be empty.');
  //           return; // Prevent further execution if fields are empty
  //       }
  // };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // Render the component
  return (
    <div>
      {isLoggedIn ? ( // If logged in, render the main application
        <div>
          <TopNavbar
            handleMenuClick={handleMenuClick}
            selectMenu={selectMenu}
            handleLogout={handleLogout}
          />
          <div className="app-container">
            <div className="left-menu">
              <Menu
                className="menu-bar"
                mode="vertical"
                selectedKeys={selectMenu ? [selectMenu] : []}
                onClick={handleMenuClick}
              >
                <Menu.Item key="events">Events</Menu.Item>
                <Menu.Item key="users">Users</Menu.Item>

              </Menu>
            </div>
            <div className='scheduler-container'>
              <Scheduler
                events={events}
                fetchEventList={fetchEventList}
                selectedDate={selectedDate}
                // fetchSchUser={fetchSchUser}
              />
            </div>
            <form>
              <Modal
                title=''
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
              >
                {modalContent === "Events" && (
                  <EventForm
                    onCreate={fetchEventList}
                  />
                )}       

                {modalContent === "Users" && (
                  <AuUsers
                  // onCreate={fetchSchUser}
                />
                
                )}  

              </Modal>
            </form>
          </div>
        </div>
      ) : ( // If not logged in, render the Login component
      <Login 
      isLoggedIn={isLoggedIn} 
      loginHandler={setIsLoggedIn} 
      handleLogout={handleLogout} />

      )}
    </div>
  );
}

export default App;
