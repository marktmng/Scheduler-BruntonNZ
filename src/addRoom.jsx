import React, { useEffect, useState } from 'react';
import { getRooms, addClients, addRooms } from './otherApi';

function AddRooms({ rm }) {

    const [room, setRoom] = useState();
    const [roomName, setRoomName] = useState('');
    // const [rInactive, setRInactive] = useEffect();



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

    useEffect(() => {
        if (rm) {
            setRoomName(rm.roomName || '');
        }

    }, [rm]);

    // adding room button
    const roomSubmit = async (r) => {
        r.preventDefault(); // Corrected typo here

        const roomDetails = {
            room_name: roomName
        }

        try {
            await addRooms(roomDetails); // add room
            fetchdRoom();
        } catch (err) {
            console.error('Error adding room:', err)
        }
;    }


    return (
        <form
            className='edit-form'
            onSubmit={roomSubmit} >
            <div>
                <label for="">Room Name: </label>
                <input type="text"
                    placeholder='hall room'
                    onChange={(r) => setRoomName(r.target.value)}
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
            <button type="submit" className='addUser-btn'>Add Room</button>
        </form>
    );
};

export default AddRooms;