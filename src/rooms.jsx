import React, { useState, useEffect } from 'react';
import { getRooms, addClients } from './otherApi';
import TopNavbar from './TopNavbar';
import AddRooms from './addRoom';
import RoomEditForm from './roomEdit';
import './Style.css';
import './Popup.css';

function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [addRoom, setAddRoom] = useState();
    const [editForm, setEditForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);// // State to control the visibility of the edit form


    const fetchdRoom = async () => {
        try {
            const responOnTable = await getRooms();
            setRooms(responOnTable.data);
            console.log('Rooms on Table:', responOnTable)
        } catch (err) {
            console.error('Error room fetching', err)
        }
    };

    useEffect(() => {
        fetchdRoom()
    }, []);

    const addRBtn = () => {
        setAddRoom(!addRoom)
        console.log('Add room button clicked')
    }

    const editBtn = () => {
        // setEditForm(editForm)
        setShowEditForm(true)
        
    }

    return (
        <div>
            <TopNavbar />

            <div className='employee-container'>
                <div>
                    <button className='crtUser-btn' onClick={addRBtn}> Create Room </button> {/*style={{ position: 'absolute', right: 100, top: 100 }} */}
                </div>
                <div className={`popup ${addRoom ? 'show' : ''}`}>  {/*Toggle the visibility of the popup */}
                    <div className="popup-inner">
                        <button className="close-btn" onClick={addRBtn}> [ x ] </button>
                        {/* <AddClient /> */}
                        <AddRooms
                            fetchdRoom={fetchdRoom} />

                    </div>
                </div>

                <div>
                    <div className='align-row'>
                        <div>
                            <h2 className='header' >Rooms </h2>
                        </div>
                        <div className='lbl'>
                            <label ><input type="checkbox" /> Include Inactive </label>
                        </div>
                    </div>
                    <div>
                        <table className="employee-table">
                            {/* Table Header */}
                            <thead>
                                <th> - </th>
                                <th className='rth-name'> Room Name </th>
                                <th > Room Inactive </th>
                                <th> Action </th>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {rooms.length > 0 && rooms.map((room, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>
                                                <span className='list-icon'>
                                                    <span className="middle-line"></span>
                                                </span>
                                            </td>
                                            <td>{room.room_name}</td>
                                            <td>{room.room_inactive}</td>
                                            <td>
                                                <button
                                                    className='edit-btn'
                                                    onClick={() => editBtn()}
                                                    fetchdRoom={fetchdRoom}
                                                > Edit </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            <div className={`popup ${showEditForm ? 'show' : ''}`}>
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => setShowEditForm(false)} >[ x ]</button>
                    <RoomEditForm />
                </div>
            </div>

        </div>
    );
};

export default Rooms;