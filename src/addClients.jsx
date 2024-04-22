import React, { useState } from 'react';
import './EditForm.css'; // Import your CSS file for styling
import { getClients } from './clientApi';

function AddClient (){

    const [clients, setClients] = useState() // for clients



    const fetchedClients = async () => {
        try{
            const cdResponse = await getClients();
            setClients(cdResponse);
            console.log('Clients fetched details:', cdResponse)
        } catch (erR) {
            console.error("Error fetching clients", erR)
        }
    };

    useState(() => {
        fetchedClients();
    }, []);

    return (
        <form 
        className='edit-form'>

            <div>
                <label htmlFor="">Code:</label>
                <input 
                type="text"
                placeholder='client code' />

                <label htmlFor="">Name:</label>
                <input type="text"
                placeholder='Name' />
            </div>

            {/* for inactive */}
            <div className='check-div-align'>
                    <label htmlFor="inactive"></label>
                    <input
                        className='check-box'
                        type="checkbox"
                    /> Inactive
                </div>

                <h1>Please don't bother this one. It's under construction! :)</h1>
                
                <button type="submit" className='addUser-btn'>Add User</button>

        </form>
    );
};

export default AddClient;