import React from 'react';
import { useEffect, useState } from 'react';
import { getUserlist, AddOrUpdUser, deleteUser } from './userApi'
import './EditForm.css'; // Import your CSS file for styling

// au = Add or Update
function AuUsers({ user }) {

    const [schUser, setSchUser] = useState([]);
    const [usercode, setUsercode] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [textColor, setTextColor] = useState('');
    const [backgrounColor, setBackgroundColor] = useState('');

    useEffect(() => {
        fetchSchUser();
    }, []);

    const fetchSchUser = async () => {
        try {
            const response = await getUserlist();
            setSchUser(response);
            console.log('ABCD', response)

        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        if (user) {
            setUsercode(user.usercode || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setPassword(password || '');
            setRole(user.role || '');
            setTextColor(user.textColor || '');
            setBackgroundColor(user.backgrounColor || '');
        }
    }, [user]);


    const handleAddOrUpdateUser = async (e) => {
        e.preventDefault();

        const userData = {
            user_code: usercode,
            user_name: username,
            email_address: email,
            password: password,
            role: role,
            color_text: textColor,
            color_background: backgrounColor
        };

        try {
            await AddOrUpdUser(userData);
            // Refresh user list after successful addition or update
            fetchSchUser();
        } catch (error) {
            console.error('Error adding/updating user:', error);
        }
    };

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

                <label for="password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password" // required 
                />

                <label for="role">Position:</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Position" // required 
                />

                <label for="textColor">Text Color:</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                />

                <label for="backgrounColor"> Background Color:</label>
                <input
                    type="color"
                    value={backgrounColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                />


            </div>
            <button type="submit">Add User</button>
        </form>
    );
};

export default AuUsers;