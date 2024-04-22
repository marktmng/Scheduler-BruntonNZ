import React from 'react';
import { useEffect, useState } from 'react';
import { getUserlist, AddOrUpdUser, deleteUser } from './userApi'
import './Style.css';

function UserEditForm({ user }) {
    const [schUser, setSchUser] = useState([]);

    const [id, setId] = useState();
    const [usercode, setUsercode] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [textColor, setTextColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const [inactive, setInactive] = useState(''); // show and hide inactive staff

    useEffect(() => {
        fetchEmployee();
    }, []);


    const fetchEmployee = async () => {
        try {
            const response = await getUserlist();

            console.log('Chorharu:', response)
            setSchUser(response.data.Users);
            // setEmployees(userList.employees);
            console.log('Chors', response)

        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        if (user) {
            setId(user.id || '');
            setUsercode(user.user_code || '');
            setUsername(user.user_name || '');
            setEmail(user.email_address || '');
            setPassword(user.password || '');
            setRole(user.role || '');
            setTextColor(user.color_text || '');
            setBackgroundColor(user.color_background || '');
            setInactive(user.inactive || '');
        }
    }, [user]);


    const updBtn = async (e) => {
        e.preventDefault();

        const userData = {
            id: id,
            user_code: usercode,
            user_name: username,
            email_address: email,
            password: password,
            role: role,
            color_text: textColor,
            color_background: backgroundColor,
            inactive: inactive
        };

        try {
            const updResponse = await AddOrUpdUser(userData);
            console.log('User updated successfully', updResponse)

            // Refresh user list after successful on update
            fetchEmployee()
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const checkedInactive = (i) => {
        setInactive(i.target.checked);
    };

    return (
        <form
            className='edit-form'
            onSubmit={updBtn}
        >

            <div>
                {/* input fields */}
                <label for="usercode">User Code:</label>
                <input
                    type="text"
                    value={usercode}
                    onChange={(e) => setUsercode(e.target.value)}
                    placeholder="usercode" // required 
                />

                <label for="username">User Name:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username" // required 
                />
                <label for="email">Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email" // required 
                />

                {/* <label for="password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password" // required 
                /> */}

                <label for="role">Position:</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Position" // required 
                />

                {/* for inactive */}
                <div className='check-div-align'>
                    <label htmlFor="inactive"></label>
                    <input
                        className='check-box'
                        type="checkbox"
                        checked={inactive}
                        onChange={checkedInactive} /> Inactive
                </div>

                <label for="textColor">Text Color:</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                />

                <label for="backgroundColor"> Background Color:</label>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                />


            </div>
            <button type="submit" className='save-btn'> Save Changes </button>
        </form>
    );
};

export default UserEditForm;