import React, { useState, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import './Style.css';
import './Popup.css';
import AuUsers from './auUsers'; // Import the AuUsers component
import UserEditForm from './userEditForm';
import { getUserlist } from './userApi';

function Employee() {


    const [employees, setEmployees] = useState([]); // Define state to hold employee data
    const [addUser, setAddUser] = useState(false);
    const [editForm, setEditForm] = useState(); // for edit form
    const [includeInactive, setIncludeInactive] = useState(false); // State to control whether to include inactive users
    const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form

    useEffect(() => {
        fetchUserList();
    }, []);

    useEffect(() => {
        console.log('Bhate:', employees);

        setEmployees(employees)
    }, [employees]);

    const fetchUserList = async (inactive) => {
        try {
            const response = await getUserlist(inactive);

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

        console.log('Ckicked user ID:', userId)

        // Find the selected user from the employees array based on userId
        const selectedUser = employees.find(user => user.id === userId); // .find is use to find from the data
        setEditForm(selectedUser);
        setShowEditForm(true); // Display the edit form
        // console.log('Edit Button is clicked!')
    };


    // function to handle inactive/active user to checked
    const toggleIncludeInactive = () => {
        setIncludeInactive(!includeInactive); // if the user not'!' inactive then show
        fetchUserList(includeInactive);

    };

    return (
        <div>
            <TopNavbar />
            <div className='employee-container'>
                <div>
                    <button className='crtUser-btn'
                        onClick={addUserBtn} > Create User </button> {/*style={{ position: 'absolute', right: 100, top: 100 }} */}
                </div>
                <div className={`popup ${addUser ? 'show' : ''}`}>
                    <div className="popup-inner">
                        <button className="close-btn"
                            onClick={addUserBtn}> [ x ] </button>
                        <AuUsers />
                    </div>
                </div>
                {/* Other content */}

                <div>
                    <div className='align-row'>
                        <div>
                            <h2 className='header' > Staff </h2>
                        </div>
                        <div className='lbl'>
                            <label ><input type="checkbox" checked={includeInactive} onChange={toggleIncludeInactive} /> Include Inactive </label> {/*checked={includeInactive} onChange={toggleIncludeInactive} */}
                        </div>
                    </div>
                    <div >
                        <table
                            className="employee-table"
                        >
                            <thead>
                                <tr>
                                    <th className='code' >Code</th>
                                    <th className='username'>Username</th>
                                    <th className='email'>Email</th>
                                    <th className='position'>Position</th>
                                    {/* <th>Password</th> */}
                                    {/* <th>Text color</th>
                                    <th>Background color</th> */}
                                    <th>Color</th>
                                    {includeInactive &&
                                        <th>{employees.inactive} Inactive
                                        </th>} {/* Render the cell only if includeInactive is true */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 && employees.map((employee, index) => { // make sure the employees is not empty

                                    // Render the row only if the employee is active or if includeInactive is true
                                    return (
                                        <tr key={index}>
                                            <td>{employee.user_code}</td>
                                            <td>{employee.user_name}</td>
                                            <td>{employee.email_address}</td>
                                            <td>{employee.role}</td>
                                            <td className='colors' style={{ backgroundColor: employee.color_background, color: employee.color_text }}>color</td>
                                            {includeInactive && (
                                                <td>
                                                    <input type="checkbox" checked={employee.inactive} readOnly />
                                                </td>
                                            )}
                                            <td>
                                                <div>
                                                    <button
                                                        className='edit-btn'
                                                        onClick={() => editBtn(employee.id)}
                                                        fetchUserList={fetchUserList}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
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
