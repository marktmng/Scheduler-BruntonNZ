import React from 'react';
import { Menu, Button, Upload, message, Modal } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import './navbar.css';
import Login from './Login'; // Import the Login component
import Profile from './Profile';
import Employee from './employee';
import { Link } from 'react-router-dom'; 
// import { Link } from 'react-router-dom';


const TopNavbar = ({ handleTopMenuClick, selectTopMenu, username, handleSubmit, handleLogout }) => {
 
  // State variable to track if login modal is visible
  const [isLoginModalVisible, setIsLoginModalVisible] = React.useState(false);

  // Toggle login modal visibility
  const toggleLoginModal = () => {
    setIsLoginModalVisible(!isLoginModalVisible);
  };

  // Function to get the first letter of the user's name
  const getFirstLetter = () => {
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return <UserOutlined />; // Default letter when no username is provided
  };

  // Define a function to handle menu item click
  const handleClick = (key) => {
    // Call the handleTopMenuClick function passed from the parent component
    handleTopMenuClick(key);
    // Additional logic for navigation
    if (key === 'Employee') {
      // Navigate to the Employee page here
      window.location.href = './employee'; // You can replace '/employee' with the appropriate URL
    }
  };

  return (
    <Menu
      className="top-menu-bar"
      mode="horizontal"
      selectedKeys={selectTopMenu ? [selectTopMenu] : []}
      onClick={handleTopMenuClick}
    >
      <div>
        <img src='/brunton_logo.png' alt='logo' className='logo' style={{ position: 'absolute', left: 0, top: 0 }} />
      </div>

      <div className="nav-item">
        <h1 className="nav-item-title"> Scheduler </h1>
      </div>

      {/*Employee page */}
      <div 
      style={{ position: 'absolute', right: 220, top: 15 }} >

        <li > 
          <Link 
          className='pages'
          to="/">Calendar
          </Link>
        </li>
      </div>
      <div 
      style={{ position: 'absolute', right: 100, top: 15 }} >
      <li > 
          <Link 
          className='pages' 
          to="/employee" > Employee 
          </Link>
        </li>
      </div>

      {/* Render login circle if user is not logged in */}
      {!username &&
        <div className='circle' onClick={toggleLoginModal}>
          <span className='circle-letter'>{getFirstLetter()}</span>
        </div>
      }

      <Modal
        title="Logout"
        open={isLoginModalVisible}
        onCancel={toggleLoginModal}
        footer={null}
      >
        {/* Render Login component inside modal */}
        <Profile 
        handleLogout={handleLogout} /> {/* handleLogin={handleLogin} handleLogout={handleLogout}  || I will replace login with profile */}

      </Modal>

    </Menu>
  );
};

export default TopNavbar;
