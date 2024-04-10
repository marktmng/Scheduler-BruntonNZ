import React, { useState, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import './Style.css';
import './Popup.css'
import AuUsers from './auUsers'; // Import the AuUsers component
import { getUserlist, AddOrUpdUser, deleteUser } from './userApi'

function Employee() {
    // Define state to hold employee data
    const [employees, setEmployees] = useState([]);
    const [addUser, setAddUser] = useState(false);
  

    // // ********************** try 01 **********************

    // useEffect(() => {
    //     fetchSchUser()
    //         .then(res => setEmployees(res.employees))
    //         .catch(err => console.log(err));
    // }, []);

    // const fetchSchUser = async () => {
    //     try {
    //         const response = await getUserlist();


            
    //         // setEmployees(response.employee)
    //         console.log('Tera Baje:', response)
    //         console.log(response.employee)
            

    //     } catch (error) {
    //         console.error('Error fetching user list:', error);
    //     }
    // };


    // // ********************** try 02 **********************
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem('Token');
    //             const response = await fetch(`http://localhost:8080/v1/user/userlist?pageindex=1&pagesize=222222`, {
    //                 method: "GET",
    //                 headers: {
    //                     'Authorization': `${token}`,
    //                 }
    //             });
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch data");
    //             }
    //             const userBrunton = await response.json();
    //             console.log("Data from server:", userBrunton); // Log the data received from the server
    //             setEmployees(userBrunton); // Assuming the response contains employee data directly
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             // Handle error gracefully, if needed
    //         }
    //     };

    //     setEmployees(); // Call the inner async function immediately
    // }, []);

// // ********************** Sample **********************
    useEffect(() => {
        // Fetch employee data here or set it from wherever you're getting it
        const sampleEmployees = [
            { user_code: 1, user_name: 'John Doe', email_address: 'john@example.com', password: 'xxxxxxxx', role: 'Manager' },
            { user_code: 2, user_name: 'Jane Smith', email_address: 'jane@example.com', password: 'xxxxxxxx', role: 'Developer' },
            { user_code: 3, user_name: 'Jane Smith', email_address: 'jane@example.com', password: 'xxxxxxxx', role: 'Developer' },

        ];

        console.log('Sample Data:', sampleEmployees)
        setEmployees(sampleEmployees);
    }, []);


    // // ********************** try 03 **********************

    // useEffect(() => {
    //     fetchUserList();
    // }, []);

    // const fetchUserList = async () => {
    //     try {
    //         const userList = await getUserlist();

    //         console.log('Userlist:', userList)
    //         setEmployees(userList);
    //     } catch (error) {
    //         console.error('Error fetching user list:', error);
    //     }
    // };

    const addUserBtn = () => {
        setAddUser(!addUser);
        console.log('Add User Button Clicked!')
    };

    return (
        <div>
            <TopNavbar />
            <div className='employee-container'>
                <div>
                    <button onClick={addUserBtn} style={{ position: 'absolute', right: 100, top: 100 }}> Add User </button>
                </div>
                <div className={`popup ${addUser ? 'show' : ''}`}>
                    <div className="popup-inner">
                        <button className="close-btn" onClick={addUserBtn}> [ x ] </button>
                        <AuUsers />
                    </div>
                </div>
                {/* Other content */}

                <div>
                    <h2 style={{ position: 'absolute', left: 250, top: 150 }}>Employee Table</h2>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Password</th>
                                {/* <th>Inactive</th> */}
                                <th>Text color</th>
                                <th>Background color</th>
                                {/* Add more table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => {
                                return <tr key={index}>
                                    <td>{employee.user_code}</td>
                                    <td>{employee.user_name}</td>
                                    <td>{employee.email_address}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.password}</td>
                                    {/* <td>{employee.inactive}</td> */}
                                    <td>{employee.color_text}</td>
                                    <td>{employee.color_background}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Employee;
