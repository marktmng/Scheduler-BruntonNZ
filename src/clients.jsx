import React, { useEffect, useState } from 'react';
import TopNavbar from './TopNavbar';
import './Style.css';
import './Popup.css';
import AddClient from './addClients';
import { getClients, addClients } from './clientApi';

function Client() {

    const [clients, setClients] = useState([]); // Define state to hold clients data
    const [addClients, setAddClients] = useState();
    const [editForm, setEditForm] = useState(false); // for edit form
    const [showEditForm, setShowEditForm] = useState(false);// // State to control the visibility of the edit form
    const [includeInactive, setIncludeInactive] = useState(false); // State to control whether to include inactive users

    useEffect(() => {
        fetchedClients();
    }, []);

    useEffect(() => {
        console.log('Chor Clients:', clients)
        setClients(clients)
    }, [clients]);

    const fetchedClients = async () => {
        try {
            const cls = await getClients();
            setClients(cls.data);
            console.log('Clients fetched details:', cls)
        } catch (erR) {
            console.error("Error fetching clients list", erR)
        }
    };


    const addBtnClient = () => { // add clients button
        setAddClients(!addClients); // Toggle the visibility of the popup
        console.log('New client added ;-) ');
    }

    const edtClientBtn = () => {
        console.log('Client edit button clicked!!!')
    }

    return (
        <div>
            <TopNavbar />

            <div className='employee-container'>
                <div>
                    <button className='crtUser-btn' onClick={addBtnClient}> Create Clients </button> {/*style={{ position: 'absolute', right: 100, top: 100 }} */}
                </div>

                <div className={`popup ${addClients ? 'show' : ''}`}>  {/*Toggle the visibility of the popup */}
                    <div className="popup-inner">
                        <button className="close-btn" onClick={addBtnClient}> [ x ] </button>
                        <AddClient />
                    </div>
                </div>

                <div>
                    <div className='align-row'>
                        <div>
                            <h2 className='header' >Employee Table</h2>
                        </div>
                        <div className='lbl'>
                            <label ><input type="checkbox" /> Include Inactive </label>
                        </div>
                    </div>
                    <div>
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th > - </th>
                                    <th className='username'>Code</th>
                                    <th className='cl-name'>Name</th>
                                    <th>Inactive</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {clients.length > 0 && clients.map((client, index) => {

                                    return (
                                        <tr key={index}>
                                            {/* <td>{client.client_sequence}</td> */}
                                            <td>
                                                <span className={`list-icon ${client.inactive ? 'inactive' : ''}`}>
                                                    <span className="middle-line"></span>
                                                </span>
                                            </td>
                                            <td>{client.client_code}</td>
                                            <td>{client.client_name}</td>
                                            <td>
                                                <input type="checkbox" checked={client.inactive} readOnly /> {/* to show status */}
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        className='edit-btn'
                                                        onClick={edtClientBtn}
                                                    > Edit </button>

                                                </div>
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
                    <button className="close-btn" onClick={() => setShowEditForm(false)}> [ x ] </button>
                </div>
            </div>
        </div>
    );
}

export default Client;
