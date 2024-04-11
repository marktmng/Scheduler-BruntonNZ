import React, { useState, useEffect } from 'react';
import { Menu, Modal } from "antd";
import Scheduler from './Scheduler';
import AuUsers from './auUsers';
import './App.css';
import './Style.css';
import './navbar.css';
import { fetchData } from './Api';
import moment from 'moment';
import TopNavbar from './TopNavbar';
import Login from './Login';
import { getUserlist } from './userApi'
import { updateTask } from './Api'

function Home() {
  const [selectMenu, setSelectMenu] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [employees, setEmployees] = useState([]); // to show employeelist
  // const [updEvent, setUpdEvent ] = useState([]); // to show updated after dragged

  // const draggedEvent = async () => { // to show employeelist
  //   const draggedTask = await updateTask();
  //   setUpdEvent(draggedTask.Task_code)

  //   console.log('Dragged Task:', draggedTask)
  // }

  const updateEmployeeList = async () => { // to show employeelist
    const updatedEmployees = await getUserlist();
    setEmployees(updatedEmployees.data.Users);

    console.log('Brunton Staff:', updatedEmployees)
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
    fetchEventList();
  }, [isLoggedIn]);

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

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <TopNavbar
            handleMenuClick={handleMenuClick}
            selectMenu={selectMenu}
            handleLogout={handleLogout}
          />
          <div className="app-container">
            <div className="left-menu">
              {/* <Menu
                className="menu-bar"
                mode="vertical"
                selectedKeys={selectMenu ? [selectMenu] : []}
                onClick={handleMenuClick}
              >
                {/* <Menu.Item key="users">Users</Menu.Item> */}
              {/* </Menu> */}
            </div>
            <div className='scheduler-container'>
              <Scheduler
                events={events}
                fetchEventList={fetchEventList}
                selectedDate={selectedDate}
                // draggedEvent={draggedEvent}
              />
            </div>
            {/* <form>
              <Modal
                title=''
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
              >
                {modalContent === "Users" && (
                  <AuUsers />
                )}
              </Modal>
            </form> */}
          </div>
        </div>
      ) : (
        <Login
          handleLogin={() => setIsLoggedIn(true)}
          // handleLogin={(isLoggedIn) => setIsLoggedIn(isLoggedIn)}
          handleLogout={handleLogout}
        />

        
      )}
      <AuUsers 
      updateEmployeeList={updateEmployeeList}
       />
      
    </div>
  );
}

export default Home;
