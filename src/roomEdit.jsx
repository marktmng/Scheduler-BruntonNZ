import React, { useState, useEffect } from 'react';
import { getRooms, addClients, addRooms } from './otherApi';
import './Popup.css';



function RoomEditForm({ rm }) {
    const [room, setRoom] = useState();
    const [roomName, setRoomName] = useState();

    const fetchdRoom = async () => {
        try {
            const rooMresp = await getRooms();
            setRoom(rooMresp);
            console.log('Rooms:', rooMresp)
        } catch (err) {
            console.error('Error room fetching', err)
        }
    };

    useEffect(() => {
        fetchdRoom()
    }, []);

    // update form fields whe 'rm' prop changes
    useEffect(() => {
        if (rm) {
            setRoomName(rm.roomName || '');
        }

    }, [rm]);

    const updBtn = async (r) => {
        r.preventDefault();

        const roomDetails = {
            room_name: roomName,
        };

        try {
            const resPonse = await addRooms(roomDetails);
            console.log('Room updated successfully:', resPonse)
            fetchdRoom();
        } catch (erRR) {
            console.error('Error comes up while updating:', erRR);
        }

    }



    return (
        <form
            className='edit-form'
            onSubmit={updBtn}
        >
            <div>
                <label htmlFor="roomName">Room Name:</label>
                <input
                    type="text"
                    onChange={(u) => updBtn(u.target.value)}
                    value={roomName} />
            </div>

            {/* for inactive */}
            <div className='check-div-align'>
                <label htmlFor="cltInactive"></label>
                <input
                    className='check-box'
                    type="checkbox"
                /> Inactive
            </div>
            <button type='submit' className='save-btn'> Save Changes</button>
        </form>
    );
};

export default RoomEditForm;