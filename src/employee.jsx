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

    const editBtn = (userId) => {
        const selectedUser = employees.find(user => user.id === userId);
        setEditForm(selectedUser);
        setShowEditForm(true); // Display the edit form
        // console.log('Edit Button is clicked!')
    };

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
                        <div
                            className='checkbox' >
                            <label><input type="checkbox" /> Inactive </label>
                        </div>

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
                                    {/* <th>Text color</th>
                                    <th>Background color</th> */}
                                    <th>Color</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 && employees.map((employee, index) => { // make sure the employees is not empty
                                    return <tr
                                        key={index}
                                    // fetchUserList={fetchUserList}
                                    >

                                        <td className='code' >{employee.user_code}</td>
                                        <td className='username'>{employee.user_name}</td>
                                        <td className='email'>{employee.email_address}</td>
                                        <td className='position'>{employee.role}</td>
                                        {/* <td>{employee.password}</td> */}
                                        {/* <td>{employee.color_text}</td>
                                        <td>{employee.color_background}</td> */}
                                        <td className='colors' style={{ backgroundColor: employee.color_background, color: employee.color_text }}>color</td>


                                        <td>
                                            <div>
                                                <button
                                                    className='edit-btn'
                                                    onClick={() => editBtn(employee.id)}
                                                    fetchUserList={fetchUserList}
                                                > Edit </button>

                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showEditForm && (
                <div className={`popup ${showEditForm ? 'show' : ''}`}>
                    <div className="popup-inner">
                        <button className="close-btn" onClick={() => setShowEditForm(false)}> [ x ] </button>
                        <UserEditForm
                            user={editForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Employee;
