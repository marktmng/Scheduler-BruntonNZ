import React, { useState, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import './Style.css';
import './Popup.css'
import AuUsers from './auUsers'; // Import the AuUsers component
import UserEditForm from './userEditForm';
import { getUserlist, AddOrUpdUser, deleteUser } from './userApi'

function Employee() {
    // Define state to hold employee data
    const [employees, setEmployees] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [editForm, setEditForm] = useState();

    const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
    const [selectedUser, setSelectedUser] = useState(null); // State to hold the user to be edited


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
    //             setEmployees(userBrunton); // Assuming the userBrunton contains employee data directly
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             // Handle error gracefully, if needed
    //         }
    //     };

    //     setEmployees(); // Call the inner async function immediately
    // }, []);

    // // ********************** Sample **********************
    // useEffect(() => {
    //     // Fetch employee data here or set it from wherever you're getting it
    //     const sampleEmployees = [
    //         { user_code: 1, user_name: 'John Doe', email_address: 'john@example.com', password: 'xxxxxxxx', role: 'Manager' },
    //         { user_code: 2, user_name: 'Jane Smith', email_address: 'jane@example.com', password: 'xxxxxxxx', role: 'Developer' },
    //         { user_code: 3, user_name: 'Jane Smith', email_address: 'jane@example.com', password: 'xxxxxxxx', role: 'Developer' },

    //     ];

    //     console.log('Sample Data:', sampleEmployees)
    //     setEmployees(sampleEmployees);
    // }, []);


    // // ********************** try 03 **********************



    useEffect(() => {
        fetchUserList();
    }, []);

    useEffect(() => {
        console.log('Bhate:', employees);

        setEmployees(employees)
    }, [employees]);

    const fetchUserList = async () => {
        try {
            const response = await getUserlist();

            console.log('Userlist:', response)
            setEmployees(response.data.Users);
            // setEmployees(userList.employees);
            console.log('Employee List', response)

        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const addUserBtn = async () => {
        setAddUser(!addUser);
        console.log('Ready to add new user')

        await fetchUserList();
    };

    const editBtn = (user) => {
        setEditForm(editForm);
        setSelectedUser(user); // Set the selected user to be edited
        setShowEditForm(true); // Display the edit form
        console.log('Edit Button is clicked!')
    };

    // const deleteBtn = () => {

    //     console.log('Delete Button is clicked!')
    // };

    return (
        <div>
            <TopNavbar />
            <div className='employee-container'>
                <div>
                    <button className='crtUser-btn' onClick={addUserBtn} > Create User </button> {/*style={{ position: 'absolute', right: 100, top: 100 }} */}
                </div>
                <div className={`popup ${addUser ? 'show' : ''}`}>
                    <div className="popup-inner">
                        <button className="close-btn" onClick={addUserBtn}> [ x ] </button>
                        <AuUsers />
                    </div>
                </div>
                {/* Other content */}

                <div>
                    <h2 className='header' >Employee Table</h2>
                    <div
                    // fetchUserList={fetchUserList}
                    >
                        <table
                            className="employee-table"
                        >
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    {/* <th>Password</th> */}
                                    <th>Text color</th>
                                    <th>Background color</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 && employees.map((employee, index) => { // make sure the employees is not empty
                                    return <tr
                                        key={index}
                                    // fetchUserList={fetchUserList}
                                    >

                                        <td>{employee.user_code}</td>
                                        <td className='username'>{employee.user_name}</td>
                                        <td className='email'>{employee.email_address}</td>
                                        <td className='position'>{employee.role}</td>
                                        {/* <td>{employee.password}</td> */}
                                        <td>{employee.color_text}</td>
                                        <td>{employee.color_background}</td>

                                        <td>
                                            <div>
                                                <button className='edit-btn' onClick={editBtn}> Edit </button>
                                            </div>
                                            {/* <div className={`popup ${editBtn ? 'showEditForm' : ''}`}>
                                                <div className="popup-inner">
                                                    <button className="close-btn" onClick={editBtn}> [ x ] </button>
                                                    <UserEditForm />
                                                </div>
                                            </div> */}
                                            {/* <button className='dlt-btn' onClick={deleteBtn}> Delete </button> */}
                                        </td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showEditForm && selectedUser && (
                <div className={`popup ${showEditForm ? 'show' : ''}`}>
                    <div className="popup-inner">
                        <button className="close-btn" onClick={() => setShowEditForm(false)}> [ x ] </button>
                        <UserEditForm user={selectedUser} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Employee;
