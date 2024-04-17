import React from 'react';
import TopNavbar from './TopNavbar';

function Client() {
    return (
        <div>
            <TopNavbar />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 >Hey Boss,</h1>
                I am client page!!!
            </div>

        </div>
    );
};

export default Client;