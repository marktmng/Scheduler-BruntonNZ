import React from 'react';
import { useEffect, useState } from 'react';
import { getUserlist, AddOrUpdUser } from './userApi'
import './EditForm.css';
import './Style.css';

// Component for adding or updating users
function AuUsers({ user }) { // 'user' prop passed to the component

    const [schUser, setSchUser] = useState([]); //  '[]' is to hold an array of data
    const [usercode, setUsercode] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [inactive, setInactive] = useState(false);  // State for user status (active/inactive)

    const [textColor, setTextColor] = useState('#ffffff'); // State for text color
    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // State for background color

    // Fetch user list when component mounts
    useEffect(() => {
        fetchSchUser();
    }, []);

    // Function to fetch user list
    const fetchSchUser = async () => {
        try {
            const response = await getUserlist(); // Set the fetched user list in state
            setSchUser(response);
            console.log('ABCD', response)

        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    // Update form fields when 'user' prop changes
    useEffect(() => {
        if (user) {
            setUsercode(user.usercode || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setPassword(password || '');
            setRole(user.role || '');
            setTextColor(user.textColor || '');
            setBackgroundColor(user.backgroundColor || '');
            setInactive(user.inactive || ''); // Set user status (active/inactive)
        }
    }, [user]);


    // Function to handle adding users
    const handleAddOrUpdateUser = async (e) => {
        e.preventDefault();

        const userData = {
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
            await AddOrUpdUser(userData); // Add or update user

            fetchSchUser(); // Refresh user list after successful addition/update
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Function to handle checkbox for user status (active/inactive)
    const checkedInactive = (i) => {
        setInactive(i.target.checked); // if target is 'checked' true
    };

    // Render form with input fields and submit button
    return (
        <form
            className='edit-form'
            onSubmit={handleAddOrUpdateUser}>
            <div>
                {/* input fields */}
                <label for="usercode">User Code:</label>
                <input
                    type="text"
                    value={usercode}
                    onChange={(e) => setUsercode(e.target.value)} // onchange handler for value
                    placeholder="usercode" required
                />
                <label for="username">User Name:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // onchange handler for value
                    placeholder="username" required
                />
                <label for="email">Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // onchange handler for value
                    placeholder="email" required
                />

                <label for="password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // onchange handler for value
                    placeholder="password" required
                />

                <label for="role">Position:</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)} // onchange handler for value
                    placeholder="Position" required
                />

                {/* Checkbox for user status (active/inactive) */}
                <div className='check-div-align'>
                    <label htmlFor="inactive"></label>
                    <input
                        className='check-box'
                        type="checkbox"
                        checked={inactive} // Update the checked attribute
                        onChange={checkedInactive} // Add the onChange handler
                    /> Inactive
                </div>


                <label for="textColor">Text Color:</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                />

                <label for="backgrounColor"> Background Color:</label>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                />


            </div>
            <button type="submit" className='addUser-btn'>Add User</button>
        </form>
    );
};

export default AuUsers;