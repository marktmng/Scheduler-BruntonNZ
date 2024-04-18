import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import './Style.css';
import './Popup.css';
import AddClient from './addClients';

function Client() {

    const [addClients, setAddClients] = useState();
    // Dummy client data
    const clients = [
        { sequence: '=', code: 'C001', name: 'Client A', inactive: false },
        { sequence: '=', code: 'C002', name: 'Client B', inactive: true },
        { sequence: '=', code: 'C003', name: 'Client C', inactive: false },
        { sequence: '=', code: 'C004', name: 'Client D', inactive: true },
        { sequence: '=', code: 'C005', name: 'Client E', inactive: false }
    ];


    const addBtnClient = () => {

        setAddClients(addClients)
        console.log('Add client button added ;-) ')
    }

    return (
        <div>
            <TopNavbar />

            <div className='employee-container'>
                <div>
                    <button className='crtUser-btn' onClick={addBtnClient}> Create Clients </button> {/*style={{ position: 'absolute', right: 100, top: 100 }} */}
                </div>

                <div className={`popup ${addBtnClient ? 'show' : ''}`}>
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
                                    <th > Seqeunce </th>
                                    <th className='username'>Code</th>
                                    <th className='cl-name'>Name</th>
                                    <th>Inactive</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.sequence}</td>
                                        <td>{client.code}</td>
                                        <td>{client.name}</td>
                                        <td>{client.inactive ? 'Yes' : 'No'}</td>
                                        <td>
                                            <div>
                                                <button
                                                    className='edit-btn'
                                                > Edit </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Client;
