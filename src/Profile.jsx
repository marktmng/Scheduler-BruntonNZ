import React from 'react';

const Profile = ({ handleLogout }) => {
    return (
        <div>
            {/* Example of utilizing handleLogout */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
