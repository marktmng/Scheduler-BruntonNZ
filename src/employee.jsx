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
    const [editForm, setEditForm] = useState();

    // const [includeInactive, setIncludeInactive] = useState(false); // State to control whether to include inactive users

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


    // const toggleIncludeInactive = () => {
    //     setIncludeInactive(!includeInactive);
    // };
    
    const addUserBtn = async () => {
        setAddUser(!addUser);
        console.log('Ready to add new user')

        await fetchUserList();
    };

    const editBtn = (userId) => {

        // Find the selected user from the employees array based on userId
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
                    <div className='align-row'>
                        <div>
                            <h2 className='header' >Employee Table</h2>
                        </div>
                        <div className='lbl'>
                            <label ><input type="checkbox"  /> Include Inactive </label> {/*checked={includeInactive} onChange={toggleIncludeInactive} */}
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
                                    <th>Inactive</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 && employees.map((employee, index) => { // make sure the employees is not empty
                                    return <tr
                                        key={index}
                                    // fetchUserList={fetchUserList}
                                    >

                                        <td >{employee.user_code}</td>
                                        <td >{employee.user_name}</td>
                                        <td >{employee.email_address}</td>
                                        <td >{employee.role}</td>
                                        {/* <td>{employee.password}</td> */}
                                        {/* <td>{employee.color_text}</td>
                                        <td>{employee.color_background}</td> */}
                                        <td className='colors' style={{ backgroundColor: employee.color_background, color: employee.color_text }}>color</td>
                                        <td className='position'>
                                            {employee.inactive}
                                            <input type="checkbox" />
                                        </td>

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
