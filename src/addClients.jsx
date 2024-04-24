import React, { useEffect, useState } from 'react';
import './EditForm.css'; // Import your CSS file for styling
import { getClients, addClients } from './otherApi';

// component for adding or updating clients
function AddClient({ clt }) { // 'clt' prop passed to the component

    const [clients, setClients] = useState(); // for clients
    const [clientCode, setClientCode] = useState('');
    const [clientName, setClientName] = useState('');
    const [cltInactive, setCltInactive] = useState(false) // if inactive is true then don't show



    const fetchedClients = async () => {
        try {
            const cdResponse = await getClients();
            setClients(cdResponse);
            console.log('Clients fetched details:', cdResponse)
        } catch (erR) {
            console.error("Error fetching clients", erR)
        }
    };

    useEffect(() => {
        fetchedClients();
    }, []);

    // Update form fields when 'clt' prop changes
    useEffect(() => {
        if (clt) {
            setClientCode(clt.clientCode || '');
            setClientName(clt.clientName || '');
            setCltInactive(clt.cltInactive || '');

        }
    }, [clt]);

    // function to handle adding client
    const addClient = async (c) => {
        c.preventDefault();

        const clientDetails = {
            client_code: clientCode,
            client_name: clientName,
            client_inactive: cltInactive
        };

        // use try and catch event handling
        try {
            await addClients(clientDetails); // Add clients

            fetchedClients(); // Refresh clients list after succesfull on adding
        } catch (erR) {
            console.error('Error adding clients:', erR)
        }
    }

    // function to hand checkbox for client status (active/inactive)
    const checkedInactive = (ci) => {
        setCltInactive(ci.target.checked); // if target is 'checked' true
    }

    return (
        <form
            className='edit-form'
            onSubmit={addClient}
            fetchedClients={fetchedClients}
        >
            <div>
                <label for="clientCode">Code:</label>
                <input
                    type="text"
                    placeholder='client code'
                    onChange={(cc) => setClientCode(cc.target.value)} // onchange handler for value
                    value={clientCode} required
                />

                <label for="clientName">Name:</label>
                <input type="text"
                    placeholder='Name'
                    onChange={(cn) => setClientName(cn.target.value)} // onchange handler for value
                    value={clientName} required
                />
            </div>

            {/* for inactive */}
            <div className='check-div-align'>
                <label htmlFor="cltInactive"></label>
                <input
                    className='check-box'
                    type="checkbox"
                    checked={cltInactive} // update the checked attribute
                    onChange={checkedInactive}
                /> Inactive
            </div>
            <button type="submit" className='addUser-btn'>Add Clients</button>

        </form>
    );
};

export default AddClient;