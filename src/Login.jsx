import React, { useState, useEffect } from 'react';
import './login.css';


const Login = ({ handleLogout }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginStatus = (status) => {
        localStorage.setItem('isLoggedIn', status)
        setIsLoggedIn(status)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password cannot be empty.');
            return; // Prevent further execution if fields are empty
        }
        
        if (isLoggedIn) {
            handleLogout(); // logout if already logged in
            handleLoginStatus(false);
        }
         else {
            try {
                const response = await fetch('http://localhost:8080/v1/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization':'Bearer FpjM5nthhL7Dzi0S9XKuV6tm3nmqy2CmU6nqGs7_SKk=' // use this line for user list
                    },
                    body: JSON.stringify({
                        user_code: username,
                        password: password,
                    }),
                }); 
                
                console.log(response.headers.get('Authorization')) // deal with authorization

                const responseData = await response.json();
                if (response.ok) {
                    // Login successful
                    console.log('Login successful');
                    handleLoginStatus(true);
                    // Access user data
                    const userData = responseData.data;
                    console.log('User Data:', userData);
                    // Redirect or perform any necessary action
                } else {
                    // Login failed
                    setError(responseData.msg || 'Login failed');
                }
            } catch (error) {
                console.error('Error occurred:', error);
                // Handle error (display error message, etc.)
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>User Code:</label>
                        <input type="text" value={username} onChange={handleUsernameChange}  /> {/*disabled={isLoggedIn} */}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={handlePasswordChange}  />  {/*disabled={isLoggedIn} */}
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">{isLoggedIn ? 'Logout' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
