import React, { useState, useEffect } from 'react';
import './EditForm.css';
import { getClients, addClients } from './otherApi';

function ClietnEditForm({ clt, fetchedClients }) {
    const [id, setId] = useState('');
    const [clientCode, setClientCode] = useState('');
    const [clientName, setClientName] = useState('');
    const [cltInactive, setCltInactive] = useState(false);

    // Update form fields when 'client' prop changes
    useEffect(() => {
        if (clt) {
            setId(clt.client_id || '');
            setClientCode(clt.client_code || '');
            setClientName(clt.client_name || '');
            setCltInactive(clt.client_inactive || false);
        }
    }, [clt]);

    // Function to handle  clients
    const updBtn = async (e) => {
        e.preventDefault();
        const clientDetails = {
            client_id: id,
            client_code: clientCode,
            client_name: clientName,
            client_inactive: cltInactive
        };

        try {
            const updResponse = await addClients(clientDetails);
            console.log('Client updated successfully', updResponse);
            fetchedClients();
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    const checkedInactive = (ci) => {
        setCltInactive(ci.target.checked);
    };

    return (
        <form className='edit-form' onSubmit={updBtn}>
            <div>
                <label htmlFor="clientCode">Code:</label>
                <input
                    type="text"
                    placeholder='client code'
                    onChange={(cc) => setClientCode(cc.target.value)}
                    value={clientCode} required
                />
                <label htmlFor="clientName">Name:</label>
                <input
                    type="text"
                    placeholder='Name'
                    onChange={(cn) => setClientName(cn.target.value)}
                    value={clientName} required
                />
            </div>
            <div className='check-div-align'>
                <label htmlFor="cltInactive"></label>
                <input
                    className='check-box'
                    type="checkbox"
                    checked={cltInactive}
                    onChange={checkedInactive}
                /> Inactive
            </div>
            <button type="submit" className='save-btn'> Save Changes</button>
        </form>
    );
}

export default ClietnEditForm;
